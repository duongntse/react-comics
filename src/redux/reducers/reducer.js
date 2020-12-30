import { combineReducers } from "redux";
import comicItemsReducer from "./comicItemsReducer";
import filterByReducer from "./filterByReducer";

export const reducer = combineReducers({
    filterBy: filterByReducer,
    comicsByWebsite: comicItemsReducer,
});
export default reducer;
