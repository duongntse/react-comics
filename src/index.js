import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./semantic-dist/semantic.min.css";

// Router
import {
    // BrowserRouter as Router,
    HashRouter,
} from "react-router-dom";

// Redux + thunk
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./redux/reducers/reducer";
// action
import {
    fetchComics,
    // getDirectItems
} from "./redux/actions/comicItemsActions";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

class Index extends React.Component {
    componentDidMount() {
        store.dispatch(fetchComics());
        // store.dispatch(getDirectItems());
    }

    render() {
        return (
            <React.StrictMode>
                <Provider store={store}>
                    {/* <Router> */}
                    <HashRouter>
                        <App />
                    </HashRouter>
                    {/* </Router> */}
                </Provider>
            </React.StrictMode>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
