import { useState } from 'react'
import { connect } from 'react-redux'
import { Navbar, Container, Nav, FormControl, InputGroup, CloseButton} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { setUserID } from '../actions/actionUserInfo'
import { fetchData } from '../actions/fetchData';
import { API_GET_SCOREBOARD } from '../constants/serverConstants';
import { setScoreboardData } from '../actions/actionScoreboard';


function NavBar(props) {

    const [userID, setNewUserID] = useState('');

    const handleOnChangeUserID = (e) => {
		let currentUserID = e.target.value
		setNewUserID(currentUserID)
	}	


	const handleOnKeyPress = (e) => {
		if (e.key === 'Enter') {
			props.dispatch(setUserID(userID))
		}
	}

	const handleOnCloseButton = () => {
		setNewUserID('')
		props.dispatch(setUserID(''))
	}

    const handleOnScoreboardTabClick = () => {
        props.dispatch(fetchData(API_GET_SCOREBOARD, 'GET', {})).then(res => props.dispatch(setScoreboardData(res)))
    }

    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container fluid>
                <Nav 
                    className="me-auto my-3 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    // navbarScroll
                    >
                    <Nav.Link>
                        <Link to='/' style={{ 
                            textDecoration: 'inherit',
                            color: 'inherit', 
                            }}>
                                Home
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/stest' style={{
                            textDecoration: 'inherit',
                            color: 'inherit',
                        }}>S-Test</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/reading' style={{
                            textDecoration: 'inherit',
                            color: 'inherit',
                        }}>IELTS Reading</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/ranking' onClick={handleOnScoreboardTabClick} style={{
                            textDecoration: 'inherit',
                            color: 'inherit',
                        }}>Scoreboard</Link>
                    </Nav.Link>
                </Nav>
                {
                    props.userID === '' ?
                    <Nav>
                        <InputGroup className="d-flex" style={{ marginRight: "10px", width: "90%" }}>
                            <FormControl 
                                type="text"
                                placeholder="UserID"
                                aria-label="UserID"
                                aria-describedby="basic-addon2"
                                value={userID}
                                onChange={handleOnChangeUserID}
                                onKeyPress={handleOnKeyPress}
                                
                                />
                        </InputGroup>
                    </Nav>
                    :	

                    <Nav>
                        <Navbar.Text style={{ marginTop:"2px" }}>
                            Sign in as: <a> { props.userID } </a>
                        </Navbar.Text>
                        <CloseButton className="p-3" style={{ height: "10px"}} variant='white' onClick = {handleOnCloseButton}/>
                    </Nav>
                }

            </Container>
        </Navbar>
    )
}


const mapStateToProps = (state) => ({
    ...state.userInfo,
})

export default connect(mapStateToProps)(NavBar);