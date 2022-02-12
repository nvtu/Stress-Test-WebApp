import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import STestContainer from './containers/STestContainer';
import RankingContainer from './containers/RankingContainer';
import WelcomeContainer from './containers/WelcomeContainer';
import ReadingContainer from './containers/ReadingContainer';
import NavBar from './components/NavBar';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { READING_TOTAL_TIME_IN_SECONDS, STEST_TOTAL_TIME_IN_SECONDS } from './constants/stressTestConstant';
import LogContainer from './containers/LogContainer';
// import { Link } from 'react-router'


function App() {

	return (
		<Router>
			<div className="App">

				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
					integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
					crossorigin="anonymous"
					/>

				<div className="header">
					<title>Awesome Stress Test</title>
					<NavBar />
				</div>

				<div className="body" style={{ marginTop: "50px" }}>
						<Routes>
							<Route exact path="/" element={<WelcomeContainer />} />
							<Route exact path="/log" element={<LogContainer />} />
							<Route exact path="/stest" element={<STestContainer 
								totalTimeInSeconds = {STEST_TOTAL_TIME_IN_SECONDS}
								/>} />
							<Route exact path="/reading" element={<ReadingContainer 
								totalTimeInSeconds = {READING_TOTAL_TIME_IN_SECONDS}
								/>} />
							<Route exact path="/ranking" element={<RankingContainer />} />
						</Routes>
				</div>
			</div>
		</Router>	
	);
}


export default App;
