// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// // import PaymentForm from './Components/PaymentForm';

// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>
//                     Edit <code>src/App.js</code> and save to reload.
//                 </p>
//             </header>{' '}
//             */}
//         </div>
//     );
// }

// export default App;
// // start script
// // "electron-dev": "concurrently \"BROWSER=none yarn start\" \"wait-on http://localhost:3000 && electron .\""

//Add REACT function to do the authentication thing for routes

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Nav from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import NotFound from './Pages/404';
import Restricted from './Pages/Restricted';
import RegisterStaff from './Pages/RegisterStaff';

import Reports from './Pages/Reports';
import Blanks from './Pages/Blanks';
import Customers from './Pages/Customers';
import { CustomerUpdate } from './Components/CustomerUpdate';
import { Authenticate } from './Authenticate';
import BackupRestore from './Pages/BackupRestore';
import ExRates from "./Pages/ExRates";
import Sale from "./Pages/Sale";

const apiLinks = require('./api/config.json');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            staff: undefined,
            isAuthenticated: false
        };
    }

    async componentDidMount() {
        //Loading User
        await axios.get('api/secure/staff').then(res => {
            this.setState({ ...this.state, userID: res.data });
        });
        await axios.get('api/staffMembers/' + this.state.userID).then(res => {
            this.setState({
                ...this.state,
                staff: res.data,
                isAuthenticated: true
            });
        });
    }

    render() {
        return (
            <div>
                <Nav
                    isAuthenticated={this.state.isAuthenticated}
                    user={this.state.user}
                ></Nav>
                <Switch>
                    <Route
                        exact={true}
                        path="/"
                        render={() => (
                            <div className="App">
                                <Home />
                            </div>
                        )}
                    />
                    <Route
                        exact={true}
                        path="/customers"
                        render={() => (
                            <div className="App">
                                {this.state.isAuthenticated ? (
                                    <Customers />
                                ) : (
                                    <Restricted></Restricted>
                                )}
                            </div>
                        )}
                    ></Route>
                    <Route
                        path="/customers/:id"
                        render={props => (
                            <CustomerUpdate {...props} isNew={false} />
                        )}
                    />
                    <Route
                        path="/customer/create"
                        render={props => (
                            <CustomerUpdate {...props} isNew={true} />
                        )}
                    />
                    <Route
                        exact={true}
                        path="/login"
                        render={() => (
                            <div className="App">
                                <Login />
                            </div>
                        )}
                    />
                    <Route
                        exact={true}
                        path="/registerStaff"
                        render={() => (
                            <div className="App">
                                <RegisterStaff />
                            </div>
                        )}
                    />
                    <Route
                        exact={true}
                        path="/reports"
                        render={() => (
                            <div className="App">
                                {/* <Nav /> */}
                                <Reports />
                            </div>
                        )}
                    />
                    <Route
                        exact={true}
                        path="/blanks"
                        render={() => (
                            <div className="App">
                                <Blanks />
                            </div>
                        )}
                    />
                    <Route
                        exact={true}
                        path="/backup-restore"
                        render={() => (
                            <div className="App">
                                <BackupRestore></BackupRestore>
                            </div>
                        )}
                    />
                    <Route
                        exact={true}
                        path="/exchange-rates"
                        render={() => (
                            <div className="App">
                                <ExRates></ExRates>
                            </div>
                        )}
                    />
                    <Route
                        exact={true}
                        path="/sale"
                        render={() => (
                            <div className="App">
                                <Sale></Sale>
                            </div>
                        )}
                    />
                    <Route
                        render={() => (
                            <div className="App">
                                <NotFound />
                            </div>
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
