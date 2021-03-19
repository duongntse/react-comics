const initialState = {
    comics: [],
    isLoading: false,
};

export function comicItemsReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_COMICS_REQUEST": {
            return Object.assign({}, state, { isLoading: true });
        }
        case "FETCH_COMICS_SUCCESS": {
            return Object.assign({}, state, {
                comics: action.comics,
                isLoading: false,
            });
        }
        case "GET_DIRECT_COMICS_SUCCESS": {
            return Object.assign({}, state, {
                comics: action.comics,
                isLoading: false,
            });
        }
        default: {
            return state;
        }
    }
}

export default comicItemsReducer;
