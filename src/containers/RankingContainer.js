import { useState, useEffect } from 'react';
import ScoreboardTable from '../components/ScoreboardTable';


function RankingContainer(props) {
    const data = [
        {rank: 1, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
                      {rank: 15, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 2, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 3, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 4, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 5, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 6, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 7, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 8, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 9, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 10, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 11, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 12, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 13, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
        {rank: 14, id: 123, STest_Easy: "100%", STest_Medium: "100%", STest_Hard: "100%", Reading_1: "100%", Reading_2: "100%", Reading_3: "100%", Points: "100"},
     
    ]
    
    return (
        <div style={{ margin: "0 auto", width: "85%" }}>
            <h1>Scoreboard</h1>
            <ScoreboardTable data={data} />
        </div>
    )    

}

export default RankingContainer;