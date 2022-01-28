import { useState } from 'react';
import { Radio, Space } from 'antd';
import { Form } from 'react-bootstrap';

const RadioMPChoice = (props) => {
    const { id, answers } = props
    const options = ['A', 'B', 'C', 'D']
    const answer_options = [`answer-A-${id}`, `answer-B-${id}`, `answer-C-${id}`, `answer-D-${id}`]

    return (
        <Radio.Group onChange={props.handleOnValueChange}>
            <Space direction="vertical">
                {
                    answers.map((answer, _id) => {
                        return (
                            <Radio key={_id} value={answer_options[_id]}><b style={{ marginRight: "5px"}}>{options[_id]}</b>&nbsp;{answer}</Radio>
                        )
                    })
                }
            </Space>
        </Radio.Group>
    )
}

function MultipleChoiceComponent(props) {
    const { questionStartId, questionEndId } = props;
    var answers = new Array(questionEndId - questionStartId + 1).fill('...')
    const questions = [
        {
            id: 1,
            question: "Most photographers understand how hard it was to take photographs in the 19th century.",
            answer: ["new methods of constructing the rockets", 
            "the use of a camera",
            "the use of a telescope",
            "the use of a microscope",]
        },
        {
            id: 2,
            question: "The Navajo language will die out because it currently has too few speakers.",
            answer: ["new methods of constructing the rockets", 
            "the use of a camera",
            "the use of a telescope",
            "the use of a microscope",]
        },
        {
            id: 3,
            question: "A large number of native speakers fails to guarantee the survival of a language.",
            answer: ["new methods of constructing the rockets", 
            "the use of a camera",
            "the use of a telescope",
            "the use of a microscope",]
        },
        {
            id: 4,
            question: "National governments could do more to protect endangered languages.",
            answer: ["new methods of constructing the rockets", 
            "the use of a camera",
            "the use of a telescope",
            "the use of a microscope",]
        },
        {
            id: 5,
            question: "The loss of linguistic diversity is inevitable.",
            answer: ["new methods of constructing the rockets", 
            "the use of a camera",
            "the use of a telescope",
            "the use of a microscope",]
        }
    ]

    const handleOnValueChange = (e) => {
        const choice = e.target.value
        const questionId = choice.split('-')[2]
        const choiceId = choice.split('-')[1]
        answers[questionId - 1] = choiceId
    }

    return (
        <div>
            <i>
                Choose the correct letter <b>A, B, C or D</b>
            </i>
            {
                questions.map(question => {
                    return (
                        <div key={question.id} style={{ marginTop: "20px"}}>
                            <strong>{question.id}&nbsp;</strong>
                            {question.question}&nbsp;
                            <div> 
                                <RadioMPChoice id={question.id} answers={question.answer} handleOnValueChange={handleOnValueChange} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MultipleChoiceComponent;