import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";


function ScoreboardTable(props) {
    const { data } = props
    const columns = [
        {
            dataField: "rank",
            text: "Rank",
            sort: true,
        },
        {
            dataField: "id",
            text: "User ID",
        },
        {
            dataField: "STest_Easy",
            text: "S-Test Easy",
        },
        {
            dataField: "STest_Medium",
            text: "S-Test Medium",
        },
        {
            dataField: "STest_Hard",
            text: "S-Test Hard",
        },
        {
            dataField: "Reading_1",
            text: "IELTS Reading 1",
        },
        {
            dataField: "Reading_2",
            text: "IELTS Reading 2",
        },
        {
            dataField: "Reading_3",
            text: "IELTS Reading 3",
        },
        {
            dataField: "Points",
            text: "Points",
            sort: true
        }
    ]

    return (
        <BootstrapTable 
                bootstrap4
                keyField='rank' 
                data={data} 
                columns={columns} 
                pagination={paginationFactory({ sizePerPage: 10})}
        />
    )
}


export default ScoreboardTable;