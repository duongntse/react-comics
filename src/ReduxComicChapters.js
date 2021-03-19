import { connect } from "react-redux";
import { helper } from "./api/helper";
import ComicChapters from "./ComicChapters";
import { fetchComics, getDirectItems } from "./redux/actions/comicItemsActions";
import { cloneDeep } from "lodash";

const filterByComicSiteName = (filterBy, comics) => {
    if (filterBy === "All") {
        const filteredComics = cloneDeep(comics);
        return filteredComics;
    } else {
        const filteredComics = cloneDeep(comics).filter(
            (comic) => comic.website_name === filterBy
        );
        return filteredComics;
    }
};

function mapStateToProps(state) {
    const { filterBy, comicsByWebsite } = state;
    const filteredComics = filterByComicSiteName(
        filterBy,
        comicsByWebsite.comics
    );
    const filteredSortedComics = helper.sortBetaItems(filteredComics);
    return {
        isLoading: state.isLoading,
        comics: state.comics,
        filteredSortedComics,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchComics: () => {
            dispatch(fetchComics());
        },
        getDirectItems: () => {
            dispatch(getDirectItems());
        },
    };
}

export const ReduxComicChapters = connect(
    mapStateToProps,
    mapDispatchToProps
)(ComicChapters);

export default ReduxComicChapters;
