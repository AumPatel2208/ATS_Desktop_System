import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import '../Styles/Restricted.scss';

import fourOhFour from '../assets/img/Restricted.svg';
// import astrodude from '../assets/img/astrodude.png';
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
                <div className="res-flex main-wrap justifyCenter">
                    <div className="res-main-container flex">
                        <CSSTransition
                            in={this.state.pageLoaded}
                            timeout={600}
                            classNames="res-fourOhFour"
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
                                    className="res-fourOhFour flex justifyCenter"
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
                                </div>
                            )}
                        </CSSTransition>
                        <CSSTransition
                            in={this.state.fourOhFourLoaded}
                            timeout={600}
                            classNames="res-error-text"
                            unmountOnExit
                        >
                            {state => (
                                <div className="res-error-text flex justifyCenter">
                                    <h3
                                        style={{
                                            color: 'white'
                                        }}
                                    >
                                        Oops… Looks like you do not have access
                                        to this page.
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
