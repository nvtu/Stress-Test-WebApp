import { useState } from 'react';
import { Select } from 'antd';
import { Form } from 'react-bootstrap';

const Labeling = (props) => {
    const { id, answers } = props
    const { Option } = Select;

    return (
        <Select defaultValue='....' style={{ width: 60 }} onChange={props.handleOnValueChange}>
            {
                answers.map((answer, _id) => {
                    return (
                        <Option key={_id} value={`${answer}-${id}`} onChange={props.handleOnValueChange}>{answer}</Option>
                    )
                })
            }
        </Select>
    )
}


function ParagraphLabelingComponent(props) {
    const { questionStartId, questionEndId, numParagraphs } = props;
    const alphabetLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
    var answers = new Array(questionEndId - questionStartId + 1).fill('...')
    const questions = [
        {
            id: 1,
            question: "Most photographers understand how hard it was to take photographs in the 19th century.",
            answers: ["A", "B", "C", "D", "E", "F"]
        },
        {
            id: 2,
            question: "The Navajo language will die out because it currently has too few speakers.",
            answers: ["A", "B", "C", "D", "E", "F"]
        },
        {
            id: 3,
            question: "A large number of native speakers fails to guarantee the survival of a language.",
            answers: ["A", "B", "C", "D", "E", "F"]
        },
        {
            id: 4,
            question: "National governments could do more to protect endangered languages.",
            answers: ["A", "B", "C", "D", "E", "F"]
        },
        {
            id: 5,
            question: "The loss of linguistic diversity is inevitable.",
            answers: ["A", "B", "C", "D", "E", "F"]
        }
    ]

    const handleOnValueChange = (value) => {
        const answer = value.split('-')[0]
        const questionId = value.split('-')[1]
        console.log(`selected ${answer} -- question id ${questionId}`);
        answers[questionId - 1] = answer
    }

    return (
        <div>
            <p>
                The passage has {questionEndId - questionStartId + 1} paragraphs labelled <b>
                    {`A-${alphabetLetter[numParagraphs-1]}`}
                    </b>. 
            </p>
            <p>
                Which paragraph contains the following information?
            </p>
            <p>
                Write the correct letter <b>{`A-${alphabetLetter[numParagraphs-1]}`}</b> in boxes <b>{`${questionStartId}-${questionEndId}`}</b> on your answer sheet.
            </p>
            {
                questions.map(question => {
                    return (
                        <div key={question.id} style={{ marginTop: "20px"}}>
                            <strong>{question.id}&nbsp;</strong>
                            {question.question}&nbsp;
                            <Labeling id={question.id} answers={question.answers} handleOnValueChange={handleOnValueChange} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ParagraphLabelingComponent;