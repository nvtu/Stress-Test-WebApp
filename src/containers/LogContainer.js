import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ProgressBarTimer from '../components/ProgressBarTimer'
import { notification } from 'antd'
import { MehOutlined } from '@ant-design/icons';
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import 'antd/dist/antd.css'
import { API_SESSION_LOGGING } from '../constants/serverConstants';
import { fetchData } from '../actions/fetchData'



function LogContainer(props) {
    const [startLogSession, setStartLogSession] = useState(false)
    const [sessionName, setSessionName] = useState('')
    const [logTime, setLogTime] = useState("")
    const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(10)
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(10)


    const handleOnStartBtnClick = () => {
        console.log(props.userID)
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

        if (sessionName === "") {
            notification.error({
                message: 'Session Name Absent',
                description: 'Please input session name first!',
                placement: 'bottomRight',
                duration: 1.5,
                icon: <MehOutlined />,
            })
            return
        }

        let _logTimeTotal = parseInt(logTime)
 
        if (_logTimeTotal === 0 || isNaN(_logTimeTotal)) {
            notification.error({
                message: "Log Time Error",
                description: "Please input correct log time!",
                placement: 'bottomRight',
                duration: 1.5,
                icon: <MehOutlined />,
            })
        }
        let updatedStartLogSession = !startLogSession;
        if (updatedStartLogSession) {
            setTotalTimeInSeconds(_logTimeTotal)
            setTimeLeftInSeconds(_logTimeTotal)
        }
        setStartLogSession(updatedStartLogSession);
        // TRIGGER THE START TIMER ON SERVER
        let type = updatedStartLogSession ? "Start" : "Stop"
        let params = { 'user_id': props.userID, 'session_id': sessionName, type: type }
        props.dispatch(fetchData(API_SESSION_LOGGING, 'POST', params)).then(res => {
            if (res.status === 'Success') {
                let logTime = res.log_time
                notification.success({
                    message: "Log Session Logging Success",
                    description: `Log Session Logging Success at ${logTime}`,
                    placement: 'bottomRight',
                    duration: 1.5
                })
            }
            else {
                notification.error({
                    message: "Log Session Logging Failed",
                    description: `Log Session Logging Failed at ${logTime}`,
                    placement: 'bottomRight',
                    duration: 1.5
                })
            }
        })
    }

    useEffect (() => {
        if (startLogSession) {
            const timer = setInterval(() => {
                let updatedTimeLeftInSeconds = Math.max(timeLeftInSeconds - 1, 0) 
                setTimeLeftInSeconds(updatedTimeLeftInSeconds)
                if (timeLeftInSeconds === 0) {
                    setStartLogSession(!startLogSession)
                    let params = { 'user_id': props.userID, 'session_id': sessionName, type: "Stop" }
                    props.dispatch(fetchData(API_SESSION_LOGGING, 'POST', params)).then(res => {
                        if (res.status === 'Success') {
                            let logTime = res.log_time
                            notification.success({
                                message: "Log Session Logging Success",
                                description: `Log Session Logging Success at ${logTime}`,
                                placement: 'bottomRight',
                                duration: 1.5
                            })
                        }
                        else {
                            notification.error({
                                message: "Log Session Logging Failed",
                                description: `Log Session Logging Failed at ${logTime}`,
                                placement: 'bottomRight',
                                duration: 1.5
                            })
                        }
                    })
                }
            }, 1000)
            return () => clearInterval(timer)
        }
        else setTimeLeftInSeconds(totalTimeInSeconds)
    }, [props, startLogSession, timeLeftInSeconds, totalTimeInSeconds, props.userID, logTime])


    const handleOnSessionNameChange = (e) => {
        const textValue = e.target.value
        setSessionName(textValue)
    }

    const handleOnLogTimeChange = (e) => {
        const textValue = e.target.value
        const re = /^[0-9]+$/
        if (textValue === '' || re.test(textValue)) {
            setLogTime(textValue)
        }
    }

    return (
        <div>
            <div style={{ position: "fixed", width: "100%", backgroundColor: "#FFFFFF", zIndex: 1000, }}>
                <h2 style={{ paddingTop: "20px" }}>Log Session</h2>
                <ProgressBarTimer 
                    totalTimeInSeconds={totalTimeInSeconds}
                    timeLeftInSeconds={timeLeftInSeconds}
                />
                <InputGroup className="mb-2" style={{ margin: "0 auto", width: "30%", marginTop: "25px"}}>
                    <FormControl
                        placeholder="Session Name"
                        aria-label="Session Name"
                        aria-describedby='basic-addon2'
                        onChange={handleOnSessionNameChange}
                    />
                    <FormControl 
                        placeholder="Total time (second)"
                        aria-label="Total time (second)"
                        aria-describedby='basic-addon2'
                        value={logTime}
                        onChange={handleOnLogTimeChange}
                    /> 
                    <Button variant='primary' onClick={handleOnStartBtnClick}>
                            {startLogSession ? 'Stop' : 'Start'}
                    </Button>
                </InputGroup>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    ...state.userInfo, 
})

export default connect(mapStateToProps)(LogContainer);