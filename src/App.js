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
import RegisterStaff from './Pages/RegisterStaff';

import Reports from './Pages/Reports';
import Blanks from './Pages/Blanks';
import Customers from './Pages/Customers';
import { CustomerUpdate } from './Components/CustomerUpdate';
import { Authenticate } from './Authenticate';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: {}
        };
    }

    componentDidMount() {
        // //Loading User
        // axios
        //     .get('api/secure/staff', () => {
        //         // get token from local storage
        //         const token = localStorage.token;
        //         // Headers
        //         const config = {
        //             headers: {
        //                 'Content-type': 'application/json'
        //             }
        //         };
        //         // if token, add to headers
        //         if (token) {
        //             config.headers['x-auth-token'] = token;
        //         }
        //         return config;
        //     })
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
        // axios.get('api/secure/staff');
        // axios.get('api/secure/staff', this.tokenConfig()).then(res => {
        //     console.log(res.data);
        // });
        // console.log(localStorage.token);
        //() => {
        // // return { token: localStorage.token };
        // // get token from local storage
        // const token = localStorage.token;
        // // Headers
        // const config = {
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // };
        // // if token, add to headers
        // if (token) {
        //     config.headers['x-auth-token'] = token;
        // }
        // return config;

        // axios
        //     .get(
        //         'api/secure/staff',
        //         { token: localStorage.token },
        //         { headers: { 'Content-Type': 'application/json' } }
        //     )
        //     .then(res => {
        //         this.setState({ ...this.state, tokenPayload: res.data });
        //     });

        axios.get('api/secure/staff').then(res => {
            this.setState({ ...this.state, userID: res.data });
        });
    }

    render() {
        return (
            <div>
                <Nav></Nav>
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
                                <Customers />
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
                                <Nav />
                                <Blanks />
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
