import React, { useEffect, useState } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { filterForTemperament, getTemperament } from "../redux/actions";
function Formdog({ filterForTemperament, temperaments, getTemperament }) {
  const [temperamentsadd, setTemperamentsadd] = useState("");
  useEffect(() => {
    getTemperament();
  }, []);
  let filterTemperament = (e) => {
    e.preventDefault();
    //getTemperament();
    let tem = temperamentsadd + e.target.value + " , ";
    setTemperamentsadd(tem);
  };
  //validacion de formulario
  let validarFormulario = (e) => {
    e.preventDefault();
    let breed = document.getElementById("nombre")
    let [heightmin,heightmax]=[document.getElementById('heightmin').value,document.getElementById('heightmax').value]
    let [weightmin,weightmax]=[document.getElementById('weightmin').value,document.getElementById('weightmax').value]
    let [lifespan,input_temperaments]=[document.getElementById('lifespan').value,document.getElementById('temperaments').value]
    breed.value.length==0 ? alert("you have write some in name (BREED)"):
    input_temperaments.length==0?alert('you have some temperament'):
    heightmin.length==0 ?alert("you have write some in minime height  (HEIGHT)") :
    heightmax.length==0 ?alert("you have write some in maxime height  (HEIGHT)") :
    weightmin.length==0 ?alert("you have write some in minime Weight  (WEIGHT)") :
    weightmax.length==0 ?alert("you have write some in maxime Weight  (WEIGHT)") :
    heightmax<heightmin?alert('your HEIGHT MAXIME has be more great that your HEIGHT MINIME'):
    weightmax<weightmin?alert('your WEIGHT MAXIME has be more great that your WEIGHT MINIME'):
    lifespan.length==0?alert('you have write some in LIFE-SPAN'):
    alert('!all correct and sended!');
      console.log('height min '+heightmin + '  height max '+heightmax +'weight min '+weightmin + '  weight max '+weightmax )
    
   // heightmax>heightmin?console.log('correcto'):console.log('incorrecto')

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
        <form>
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
            <input value={temperamentsadd}id='temperaments' readOnly
              onChange={temperamentsadd}
            ></input>
          </div>
          <div className="form-g">
            <label>Height</label>
            <span for="price">Choose a minime height...... ( CM ) : </span>
            <input
            id='heightmin'
                maxLength='3'
              type="number"
              name="heightmin"
              
              step="1"
            />
            <span for="price">Choose a maxime height......( CM ) : </span>
            <input id='heightmax' type="number" name="heightmax" min="10" max="200" step="1" />
          </div>

          <div className="form-g">
            <label>Weight</label>
            <span for="price">Choose a minime weight......( KG ) : </span>
            <input
            id='weightmin'
              maxLength="3"
              type="number"
              name="weightmin"
              min="1"
              max="100"
              step="1"
            />
            <span for="price">Choose a maxime weight......( KG ) : </span>
            <input id='weightmax'type="number" name="weightmax" min="1" max="100" step="1" />
          </div>
          <div className="form-g">
            <label>life_span</label>
            <input id="lifespan" type="number" placeholder=" life span in years"></input>
          </div>

          <br />
          <div>
            <button onClick={(e) => validarFormulario(e)} type="submit">
              SUBMIT
            </button>
          </div>
        </form>
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Formdog);
