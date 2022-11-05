import axios from "axios";
export function getDogs() {
  return async function (dispatch) {
    let json = await axios.get("/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}
export function getDog(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`/dogs?name=${name}`);
      
      // let d=json.data.length?json.data:json({message:'not found'});

      return dispatch({
        type: "GET_DOG",
        payload: data,
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
  /*  return async function (dispatch) {
    return fetch(`/dogs?name=${name}`)
      .then((r) => r.json())
      .then((m) => dispatch({ type: "GET_DOG", payload: m }));
  }; */
}
export function getDogDtabase(name) {
  return async function (dispatch) {
    const { data } = await axios.get(`/dogs/db/?db=${name}`);
    return dispatch({
      type: "GET_DOG_DATABASE",
      payload: data,
    });
  };
}

export function getTemperament() {
  return async function (dispatch) {
    const { data } = await axios.get("/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENT",
      payload: data,
    });
  };
}

export function getDogDetail(id) {
  return async function (dispatch) {
    const { data } = await axios.get(`/dogs/${id}`);
    return dispatch({
      type: "GET_DOG_DETAIL",
      payload: data,
    });
  };
}

export function postDog(dog) {
  return async function () {
    const d = await axios.post("/dogs", dog);
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
    const { data } = await axios.get(`/dog/?temperament=${name}`);
    return dispatch({
      type: "FILTER_FOR_TEMPERAMENT",
      payload: data,
    });
  };
}
