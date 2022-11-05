const initialState = {
  dog: [],
  temperaments: [],
  allDogs: [],
  dogDetail: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload,
      };
    case "GET_TEMPERAMENT":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "GET_DOG_DETAIL":
      return {
        ...state,
        dogDetail: action.payload,
      };
    case "GET_DOG":
    
      return {
        ...state,
        dog: encontrado(action.payload)
      };
      case "GET_DOG_DATABASE":
        let res =encontrado(action.payload)
      return{
          ...state,
          dog:res
        }
    case "ORDER_FOR_WEIGHT":
      let /* ordenWeight=state.dog
           let index=ordenWeight.findIndex(e=>e.id===232)
           ordenWeight[index].weight.imperial='18'
           state.dog=ordenWeight; */
        ordenWeight =
          action.payload == "min"
            ? state.dog.sort((a, b) =>
                a.weight.metric.localeCompare(b.weight.metric, undefined, {
                  numeric: true,
                })
              )
            : state.dog.sort((a, b) =>
                b.weight.metric.localeCompare(a.weight.metric, undefined, {
                  numeric: true,
                })
              );
      return {
        ...state,
        dog: ordenWeight,
      };
    case "ORDER_FOR_NAME":
      const ordeneds =
        action.payload == "asc"
          ? state.dog.sort((a, b) => a.name.localeCompare(b.name))
          : state.dog.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        dog: ordeneds,
      };
    case "FILTER_FOR_TEMPERAMENT":
      return {
        ...state,
        dog:action.payload
      };
    default:
      return state;
  }
};
function encontrado(action){
let resul=action.length?action:["none"] 

return resul;
}