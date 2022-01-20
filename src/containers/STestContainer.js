import { useEffect, useState } from 'react';
import ProgressBarTimer from "../components/ProgressBarTimer";
import STestCard from "../components/STestCard";
import { Button, Form } from "react-bootstrap";
import { fetchData } from './actions/fetchData';


function STestContainer(props) {
    const { totalTimeInSeconds } = props;
    // const { testLevel, setTestLevel } = useState("Easy")
    const [ testLevel, setTestLevel ] = useState("Easy")
    const [isTestStart, setIsTestStart] = useState(false);
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(totalTimeInSeconds);

    const handleOnStartBtnClick = () => {
        setIsTestStart(!isTestStart)
        // TRIGGER THE START TIMER ON SERVER
        let api = 
        params = { 'user_id': 'user1', 'session_id': `stest_${testLevel}` }
        fetchData()
    }

    const handleOnTestLevelChange = (e) => {
        let currentTestLevel = e.target.id
        setTestLevel(currentTestLevel)
    }

    useEffect(() => {
        if (isTestStart) {
            const timer = setTimeout(() => {
                let updatedTimeLeftInSeconds = Math.max(0, timeLeftInSeconds - 1)
                setTimeLeftInSeconds(updatedTimeLeftInSeconds)
                if (timeLeftInSeconds === 0) {
                    console.log("Timed's up!")
                }
            }, 1000)
            return () => clearTimeout(timer);
        }
        else setTimeLeftInSeconds(totalTimeInSeconds)
    }, [timeLeftInSeconds, isTestStart, totalTimeInSeconds]);
    

    return (
        <div>
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
                        defaultChecked={testLevel}
                        type="radio"
                        name="group1"
                        id="Easy"
                        label="Easy"
                        onClick={handleOnTestLevelChange}
                        />
                    <Form.Check 
                        inline
                        type="radio"
                        name="group1"
                        id="Medium"
                        label="Medium"
                        onClick={handleOnTestLevelChange}
                        />
                    <Form.Check 
                        inline
                        type="radio"
                        name="group1"
                        id="Hard"
                        label="Hard"
                        onClick={handleOnTestLevelChange}
                    />
                </Form.Group>

            </Form>
            <Button variant='primary' onClick={handleOnStartBtnClick}>
                {isTestStart ? "Stop" : "Start"} 
            </Button>
  
            <STestCard />
        </div>

    )
}

export default STestContainer;