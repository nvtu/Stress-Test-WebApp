let initState = {   
    userID: '',
}

const userInfoReducer = (state = initState, action) => {
    switch (action.type){
        case "SET_USER_ID":
            return {
                ...state,
                userID: action.userID,
            }
        default:
            return state
    }
}

export default userInfoReducer;