import axios from "axios";
export function getDogs(title){
  return async function (dispatch){
      //return fetch( `http://www.omdbapi.com?apikey=d1dcdf9c&s=${title}`)
      return fetch( `http://localhost:4000/dogs`)
          .then(r=>r.json())
          .then(m=>dispatch({type: 'GET_DOGS', payload:m}))
  }
}

export function getTemperament() {
  return async function (dispatch) {
    let json = await axios.get(`/temperaments`);
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}
export function getDogDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`/dogs/${id}`);
    return dispatch({
      type: "GET_DOG_DETAIL",
      payload: json.data,
    });
  };
}
export function getDogForName(name) {
  return async function (dispatch) {
    let json = await axios.get(`/dogs?name=${name}`);
    return dispatch({
      type: "GET_DOGS_FOR_NAME",
      payload: json.data,
    });
  };
}
export function postDog(dog) {
  return async function () {
    const d = await axios.post("/dog", dog);
    return d;
  };
}
export function OrderForWeight(p){
    return {
        type:"ORDER_FOR_WEIGHT", p
    }
}
export function OrderForName(p){
    return{ 
        type:"ORDER_FOR_NAME",p
    }
}
export function filterForTemperament(p){
    return {
        type:"GET_FILTER_FOR_TEMPERAMENT",p
    }
}