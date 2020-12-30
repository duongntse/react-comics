import { connect } from "react-redux";

import FilterComicButtons from "./FilterComicButtons";
import { setFilterBy } from "./redux/actions/filterByActions";

function mapStateToProps(state) {
    return {
        isLoading: state.comicsByWebsite.isLoading,
        comics: state.comicsByWebsite.comics,
        filterBy: state.filterBy,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setFilterBy: (value) => {
            dispatch(setFilterBy(value));
        },
    };
}

export const ReduxFilterComicButtons = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterComicButtons);

export default ReduxFilterComicButtons;
