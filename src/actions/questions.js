import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion({ id, timestamp, author, optionOne, optionTwo }) {
    return {
        type: ADD_QUESTION,
        id,
        timestamp,
        author,
        optionOne,
        optionTwo
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {

        const { authedUser } = getState()
        const questionInfo = {
            optionOneText,
            optionTwoText,
            author: authedUser
        }
        return saveQuestion(questionInfo)
            .then((question) => {
               dispatch(addQuestion(question))
            })
            .catch(() => {
                alert('There is a problem while creating new question. Please Try again ')
            })
    }
}

function addAnswer({ answer, authedUser, qid }) {
    return {
        type: ADD_ANSWER,
        authedUser, 
        qid, 
        answer
    }
}

export function handleAddAnswer(info) {
    return (dispatch) => {
        dispatch(addAnswer(info))
        return saveQuestionAnswer(info)
            .then(() => console.log('Added answer'))
            .catch( () => {
                alert('Alert: There is a problem while saving question.');
            })
    }
}