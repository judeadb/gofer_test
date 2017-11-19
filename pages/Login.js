import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    StyleSheet, ScrollView, Text, TextInput, View, Dimensions, Image, Button
} from 'react-native';
import { login } from '../redux/actions/auth';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            route: 'Login',
            username: '',
            password: ''
        };
    }
 
    userLogin (e) {
        this.props.onLogin(this.state.username, this.state.password);
        e.preventDefault();
    }
 
    toggleRoute (e) {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        this.setState({ route: alt });
        e.preventDefault();
    }

    loginPage3(alt) {
        return (
            <View style={styles.container}>
                <View style={[styles.box, styles.box1]}>
                    <Image source={require('../src/images/tempLogo.png')} />
                    <Text style={{ fontSize: 36, color: '#7e6551' }} >Welcome to Gofer</Text>
                    <View style={{ margin: 21 }} />
                    <Text style={{ fontSize: 18, color: '#6b818c' }}>Please {this.state.route}</Text>
                    <View style={{ margin: 7 }} />
                    <View style={styles.borderStyle}>
                        <TextInput style={styles.textInput} placeholder='Username' autoCapitalize='none' autoCorrect={false} autoFocus={true} keyboardType='email-address' value={this.state.username} onChangeText={(text) => this.setState({ username: text })} />
                    </View>
                    <View style={{ margin: 7 }} />
                    <View style={styles.borderStyle}>
                        <TextInput style={styles.textInput} placeholder='Password' autoCapitalize='none' autoCorrect={false} secureTextEntry={true} value={this.state.password} onChangeText={(text) => this.setState({ password: text })} />
                    </View>
                    <View style={{ margin: 14 }} />
                    <View style={styles.buttonActionContainer}>
                        <Button color='white' onPress={(e) => this.userLogin(e)} title={this.state.route} />
                    </View>
                    <View style={{ margin: 14 }} />
                    <Text style={{ fontSize: 16, color: '#6b818c' } } onPress={(e) => this.toggleRoute(e)} >{alt}</Text>
                </View>
            </View>
        );
    }

    render () {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        return (
            this.loginPage3(alt)
        )
    }
}
 
 
const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => { dispatch(login(username, password)); },
        onSignUp: (username, password) => { dispatch(signup(username, password)); }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    box: {
        flex: 1
    },
    box1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#ddc8c4'
    },
    buttonActionContainer: {
        backgroundColor: '#466362',
        width: '50%',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25
    },
    textInput: {
        height: 35,
        fontSize: 18,
    },
    borderStyle: {
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '50%'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);