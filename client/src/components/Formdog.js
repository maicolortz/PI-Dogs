import React, { useEffect, useState } from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  filterForTemperament,
  getTemperament,
  postDog,
} from "../redux/actions";
function Formdog({
  filterForTemperament,
  temperaments,
  getTemperament,
  postDog,
}) {
  const [temperamentsadd, setTemperamentsadd] = useState("");
  const navigate = useNavigate();
  const [valido, setValido] = useState(false);
  const [newBreed, setNewBreed] = useState({
    name: "",
    temperament: [],
    min_height: 0,
    max_height: 0,
    min_weight: 0,
    max_weight: 0,
    image: "",
    life_span: "",
  });
  useEffect(() => {
    getTemperament();
  }, []);
  useEffect(() => {
    if (valido) {
      postDog(newBreed);
      navigate("/home");
    }
  }, [newBreed]);

  let filterTemperament = (e) => {
    e.preventDefault();
    if (temperamentsadd && temperamentsadd.includes(e.target.value)) {
    } else {
      setTemperamentsadd(temperamentsadd + e.target.value + " , ");
    }
  };
  //validacion de formulario
  let validarFormulario = (e) => {
    e.preventDefault();
    let breed = document.getElementById("nombre");
    let [heightmin, heightmax] = [
      document.getElementById("heightmin").value,
      document.getElementById("heightmax").value,
    ];
    let [weightmin, weightmax] = [
      document.getElementById("weightmin").value,
      document.getElementById("weightmax").value,
    ];
    let [lifespan, input_temperaments] = [
      document.getElementById("lifespan").value,
      document.getElementById("temperaments").value,
    ];
    /* const height = [min_height, max_height];
  const weight = [min_weight, max_weight];

  const dog = await Dog.create({
    name,
    temperament,
    height: height,
    weight: weight,
    life_span,
    image,
  }); */

    let valido = false;
    breed.value.length == 0
      ? alert("you have write some in name (BREED)")
      : input_temperaments.length == 0
      ? alert("you have some temperament")
      : heightmin.length == 0
      ? alert("you have write some in minime height  (HEIGHT)")
      : heightmax.length == 0
      ? alert("you have write some in maxime height  (HEIGHT)")
      : weightmin.length == 0
      ? alert("you have write some in minime Weight  (WEIGHT)")
      : weightmax.length == 0
      ? alert("you have write some in maxime Weight  (WEIGHT)")
      : heightmax < heightmin
      ? alert("your HEIGHT MAXIME has be more great that your HEIGHT MINIME")
      : weightmax < weightmin
      ? alert("your WEIGHT MAXIME has be more great that your WEIGHT MINIME")
      : lifespan.length == 0
      ? alert("you have write some in LIFE-SPAN")
      : setValido(true);
    //console.log(nBreed);

    console.log(
      "name: " +
        breed.value +
        "height min " +
        heightmin +
        "  height max " +
        heightmax +
        "weight min " +
        weightmin +
        "  weight max " +
        weightmax
    );

    let tem = "" + input_temperaments + "";
    let na = "" + breed.value + "";

    setNewBreed({
      name: na,
      temperament: tem,
      min_height: heightmin,
      max_height: heightmax,
      min_weight: weightmin,
      max_weight: weightmax,
      life_span: lifespan,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="contenedor">
      <section className="">
    
        <form name="fvalida" className="formdetail" method="get" action="/home">
          <button className="b-detail" type="submit">
            Back
          </button>
        </form>
      

      </section>
        
      <section className="form">
        <div className="headerform">
          <h1>New Dog</h1>
          <br />
        </div>
        <div className="containform"style={{display:"flex",alignItems:"center",justifyContent:"center"}}>

       
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-g">
            <label>Breed</label>
            <input
              id="nombre"
              type="text"
              placeholder="enter your breed"
            ></input>
          </div>
          <div className="form-g">
            <label>Temperaments</label>
            <div>
              <select onChange={(e) => filterTemperament(e)}>
                <option disabled selected defaultValue>
                  Selection of Temperaments
                </option>

                {temperaments &&
                  temperaments.map((e) => (
                    <option value={e.name} key={e.id}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-g">

          <label>temperaments selected</label>
          <input
            value={temperamentsadd}
            id="temperaments"
            readOnly
            onChange={temperamentsadd}
            ></input>
            </div>
          <div className="form-g">
            <label>Height ( CM )</label>
            <span for="price"></span>
            <input
              min="10"
              max="200"
              id="heightmin"
              maxLength="3"
              type="number"
              name="heightmin"
              step="1"
              placeholder="minime"
            />
            <span for="price"> -- </span>
            <input
              id="heightmax"
              type="number"
              name="heightmax"
              min="10"
              max="200"
              step="1"
              placeholder="maxime"
            />
          </div>

          <div className="form-g">
            <label>Weight ( KG )</label>
            <span for="price"></span>
            <input
              id="weightmin"
              maxLength="3"
              type="number"
              name="weightmin"
              min="1"
              max="100"
              step="1"
              placeholder="minime  "
            />
            <span for="price"> -- </span>
            <input
              id="weightmax"
              type="number"
              name="weightmax"
              min="1"
              max="100"
              step="1"
              placeholder="maxime  "
            />
          </div>
          <div className="form-g">
            <label>life_span</label>
            <input
              id="lifespan"
              type="number"
              placeholder=" life span in years"
            ></input>
          </div>

          <br />
          <div>
            <button onClick={(e) => validarFormulario(e)} type="submit">
              SUBMIT
            </button>
          </div>
        </form>
        </div>
      </section>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    temperaments: state.temperaments,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    filterForTemperament: (e) => dispatch(filterForTemperament(e)),
    getTemperament: (e) => dispatch(getTemperament(e)),
    postDog: (e) => dispatch(postDog(e)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Formdog);
