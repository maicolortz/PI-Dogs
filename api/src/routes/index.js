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
router.use(express.json());

const getInfoAPI = async () => {
  const apiExterna = await axios.get(URL);
  const Dogs = await apiExterna.data.map((dog) => {
    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      temperament: dog.temperament,
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

  const [api, db] = [await getInfoAPI(),await getInfoDB()];
  console.log(db)
  return [...api, ...db];

};
router.get("/dogs", async (req, res) => {
  const infototal = await getAllDogs();
  res.json(infototal);
});
// Ejemplo: router.use('/auth', authRouter);
//lista de razas de perros que contengan la palabra ingresada
const apiData = async () => {};
//crear un perro
router.post("/dogs", async (req, res) => {
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
  const height = [min_height, max_height];
  const weight = [min_weight, max_weight];

  const dog = await Dog.create({
    name,
    temperament,
    height: height,
    weight: weight,
    life_span,
    image,
  });
  dog.addTemperament(
    await Temperament.findAll({
      where: { name: temperament },
    })
  );
  console.log(dog);
  res.status(200).send("Dog has been created");
});
//obtener todos los temperamentos, primero de la api externa y guardarlos
//en la base de datos
router.get("/temperaments");
// Configurar los routers
//todas las razas y los datos de principal
//router.get('/dogs',getDogs);
module.exports = router;
