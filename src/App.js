import './App.css';
import Home from "./views/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {i18nPromise} from "consult-app-common";
import {useState} from "react";
import {CircularProgress} from "@material-ui/core";
import RegisterOrganisation from "./views/RegisterOrganisation";

export default function App() {
    let [loading, setLoading] = useState(true);

    i18nPromise.then(() => {
        setLoading(false);
    });

    if (loading)
        return <CircularProgress />;

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/register">
                    <RegisterOrganisation/>
                </Route>
            </Switch>
        </Router>
    );
}
