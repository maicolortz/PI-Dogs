const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
require("dotenv").config(); //load .env files
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds`;

const router = Router();



const getInfoAPI = async () => {

};


// Ejemplo: router.use('/auth', authRouter);
//lista de razas de perros que contengan la palabra ingresada

router.get("/dogs",async (req, res) => {
  const apiExterna = await axios.get(URL);
  const Dogs = await apiExterna.data.map((dog) => {
    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      temperament: dog.temperament,
      weight: dog.weight,
      height:dog.height,
      life_span: dog.life_span,
      temperamentCC: dog.temperament
    };
  });
  res.json(Dogs)
});
///desde el formulario hacia la base de datos
router.post("/dogs");
//obtener todos los temperamentos, primero de la api externa y guardarlos
//en la base de datos
router.get("/temperaments");
// Configurar los routers
//todas las razas y los datos de principal
//router.get('/dogs',getDogs);
module.exports = router;
