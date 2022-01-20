import axios from "axios";
import { fetchDataError, fetchDataSuccess, fetchDataRequest } from "./actionFetchData";


export const fetchData = (api, method, params) => {
    return dispatch => {
        dispatch(fetchDataRequest());
        if (method == "POST") {
            axios.post(api, params)
                .then(res => {
                    dispatch(fetchDataSuccess(res.data));
                })
                .catch(err => {
                    dispatch(fetchDataError(err));
                })
        }
        else {
            axios.get(api)
                .then(res => {
                    dispatch(fetchDataSuccess(res.data));
                })
                .catch(err => {
                    dispatch(fetchDataError(err));
                });
        }
    };
}