let initialState = {
    data: [],
}

const scoreboardReducer = (state = initialState, action) => {
    switch (action.type){
        case "SET_SCOREBOARD_DATA":
            return {
                ...state,
                data: action.data,
            }
        default:
            return state
    }
}


export default scoreboardReducer;