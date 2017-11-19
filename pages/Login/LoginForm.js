import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Navigation, AppRegistry, StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';
import '../../App';
import { login } from '../../redux/actions/auth';
var bcrypt = require('react-native-bcrypt');

class LoginForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			credential: '',
			p_word: ''
		}
	}
	LoginFunction = () =>{
		const{credential} = this.state;
		const{p_word} = this.state;
		if(credential === '' || p_word === ''){
			Alert.alert("Please fill in the necessary fields!");
		}else{
			fetch('http://192.168.0.42/loginUser.php',{
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					credential: credential
				})
			}).then((response) => response.json())
			.then((responseJson) =>{
				if(responseJson === "Invalid Username or Email or Password. Please try again!"){
					Alert.alert(responseJson);
				}else{
					var hash = responseJson;
					if(bcrypt.compareSync(p_word, hash)){
						this.props.onLogin(this.state.credential, this.state.p_word);
					}else{
						Alert.alert("Invalid Username or Email or Password. Please try again!");
					}
				}
			}).catch((error) => {
				console.error(error);
			}).done();
		}
	}
	render() {
		return (
				<View style={styles.container}>
					<StatusBar
						barStyle="light-content"
					/>
					<TextInput 
						placeholder="Username or Email"	
						placeholderTextColor="rgba(255,255,255,0.7)"
						returnKeyType="next"
						onSubmitEditing={() => this.passwordInput.focus()}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						underlineColorAndroid='transparent'
						style={styles.input}
						onChangeText = {credential => this.setState({credential})}
					/>
					<TextInput 
						placeholder="Password"
						placeholderTextColor="rgba(255,255,255,0.7)"
						returnKeyType="go"
						secureTextEntry
						style={styles.input}
						underlineColorAndroid='transparent'
						ref={(input) => this.passwordInput = input}
						onChangeText = {p_word => this.setState({p_word})}
					/>
					<TouchableOpacity 
						style={styles.buttonContainer}>
						<Text
							onPress={this.LoginFunction} 
							style={styles.buttonText}>
							LOGIN 
						</Text>
					</TouchableOpacity>
					<Text 
						style={styles.signupText}>
							Not a member yet?
					</Text>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('SignUpForm')}>
						<Text
							style={styles.signupTextPress}>
							Register here.
						</Text>
					</TouchableOpacity>
				</View>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (credential, p_word) => { dispatch(login(credential, p_word)); }
    }
}

const styles = StyleSheet.create ({
	container: {
		padding: 20
	},
	input: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.4)',
		marginBottom: 10,
		color: '#FFF',
		paddingHorizontal: 10
	},
	buttonContainer: {
		backgroundColor: '#2980b9',
		paddingVertical: 15
	},
	buttonText: {
		textAlign: 'center',
		color: '#FFF',
		fontWeight: '700'
	},
	signupText: {
		textAlign: 'center',
		color: '#FFF',
		paddingVertical: 12
	},
	signupTextPress: {
		textAlign: 'center',
		color: '#FFF',
		fontWeight: '900'
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);