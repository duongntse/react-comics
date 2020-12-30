import { client } from "../../api/apiClient";

export const FETCH_COMICS_REQUEST = "FETCH_COMICS_REQUEST";
function fetchComicsRequest() {
    return { type: FETCH_COMICS_REQUEST };
}

export const FETCH_COMICS_SUCCESS = "FETCH_COMICS_SUCCESS";
function fetchComicsSuccess(comics) {
    return { type: FETCH_COMICS_SUCCESS, comics };
}

export function fetchComics() {
    return function (dispatch) {
        // 1: fetch comics request
        dispatch(fetchComicsRequest());
        // 2: fetch comics success
        client.loadItems().then((comics) => {
            dispatch(fetchComicsSuccess(comics));
        });
    };
}
