import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import STestContainer from './containers/STestContainer';
import RankingContainer from './containers/RankingContainer';


function App() {


	const handleOnClick = () => {
		console.log("clicked");
	}


	return (
		<div className="App">

			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
				integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
				crossorigin="anonymous"
			/>
			<div className="header">
				<h1>Welcome to Experiment Protocol 2 - Stress Tests</h1>
			</div>
			<hr className='solid'/>

			<div className="body">
				{/* <RankingContainer /> */}
				<STestContainer 
					totalTimeInSeconds={10}
				/>
			</div>


			
		</div>
	);
}

export default App;
