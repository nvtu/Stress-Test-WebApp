let initialState = {
    question: "X + Y - Z = ?",
    level: "Easy",
    numCorrectAnswer: 0,
    totalNumberOfQuestions: 0,
}


const stestReducer = (state = initialState, action) => {
    switch (action.type){
        case "SET_QUESTION":
            return {
                ...state,
                question: action.question,
            }
        case "SET_LEVEL":
            return {
                ...state,
                level: action.level,
            }
        case "SET_NUM_CORRECT_ANSWER":
            return {
                ...state,
                numCorrectAnswer: action.numCorrectAnswer,
            }
        case "SET_TOTAL_NUMBER_OF_QUESTIONS":
            return {
                ...state,
                totalNumberOfQuestions: action.totalNumberOfQuestions,
            }
        default:
            return state
    }
}

export default stestReducer;