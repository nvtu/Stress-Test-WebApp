import { createSlice } from '@reduxjs/toolkit';


export const stestSlice = createSlice({
    name: 'stest',
    initialState: {
        question: "A + B - C * D = ?",
        level: "Easy",
        numCorrectAnswer: 0,
        totalNumQuestions: 0,
    },
    reducers: {
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
        setLevel: (state, action) => {
            state.level = action.payload;
        },
        setCorrectAnswer: (state, action) => {
            state.numCorrectAnswer = action.payload;
        },
        setTotalNumberOfQuestions: (state, action) => {
            state.totalNumQuestions = action.payload;
        } 
    },
})


export const { setQuestion, setLevel, setCorrectAnswer, setTotalNumberOfQuestions } = stestSlice.actions;

export default stestSlice.reducer;