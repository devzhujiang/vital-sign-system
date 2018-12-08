import React from "react";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import { Provider } from "react-redux";
import "./style.less";
import Main from "./pages/Main/views";
import NotFound from "./pages/NotFound/views";
import Loadable from "react-loadable";
import { Spin } from "antd";
const loadingStyle = {
    position: "absolute",
    top: "50vh",
    left: "50vw",
    background: "transparent"
};
const Loading = props => {
    return <Spin style={loadingStyle} />;
};
const App = ({ store }) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/login" />} />
                        <Route
                            exact={true}
                            strict={true}
                            path={"/login"}
                            component={Loadable({
                                loader: () => import("./pages/Login/views"),
                                loading: Loading
                            })}
                        />
                        <Main>
                            <div>
                                <Route
                                    path="/index"
                                    component={Loadable({
                                        loader: () => import("./pages/Index/views"),
                                        loading: Loading
                                    })}
                                />
                                <Route
                                    path="/warningSet"
                                    component={Loadable({
                                        loader: () => import("./pages/WarningSet/views"),
                                        loading: Loading
                                    })}
                                />
                                <Route
                                    path="/bedSet"
                                    component={Loadable({
                                        loader: () => import("./pages/BedSet/views"),
                                        loading: Loading
                                    })}
                                />
                                <Route
                                    path="/admissionHospital"
                                    component={Loadable({
                                        loader: () => import("./pages/AdmissionHospital/views"),
                                        loading: Loading
                                    })}
                                />
                                <Route
                                    path="/warningDetails"
                                    component={Loadable({
                                        loader: () => import("./pages/WarningDetails/views"),
                                        loading: Loading
                                    })}
                                />
                                <Route
                                    path="/dataStatistics"
                                    component={Loadable({
                                        loader: () => import("./pages/DataStatistics/views"),
                                        loading: Loading
                                    })}
                                />
                                <Route
                                    path="/visualCharts"
                                    component={Loadable({
                                        loader: () => import("./pages/VisualCharts/views"),
                                        loading: Loading
                                    })}
                                />
                                <Route
                                    path="/searchPaitents"
                                    component={Loadable({
                                        loader: () => import("./pages/SearchPaitents/views"),
                                        loading: Loading
                                    })}
                                />
                            </div>
                        </Main>
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};
export default App;
