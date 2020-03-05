// import React from 'react';
// import { Link } from 'react-router-dom';

// const NotFound = () => (
//     <div>
//         {/* <img
//             src={PageNotFound}
//             style={{
//                 width: 400,
//                 height: 400,
//                 display: 'block',
//                 margin: 'auto',
//                 position: 'relative'
//             }}
//         /> */}
//         <center>
//             <h3>Error 404: Page Not Found</h3>
//             <Link to="/">Return to Home Page</Link>
//         </center>
//     </div>
// );
// export default NotFound;

import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import '../Styles/404.scss';

import fourOhFour from '../assets/img/fourOhFour.svg';
import astrodude from '../assets/img/astrodude.png';
import Container from 'reactstrap/lib/Container';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoaded: false,
            fourOhFourLoaded: false,
            astrotop: '0px',
            astroright: '0px'
        };
    }
    componentDidMount() {
        this.setState({
            pageLoaded: true
        });
    }
    onMouseMove(e) {
        this.setState({
            astrotop: e.clientY / 8 + 'px',
            astroright: e.clientX / 8 + 'px'
        });
    }
    render() {
        return (
            <Container>
                <div className="flex main-wrap justifyCenter">
                    <div className="main-container flex">
                        <CSSTransition
                            in={this.state.pageLoaded}
                            timeout={600}
                            classNames="fourOhFour"
                            onEntered={() => {
                                this.setState({
                                    fourOhFourLoaded: true,
                                    astrotop: '10px',
                                    astroright: '30px'
                                });
                            }}
                            unmountOnExit
                        >
                            {state => (
                                <div
                                    className="fourOhFour flex justifyCenter"
                                    onMouseMove={e => {
                                        this.onMouseMove(e);
                                    }}
                                    onMouseOut={() => {
                                        this.setState({
                                            astrotop: '10px',
                                            astroright: '30px'
                                        });
                                    }}
                                >
                                    <img src={fourOhFour} alt="oops" />
                                    {/* <img
                                        src={astrodude}
                                        className="astrodude"
                                        alt="oops"
                                        style={{
                                            paddingTop: this.state.astrotop,
                                            paddingRight: this.state.astroright
                                        }}
                                    /> */}
                                </div>
                            )}
                        </CSSTransition>
                        <CSSTransition
                            in={this.state.fourOhFourLoaded}
                            timeout={600}
                            classNames="error-text"
                            unmountOnExit
                        >
                            {state => (
                                <div className="error-text flex justifyCenter">
                                    <h3
                                        style={{
                                            color: 'white'
                                        }}
                                    >
                                        Oops… Looks like you got lost
                                    </h3>
                                    <a href="/">GO HOME</a>
                                </div>
                            )}
                        </CSSTransition>
                    </div>
                </div>
            </Container>
        );
    }
}

export default App;
