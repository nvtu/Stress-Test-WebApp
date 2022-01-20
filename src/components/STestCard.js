import { useState } from 'react';
import { Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { fetchData } from './actions/fetchData';


function STestCard(props) {
    const { question } = props
    const [answer, setAnswer] = useState("");
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
    const [numQuestions, setNumQuestions] = useState(0);

    const handleOnSubmitBtnClick = () => {
        console.log(`${answer} submitted!!!`)
        setAnswer("")
        setNumQuestions(numQuestions + 1)
        // CHECK IF THE ANSWER IS CORRECT, UPDATE IT
    }

    const handleOnTextChange = (e) => {
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
                <h6>{`${numCorrectAnswers} correct answers out of ${numQuestions}`}</h6>

            </Card.Body>
        </Card>
    )
}


export default STestCard;