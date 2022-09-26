import axios from "axios";
export function getDogs() {
  return async function (dispatch) {
    return fetch(`http://localhost:4000/dogs`)
      .then((r) => r.json())
      .then((m) => dispatch({ type: "GET_DOGS", payload: m }));
  };
}
export function getDog(name) {
  return async function (dispatch) {
    return fetch(`http://localhost:4000/dogs?name=${name}`)
      .then((r) => r.json())
      .then((m) => dispatch({ type: "GET_DOG", payload: m }));
  };
}
export function getDogDtabase(name) {
  return async function (dispatch) {
    return fetch(`http://localhost:4000/dogs/?db=${name}`)
      .then((r) => r.json())
      .then((m) => dispatch({ type: "GET_DOG_DATABASE", payload: m }));
  };
}

export function getTemperament() {
  return async function (dispatch) {
    return fetch(`http://localhost:4000/temperaments`)
      .then((r) => r.json())
      .then((m) => dispatch({ type: "GET_TEMPERAMENT", payload: m }));
  };
}

export function getDogDetail(id) {
  return async function (dispatch) {
    return fetch(`http://localhost:4000/dogs/${id}`)
      .then((r) => r.json())
      .then((m) => dispatch({ type: "GET_DOG_DETAIL", payload: m }));
  };
}

export function postDog(dog) {
  return async function () {
    const d = await axios.post("http://localhost:4000/dogs", dog);
    return d;
  };
}
export function OrderForWeight(payload) {
  return {
    type: "ORDER_FOR_WEIGHT",
    payload,
  };
}
export function OrderForName(payload) {
  return {
    type: "ORDER_FOR_NAME",
    payload,
  };
}

export function filterForTemperament(name) {
  return async function (dispatch) {
    return fetch(`http://localhost:4000/dog/?temperament=${name}`)
      .then((r) => r.json())
      .then((m) => dispatch({ type: "FILTER_FOR_TEMPERAMENT", payload: m }));
  };
}
