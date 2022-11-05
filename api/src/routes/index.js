const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
require("dotenv").config(); //load .env files
const { Dog, Temperament } = require("../db.js");
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds`;
const router = Router();
const express = require("express");
const { col } = require("sequelize");
router.use(express.json());

const getInfoAPI = async () => {
  const apiExterna = await axios.get(URL);
  const Dogs = await apiExterna.data
    .filter((e) => e.id != 232 && e.id != 179)
    .map((dog) => {
      return {
        id: dog.id,
        image: dog.image.url,
        name: dog.name,
        temperament: dog.temperament ? dog.temperament : "no info",
        weight: dog.weight,
        height: dog.height,
        life_span: dog.life_span,
      };
    });
  return Dogs;
};

//info de data base
const getInfoDB = async () => {
  //const data=await getInfoAPI();
  const data = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
      through: {
        attributes: [], //traer mediante los atributos del modelo
      },
    },
  });
  return data;
};
//concatenar todos los datos
const getAllDogs = async () => {
  const [api, db] = [await getInfoAPI(), await getInfoDB()];
  //console.log(db);
  return [...api, ...db];
};
//http://localhost:4000/dogs/?db=algo
router.get("/dogs/db/", async (req, res) => {
  try {
    const { db } = req.query;
    const infoDb = await getInfoDB();
    const api = await getInfoAPI();
    /////////////filtramos
    const filtered = db === "true" ? infoDb : api;
    filtered.length
      ? res.status(200).json(filtered)
      : res.status(200).send(  "not has been founded");
  } catch (error) {
    res.send(error);
  }
});
router.get('/dogs/mayora10', async (req,res)=>{
  const Dogs= await getAllDogs();
  const filtered=Dogs.map(e=>
    e.weight.metric.match(/(\d+)/)[0]>10
  )
  res.json(filtered)
})
//filtrar perros con peso maximo mayor a 10
router.get('/dogs/mayora10pp', async (req,res)=>{
  const Dogs= await getAllDogs();
  const filtered=Dogs.filter(e=>
    Number.parseFloat(e.weight.metric.substring(2).match(/(\d+)/))>10 
  )
  res.json(filtered)
})
router.get("/dogs", async (req, res) => {
try {
  
    const infototal = await getAllDogs();

    const { name } = req.query;
    const { id } = req.query;
    if (name) {
      const filtered = infototal.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      filtered.length
        ? res.status(200).send(filtered)
        : res.status(200).send(  "not has been founded");
    } else if (id) {
      const filtroid = infototal.filter((e) => e.id == id);
      filtroid.length
        ? res.status(200).send(filtroid)
        : res.status(200).send(  "not has been founded");
    } else {
      infototal.length?res.json(infototal):res.send(  "not has been founded");
    }
} catch (error) {
  console.error(error)
}
});

router.post("/dogs", async (req, res) => {
  try {
    const {
      name,
      temperament,
      min_height,
      max_height,
      min_weight,
      max_weight,
      image,
      life_span,
    } = req.body;
    const height = `${min_height} - ${max_height}`;
    const weight = `${min_weight} - ${max_weight}`;

    const dog = await Dog.create({
      name,
      temperament,
      height: { metric: height },
      weight: { metric: weight },
      life_span,
      image,
    });
    ////console.log(temperament);
    const [tempd, created] = await Temperament.findOrCreate({
      where: { name: temperament },
    });
    /*  let temperamentDB = await Temperament.findAll({
    where: { name: "Active"},
  }); */
    dog.addTemperament(tempd);
    /* console.log(dog)
  res.json(dog); */
    res.send("created");
  } catch (error) {
    console.error(error);
  }
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dog = await getAllDogs();
  const dogfound = dog.filter((e) => e.id == id);
  dogfound
    ? res.status(200).json(dogfound)
    : res.send("not has been founded in the database");
});
//obtener todos los temperamentos, primero de la api externa y guardarlos
//en la base de datos
router.get("/temperaments", async (req, res) => {
  try {
    const data = await getAllDogs();
    const temperaments = data
      .map((e) => e.temperament)
      .toString()
      .split(",");
    temperaments.map((f) => {
      if (f) {
        Temperament.findOrCreate({ where: { name: f } });
      }
    });
    const te = await Temperament.findAll();

    //console.log('temper'+temper);//console.log('temperaments'+temperaments)
    return res.send(te);
  } catch (error) {
    console.error(error);
  }
});

///http://localhost:4000/dog/?temperament=algo
router.get("/dog/", async (req, res) => {
  try {
    const { temperament } = req.query;
    const Dogs = await getAllDogs();
    /////////////filtramos
    const filtered = Dogs.filter((dog) => {
      if (temperament === "all") return Dogs;
      else if (dog.temperament) {
        return dog.temperament
          .toLowerCase()
          .includes(temperament.toLowerCase());
      }
      if (dog.temperaments[0].name) {
        return dog.temperaments[0].name
          .toLowerCase()
          .includes(temperament.toLowerCase());
      }
    });
    res.status(200).json(filtered);
  } catch (error) {
    console.log(error.message);
  }
});

// Configurar los routers
//todas las razas y los datos de principal
//router.get('/dogs',getDogs);
module.exports = router;
