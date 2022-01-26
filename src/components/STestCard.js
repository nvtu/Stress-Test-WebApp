import { useEffect, useState } from 'react';
import { Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setQuestion } from '../actions/actionSTest';
import { fetchData } from '../actions/fetchData';
import { setNumCorrectAnswer, setTotalNumberOfQuestions } from '../actions/actionSTest';
import { API_GENERATE_STEST_WITH_LEVEL, API_VALIDATE_ANSWER } from '../constants/serverConstants';
import Sound from 'react-sound';


function STestCard(props) {
    const { question, isTestStart } = props
    const [answer, setAnswer] = useState("");
    const [sound, setPlaySound] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);


    const handleOnSubmitBtnClick = () => {
        if (!isTestStart) return;
        props.dispatch(setTotalNumberOfQuestions(props.totalNumberOfQuestions + 1))
        // CHECK IF THE ANSWER IS CORRECT, UPDATE IT
        let params = { 'user_id': 'user1', 'level': `${props.level}`, 'answer': answer }
        props.dispatch(fetchData(API_VALIDATE_ANSWER, 'POST', params)).then(res => {
            let validate = res.validate_result
            if (validate) {
                props.dispatch(setNumCorrectAnswer(props.numCorrectAnswer + 1))
                setPlaySound("correct.mp3")
            }
            else {
                setPlaySound("error.mp3")
            }
            setIsPlaying(true)
            // FETCH NEXT QUESTION
            params = { 'user_id': 'user1', 'level': `${props.level}` }
            props.dispatch(fetchData(API_GENERATE_STEST_WITH_LEVEL, 'POST', params)).then(res => {
                let question = res.formula
                props.dispatch(setQuestion(question))
            })
        })
        setAnswer("")
        setIsPlaying(false)
    }

    const handleOnTextChange = (e) => {
        setIsPlaying(false)
        const textValue = e.target.value
        const re = /^[0-9\b]+$/ // Only allow numbers input
        // if value is not blank, then test the regex
        if (textValue === '' || re.test(textValue)) {
            setAnswer(textValue)
        }
    }

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleOnSubmitBtnClick()
        }
    }

    useEffect(() => {
        if (!isTestStart) {
            setIsPlaying(false)
            let defaultQuestion = "X + Y - Z = ?"
            props.dispatch(setQuestion(defaultQuestion))
        }
        if (isPlaying === false) {
            setPlaySound("")
        }
    }, [question, isTestStart, isPlaying])


    return (
        <Card className='s-test-card' style={{ width: '40rem' }}>
            <Card.Body>
                <h1>
                    { question }
                </h1>
                <InputGroup className="mb-3" style={{ margin: "0 auto", width: "40%"}}>
                    <FormControl
                        placeholder="Answer"
                        aria-label="Answer"
                        aria-describedby="basic-addon2"
                        value={answer}
                        onChange={handleOnTextChange}
                        onKeyPress={handleOnKeyPress}
                    />
                    <Button 
                        variant="primary" 
                        id="button-addon2"
                        onClick={handleOnSubmitBtnClick}>
                        Submit
                    </Button>
                </InputGroup>
                <h6>{`${props.numCorrectAnswer} correct answers out of ${props.totalNumberOfQuestions}`}</h6>
                <Sound 
                    url={`${process.env.PUBLIC_URL}/assets/sounds/tick.mp3`}
                    playStatus={isTestStart ? Sound.status.PLAYING : Sound.status.STOPPED}
                    playbackRate={1}
                />
                <Sound 
                    url = {`${process.env.PUBLIC_URL}/assets/sounds/${sound}`}
                    playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
                    // playFromPosition={0}
                    playbackRate={1}
                    loop={false}
                />
            
            </Card.Body>
        </Card>
    )
}


const mapStateToProps = (state) => ({
    ...state.stest,
})


export default connect(mapStateToProps)(STestCard);