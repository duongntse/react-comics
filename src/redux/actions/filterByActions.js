export const FETCH_FILTER_BY = "FETCH_FILTER_BY";
export function fetchFilterByRequest() {
    return function (dispatch) {
        dispatch({
            type: FETCH_FILTER_BY,
        });
    };
}

export const SET_FILTER_BY = "SET_FILTER_BY";
export function setFilterBy(value) {
    return function (dispatch) {
        dispatch({ type: SET_FILTER_BY, filterBy: value });
    };
}
