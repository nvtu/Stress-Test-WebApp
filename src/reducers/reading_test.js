let initialState = {
    level: 'Reading1',
    numberOfQuestions: 0,
    numberOfCorrectAnswers: 0,
}

const readingTestReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_READING_TEST_LEVEL":
            return {
                ...state,
                level: action.level,
            }
        case "SET_READING_TEST_NUM_CORRECT_ANSWER":
            return {
                ...state,
                numberOfCorrectAnswers: action.numCorrectAnswer,
            }
        case "SET_READING_TEST_TOTAL_NUMBER_OF_QUESTIONS":
            return {
                ...state,
                numberOfQuestions: action.totalNumberOfQuestions,
            }
        default:
            return state
    }
}


export default readingTestReducer;
