import { useState, useEffect } from 'react';
import ScoreboardTable from '../components/ScoreboardTable';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchData';
import { API_GET_SCOREBOARD } from '../constants/serverConstants';
import { setScoreboardData } from '../actions/actionScoreboard';


function RankingContainer(props) {
    const { data } = props
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        if (!fetched) {
            // Fetches scoreboard data from server whenever the page is loaded
            props.dispatch(fetchData(API_GET_SCOREBOARD, 'GET', {})).then(res => props.dispatch(setScoreboardData(res)))
            setFetched(true)
        }
    }, [props, fetched])
    
    return (
        <div style={{ left: "5%", width: "90%", paddingTop: "20px", position: "fixed"}}>
            <h1>Scoreboard</h1>
            <ScoreboardTable data={data} />
        </div>
    )    

}

const mapStateToProps = (state) => ({
    ...state.scoreboard,
})

export default connect(mapStateToProps)(RankingContainer);