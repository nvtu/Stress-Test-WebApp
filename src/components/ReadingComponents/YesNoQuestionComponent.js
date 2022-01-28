import { useState } from 'react';
import { Select } from 'antd';

const YesNoNGBox = (props) => {
    const { id } = props
    const { Option } = Select;
    const options = [`YES-${id}`, `NO-${id}`, `NOT GIVEN-${id}`]

    return (
        <Select defaultValue='....' style={{ width: 120 }} onChange={props.handleOnValueChange}>
            {
                options.map((option, _id) => {
                    return (
                        <Option key={_id} value={option} onChange={props.handleOnValueChange}>{option.split('-')[0]}</Option>
                    )
                })
            }
        </Select>
    )
}

function YesNoQuestionComponent(props) {
    const { questionStartId, questionEndId } = props;
    var answers = new Array(questionEndId - questionStartId + 1).fill('...')
    const questions = [
        {
            id: 1,
            question: "Most photographers understand how hard it was to take photographs in the 19th century.",
        },
        {
            id: 2,
            question: "The Navajo language will die out because it currently has too few speakers."
        },
        {
            id: 3,
            question: "A large number of native speakers fails to guarantee the survival of a language."
        },
        {
            id: 4,
            question: "National governments could do more to protect endangered languages."
        },
        {
            id: 5,
            question: "The loss of linguistic diversity is inevitable."
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
                 Do the following statements agree with the information given in the Reading Passage?
            </p>
            <p>
                <i>In boxes {questionStartId}-{questionEndId} on your answer sheet, write</i>
            </p>
            <p class>
                <span>
                    <span style={{ display: "inline-block", 
                        paddingRight: 0, 
                        width: "8.5rem",
                    }}><b><i>YES</i></b></span>
                    <i>
                        if the statement agrees with the writer's claims
                    </i>
                </span>
                <br />
                <span style={{ display: "inline-block" }}>
                    <span style={{ display: "inline-block", 
                        paddingRight: 0, 
                        width: "8.5rem",
                    }}><b><i>NO</i></b></span>
                    <i>
                        if the statement contradicts the writer's claims
                    </i>
                </span>
                <br />
                <span style={{ display: "inline-block" }}>
                    <span style={{ display: "inline-block", 
                        paddingRight: 0, 
                        width: "8.5rem",
                    }}><b><i>NOT GIVEN</i></b></span>
                    <i>
                        if there is impossible to say what the writer thinks about this.
                    </i>
                </span>
            </p>
            {
                questions.map(question => {
                    return (
                        <div key={question.id} style={{ marginBottom: "0.75rem", lineHeight: "1.5rem"}}>
                            <strong>{question.id}&nbsp;</strong>
                            {question.question}&nbsp;
                            <YesNoNGBox id={question.id} handleOnValueChange={handleOnValueChange}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default YesNoQuestionComponent;