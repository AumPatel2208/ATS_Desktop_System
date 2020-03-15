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

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Nav from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import NotFound from './Pages/404';
import RegisterStaff from './Pages/RegisterStaff';
import Customers from './Pages/Customers';
import { CustomerUpdate } from './Components/CustomerUpdate';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: []
        };
    }

    componentDidMount() {}

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
                    <Route path="/customers/:id" component={CustomerUpdate} />
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
