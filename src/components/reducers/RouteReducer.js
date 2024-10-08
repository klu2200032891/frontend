export default function RouteReducer(state="Home", action) {
    switch(action.type) {
        case "page":
            state = action.data
            return state
        default:
            return state
    }
}

//action = {type:"page", data:"Signup"}