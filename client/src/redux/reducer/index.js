const initialState = {
  dog: [],
  temperaments: [],
    allDogs:[],
  dogDetail: [],
};
export default function rootReducer(state=initialState,action){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                allDogs:action.payload
            }
            case "GET_TEMPERAMENT":
            return{
                ...state,
                temperaments: action.payload,
            }
            case "GET_DOG_DETAIL":
            return{
                ...state,
                dogDetail:action.payload,
            }
            case "GET_DOG_FOR_NAME":
            return{
                ...state,
                dog:action.payload,
            }
            case "ORDER_FOR_WEIGHT":
            return{
                ...state,
                
            }
            case "ORDER_FOR_NAME":
            return{
                ...state,
                
            }
            case "GET_FILTER_FOR_TEMPERAMENT":
                return{
                    ...state,
                }
                default:return state
    }
}