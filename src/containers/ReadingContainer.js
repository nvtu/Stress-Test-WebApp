import { useState, useEffect } from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { InputNumber } from 'antd'
import { connect } from 'react-redux';
import ProgressBarTimer from '../components/ProgressBarTimer';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { MehOutlined } from '@ant-design/icons';
import { API_GENERATE_READING_TESTS, API_READING_TEST_SESSION_LOGGING, API_TEST_SESSION_LOGGING } from '../constants/serverConstants';
import { fetchData } from '../actions/fetchData';


function ReadingContainer(props) {
    const { totalTimeInSeconds } = props
    const [fetched, setFetched] = useState(false)
    const [readingLink, setReadingLink] = useState(null)
    const [questionLink, setQuestionLink] = useState(null)
    const [isTestStart, setIsTestStart] = useState(true)
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(totalTimeInSeconds)

    const handleOnTestLevelChange = (e) => {
        let currentTestLevel = e.target.id
        // props.dispatch(setLevel(currentTestLevel))
    }

    const handleOnStartBtnClick = () => {
        if (props.userID === "") {
            notification.error({
                message: 'User ID Absent',
                description: 'Please input user ID first!',
                placement: 'bottomRight',
                duration: 1.5,
                icon: <MehOutlined />,
            })
            return
        }

        let updatedIsTestStart = !isTestStart; 
        setIsTestStart(updatedIsTestStart);
        let params = { 'user_id': props.userID, 'session_id': `${}` }
    }

    const handleOnSubmitBtnClick = () => {

    }

    const handleOnNumCorrectAnswerChange = (value) => {
        console.log(value)
    }

    useEffect(() => {
        if (!fetched && props.userID !== "") {
            let params = { 'user_id': props.userID }
            props.dispatch(fetchData(API_GENERATE_READING_TESTS, 'POST', params))
            setFetched(true)
        }

        if (isTestStart) {
            const timer = setTimeout(() => {
                let updatedTimeLeftInSeconds = Math.max(0, timeLeftInSeconds - 1)
                setTimeLeftInSeconds(updatedTimeLeftInSeconds)
                if (timeLeftInSeconds === 0) {
                    setIsTestStart(!isTestStart)
                    let params = { 'user_id': props.userID, 'session_id': `Reading${props.level}`, type: "Stop" }
                    props.dispatch(fetchData(API_READING_TEST_SESSION_LOGGING, 'POST', params))
                }
            }, 1000)
            return () => clearTimeout(timer);
        }
        else setTimeLeftInSeconds(totalTimeInSeconds)
    }, [timeLeftInSeconds, isTestStart, totalTimeInSeconds, props.userID]);
    


    return (
        <div>
            <div style={{ position: "fixed", width: "100%", backgroundColor: "#FFFFFF", zIndex: 1000, }}>
                <h2 style={{ paddingTop: "20px" }}>IELTS Reading</h2>
                <ProgressBarTimer 
                    totalTimeInSeconds={totalTimeInSeconds}
                    timeLeftInSeconds={timeLeftInSeconds}
                />
                <Form
                style={{ marginTop: "20px" }}>
                <Form.Group className='mb-3'>
                    <Form.Check
                        inline
                        defaultChecked={props.level}
                        type="radio"
                        name="group2"
                        id="Reading1"
                        label="Reading 1"
                        onClick={handleOnTestLevelChange}
                        disabled={isTestStart}
                        />
                    <Form.Check 
                        inline
                        type="radio"
                        name="group2"
                        id="Reading2"
                        label="Reading 2"
                        onClick={handleOnTestLevelChange}
                        disabled={isTestStart}
                        />
                    <Form.Check 
                        inline
                        type="radio"
                        name="group2"
                        id="Reading3"
                        label="Reading 3"
                        onClick={handleOnTestLevelChange}
                        disabled={isTestStart}
                    />
                </Form.Group>
            </Form>
                <Button variant='primary' style={{ marginBottom: "15px" }} onClick={handleOnStartBtnClick}>
                    {isTestStart ? "Stop" : "Start"}
                </Button>
            </div>
            {/* <div style={{ paddingTop: "190px", textAlign: "left", marginLeft: "100px", paddingBottom: "30px"}}> */}
            {
                isTestStart ? 
                <div style={{ paddingTop: "250px" }}>
                    <div>
                        <a href={readingLink} target="_blank" rel="noreferrer noopener">Reading Link</a>
                        <br/>
                        <a href={questionLink} target="_blank" rel="noreferrer noopener">Question Link</a>
                    </div>
                    <div>
                        <div>
                            <InputNumber 
                                size="small" 
                                default={0}
                                onChange={handleOnNumCorrectAnswerChange} 
                                style={{ width: "6%", marginRight: "10px" }} />
                            correct answers / {props.totalQuestions} questions                       
                        </div>
                        <Button variant='primary' style={{ marginTop: "10px" }}>Submit</Button>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.userInfo,
})


export default connect(mapStateToProps)(ReadingContainer);