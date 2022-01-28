import { useState } from 'react';
import { Checkbox, Space } from 'antd';
import { Form } from 'react-bootstrap';

const SelectionBox = (props) => {
    const { id, answers } = props
    const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

    return (
        <Checkbox.Group onChange={props.handleOnValueChange}>
            <Space direction="vertical">
                {
                    answers.map((answer, _id) => {
                        return (
                            <Checkbox key={_id} value={options[_id]}><b style={{ marginRight: "5px"}}>{options[_id]}</b>&nbsp;{answer}</Checkbox>
                        )
                    })
                }
            </Space>
        </Checkbox.Group>
    )
}

function CheckboxSelectionComponent(props) {
    const { questionStartId, questionEndId } = props;
    let answers = []
    const questions = [
        {
            id: 1,
            question: "Most photographers understand how hard it was to take photographs in the 19th century.",
            answer: ["new methods of constructing the rockets", 
            "the use of a camera",
            "the use of a telescope",
            "the use of a microscope",
            "the use of a microscope",]
        },
    ]

    const handleOnValueChange = (checkValues) => {
        const choices = checkValues.sort()
        answers = choices
        // const choice = e.target.checked
        // const questionId = choice.split('-')[2]
        // const choiceId = choice.split('-')[1]
        // answers[questionId - 1] = choiceId
    }

    return (
        <div>
            <p>
                Read the final paragraph of the text.
            </p>
            <p>
                Choose {questionEndId - questionStartId} ideas which are found in the text.
            </p>
            {
                questions.map(question => {
                    return (
                        <div key={question.id} style={{ marginTop: "20px"}}>
                            <strong>{question.id}&nbsp;</strong>
                            {question.question}&nbsp;
                            <div> 
                                <SelectionBox id={question.id} answers={question.answer} handleOnValueChange={handleOnValueChange} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CheckboxSelectionComponent;