import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { InputNumber } from 'antd'
import { connect } from 'react-redux';
import ProgressBarTimer from '../components/ProgressBarTimer';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { MehOutlined } from '@ant-design/icons';
import { API_GENERATE_READING_TESTS, API_GET_READING_TEST, API_SESSION_LOGGING, API_UPDATE_READING_TEST_SCORE } from '../constants/serverConstants';
import { setReadingTestLevel, setReadingTestNumCorrectAnswers, setReadingTestTotalNumberOfQuestions } from '../actions/actionReadingTest'
import { fetchData } from '../actions/fetchData';
import Sound from 'react-sound';


function ReadingContainer(props) {
    const { totalTimeInSeconds } = props
    const [readingLink, setReadingLink] = useState(null)
    const [questionLink, setQuestionLink] = useState(null)
    const [isTestStart, setIsTestStart] = useState(false)
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(totalTimeInSeconds)

    const handleOnTestLevelChange = (e) => {
        let currentTestLevel = e.target.id
        props.dispatch(setReadingTestLevel(currentTestLevel))
    }

    const handleOnStartBtnClick = () => {
        if (props.userID === "" || props.userID === undefined) {
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
        if (!updatedIsTestStart) {
            setIsTestStart(updatedIsTestStart)
            setReadingLink(null)
            setQuestionLink(null)
            props.dispatch(setReadingTestNumCorrectAnswers(0))
            props.dispatch(setReadingTestTotalNumberOfQuestions(0))
        } 
        // LOG READING TEST SESSION
        let params = { 'user_id': props.userID, 'session_id': `${props.level}`, 'type': updatedIsTestStart ? 'Start' : 'Stop' }
        props.dispatch(fetchData(API_SESSION_LOGGING, 'POST', params)).then(res => {
                if (res.status === 'Success') {
                    let logTime = res.log_time
                    notification.success({
                        message: "Reading Test Session Logging Success",
                        description: `Reading Test Session Logging Success at ${logTime}`,
                        placement: 'bottomRight',
                        duration: 1.5
                    })
                    if (updatedIsTestStart) {
                        // If previous API POST request is successful, then generate the reading test
                        params = { 'user_id': props.userID }
                        props.dispatch(fetchData(API_GENERATE_READING_TESTS, 'POST', params)).then(res => {
                            if (res.status === 'Success' || res.status === 'Duplicated') {
                                // If previous API POST request is successful, then fetch the reading test data
                                params = { 'user_id': props.userID, 'session_id': props.level }
                                props.dispatch(fetchData(API_GET_READING_TEST, 'POST', params)).then(res => {
                                    setReadingLink(res.reading_link)
                                    setQuestionLink(res.question_link)
                                    props.dispatch(setReadingTestTotalNumberOfQuestions(res.num_questions))
                                    setTimeLeftInSeconds(totalTimeInSeconds)
                                    setIsTestStart(updatedIsTestStart)
                                })
                            }
                        })
                    }
                }
                else {
                    notification.error({
                        message: "STest Session Logging Failed",
                        description: `STest Session Logging Failed`,
                        placement: 'bottomRight',
                        duration: 1.5
                    })
                }
        })
    }

    const handleOnSubmitBtnClick = () => {
        if (!isTestStart) { 
            notification.error({
                message: 'Test Not Started',
                description: 'Please start the test first!',
                placement: 'bottomRight',
                duration: 1.5,
            })
            return
        }
        let params = { 'user_id': props.userID, 'session_id': `${props.level}`, 'number_of_correct_answers': props.numberOfCorrectAnswers }
        props.dispatch(fetchData(API_UPDATE_READING_TEST_SCORE, 'POST', params)).then(res => {
            if (res.status === 'Success') {
                notification.success({
                    message: 'Success',
                    description: 'Result Submitted Successfully!',
                    placement: 'bottomRight',
                    duration: 1.5,
                })
                let updatedIsTestStart = !isTestStart;
                params = { 'user_id': props.userID, 'session_id': `${props.level}`, 'type': updatedIsTestStart ? 'Start' : 'Stop' }
                props.dispatch(fetchData(API_SESSION_LOGGING, 'POST', params)).then(res => {
                    if (res.status === 'Success') {
                        setIsTestStart(updatedIsTestStart)
                        let logTime = res.log_time
                        notification.success({
                            message: "Reading Test Session Logging Success",
                            description: `Reading Test Session Logging Success at ${logTime}`,
                            placement: 'bottomRight',
                            duration: 1.5
                        })
                    }
                    else {
                        notification.error({
                            message: "STest Session Logging Failed",
                            description: `STest Session Logging Failed`,
                            placement: 'bottomRight',
                            duration: 1.5
                        })
                    }
                })
            }
        })
    }

    const handleOnNumCorrectAnswerChange = (value) => {
        let numberOfCorrectAnswers = value
        props.dispatch(setReadingTestNumCorrectAnswers(numberOfCorrectAnswers))
    }

    useEffect(() => {
        if (isTestStart) {
            const timer = setTimeout(() => {
                let updatedTimeLeftInSeconds = Math.max(0, timeLeftInSeconds - 1)
                setTimeLeftInSeconds(updatedTimeLeftInSeconds)
                if (timeLeftInSeconds === 0) {
                    setIsTestStart(!isTestStart)
                    let params = { 'user_id': props.userID, 'session_id': `${props.level}`, type: "Stop" }
                    props.dispatch(fetchData(API_SESSION_LOGGING, 'POST', params)).then(res => {
                        if (res.status === 'Success') {
                            let logTime = res.log_time
                            notification.success({
                                message: "Reading Test Session Logging Success",
                                description: `Reading Test Session Logging Success at ${logTime}`,
                                placement: 'bottomRight',
                                duration: 1.5
                            })
                            params = { 'user_id': props.userID, 'session_id': `${props.level}`, 'number_of_correct_answers': props.numberOfCorrectAnswers }
                            props.dispatch(fetchData(API_UPDATE_READING_TEST_SCORE, 'POST', params)).then(res => {
                                if (res.status === 'Success') {
                                    notification.success({
                                        message: 'Success',
                                        description: 'Result Submitted Successfully!',
                                        placement: 'bottomRight',
                                        duration: 1.5,
                                    })
                                }
                            })
                        }
                        else {
                            notification.error({
                                message: "STest Session Logging Failed",
                                description: `STest Session Logging Failed`,
                                placement: 'bottomRight',
                                duration: 1.5
                            })
                        }
                    })
                }
            }, 1000)
            return () => clearTimeout(timer);
        }
        else setTimeLeftInSeconds(totalTimeInSeconds)
    }, [props, timeLeftInSeconds, isTestStart, totalTimeInSeconds, props.userID]);
    


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
                            min={0}
                            max={props.numberOfQuestions} 
                            default={0}
                            onChange={handleOnNumCorrectAnswerChange} 
                            style={{ width: "6%", marginRight: "10px" }} />
                        <b>correct answers / {props.numberOfQuestions} questions</b>
                    </div>
                    <Button variant='primary' style={{ marginTop: "10px" }} onClick={ handleOnSubmitBtnClick }>Submit</Button>
                </div>
            </div>
            <Sound 
                    url={`${process.env.PUBLIC_URL}/assets/sounds/tick.mp3`}
                    playStatus={isTestStart ? Sound.status.PLAYING : Sound.status.STOPPED}
                    playbackRate={1}
                    volume={200}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.userInfo,
    ...state.readingTest,
})


export default connect(mapStateToProps)(ReadingContainer);