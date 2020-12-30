const initialState = "All";

export function filterByReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_FILTER_BY":
            return state;

        case "SET_FILTER_BY":
            return action.filterBy;

        default:
            return state;
    }
}

export default filterByReducer;
