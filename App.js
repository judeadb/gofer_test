import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './pages/Login/LoginForm';
import HomePage from './pages/Landing/HomePage';
import store from './redux/index';
 
class App extends Component {
  	render() {
    	if (this.props.isLoggedIn) {
            return <HomePage />;
        } else {
            return <LoginForm />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default connect(mapStateToProps)(App);