import { useEffect, useState } from 'react';
import ProgressBarTimer from "../components/ProgressBarTimer";
import STestCard from "../components/STestCard";
import { Button, Form } from "react-bootstrap";
import { fetchData } from '../actions/fetchData';
import { API_GENERATE_STEST_WITH_LEVEL, API_SESSION_LOGGING, API_STEST_RESET_SCORE } from '../constants/serverConstants';
import { setQuestion, setLevel, setNumCorrectAnswer, setTotalNumberOfQuestions } from '../actions/actionSTest';
import { connect } from 'react-redux';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { MehOutlined } from '@ant-design/icons';


function STestContainer(props) {
    const { totalTimeInSeconds } = props;
    // const { testLevel, setTestLevel } = useState("Easy")
    const [isTestStart, setIsTestStart] = useState(false);
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(totalTimeInSeconds);


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
        setIsTestStart(updatedIsTestStart);
       // TRIGGER THE START TIMER ON SERVER
        let type = updatedIsTestStart ? "Start" : "Stop"
        let params = { 'user_id': props.userID, 'session_id': `stest_${props.level}`, type: type }
        props.dispatch(fetchData(API_SESSION_LOGGING, 'POST', params)).then(res => {
            if (res.status === 'Success') {
                let logTime = res.log_time
                notification.success({
                    message: "STest Session Logging Success",
                    description: `STest Session Logging Success at ${logTime}`,
                    placement: 'bottomRight',
                    duration: 1.5
                })
                if (updatedIsTestStart){
                    params = { 'user_id': props.userID, 'session_id': `stest_${props.level}` }
                    props.dispatch(fetchData(API_STEST_RESET_SCORE, 'POST', params)).then(res => {
                        props.dispatch(setNumCorrectAnswer(0))
                        props.dispatch(setTotalNumberOfQuestions(0))
                        params = { 'user_id': props.userID, 'level': props.level }
                        // FETCH THE QUESTIONS
                        props.dispatch(fetchData(API_GENERATE_STEST_WITH_LEVEL, 'POST', params)).then(res => {
                            let question = res.formula
                            props.dispatch(setQuestion(question))
                        })
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

    const handleOnTestLevelChange = (e) => {
        let currentTestLevel = e.target.id
        props.dispatch(setLevel(currentTestLevel))
    }

    useEffect(() => {
        if (isTestStart) {
            const timer = setTimeout(() => {
                let updatedTimeLeftInSeconds = Math.max(0, timeLeftInSeconds - 1)
                setTimeLeftInSeconds(updatedTimeLeftInSeconds)
                if (timeLeftInSeconds === 0) {
                    setIsTestStart(!isTestStart)
                    let params = { 'user_id': props.userID, 'session_id': `stest_${props.level}`, type: "Stop" }
                    props.dispatch(fetchData(API_SESSION_LOGGING, 'POST', params))
                }
            }, 1000)
            return () => clearTimeout(timer);
        }
        else setTimeLeftInSeconds(totalTimeInSeconds)
    }, [props, timeLeftInSeconds, isTestStart, totalTimeInSeconds]);
    

    return (
        <div style={{ paddingTop: "20px", position: "fixed", 'width': "100%"}}>
            <h2>The S-Test</h2> 
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
                        name="group1"
                        id="Easy"
                        label="Easy"
                        onClick={handleOnTestLevelChange}
                        disabled={isTestStart}
                        />
                    <Form.Check 
                        inline
                        type="radio"
                        name="group1"
                        id="Medium"
                        label="Medium"
                        onClick={handleOnTestLevelChange}
                        disabled={isTestStart}
                        />
                    <Form.Check 
                        inline
                        type="radio"
                        name="group1"
                        id="Hard"
                        label="Hard"
                        onClick={handleOnTestLevelChange}
                        disabled={isTestStart}
                    />
                </Form.Group>
            </Form>
            <Button variant='primary' onClick={handleOnStartBtnClick}>
                {isTestStart ? "Stop" : "Start"} 
            </Button>
            
            <STestCard question = { props.question } isTestStart = { isTestStart } />
        </div>

    )
}

const mapStateToProps = (state) => ({
    ...state.stest,
    ...state.userInfo,
})

export default connect(mapStateToProps)(STestContainer);