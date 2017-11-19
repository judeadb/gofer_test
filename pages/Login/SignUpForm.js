import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';
import '../../App';
var bcrypt = require('react-native-bcrypt');

export default class SignUpForm extends Component {
	constructor(props){
		super(props);
		this.state = {u_name: '', l_name: '', f_name: '', e_mail: '', digits: '', p_word: '', cp_word: ''};
	}

	CheckTextInputIsEmptyOrNot = () =>{
		const { u_name } = this.state;
		const { l_name } = this.state;
		const { f_name } = this.state;
		const { e_mail } = this.state;
		const { digits } = this.state;
		const { p_word } = this.state;
		const { cp_word } = this.state;
		let hash = bcrypt.hashSync(p_word, 8);

		if(u_name === '' || l_name === '' || f_name === '' || e_mail === '' || p_word === '') {
			Alert.alert("You have not filled in all required fields.");
		}
		else if(p_word !== cp_word) {
			Alert.alert("The passwords you have input do not match.");
		}
		else {
			fetch('http://192.168.0.42/insertUser.php',{
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_name: u_name,
					last_name: l_name,
					first_name: f_name,
					email: e_mail,
					phone_number: digits,
					password: hash
			  })
				}).then((response) => response.json())
				.then((responseJson) => {Alert.alert(responseJson);})
				.then(this.refs['user'].setNativeProps({text: ''}))
				.then(this.refs['fn'].setNativeProps({text: ''}))
				.then(this.refs['ln'].setNativeProps({text: ''}))	
				.then(this.refs['em'].setNativeProps({text: ''}))
				.then(this.refs['mn'].setNativeProps({text: ''}))
				.then(this.refs['pw'].setNativeProps({text: ''}))
				.then(this.refs['cpw'].setNativeProps({text: ''}))
			.catch((error) =>{console.log(error)}) 
			.done();
		}
	}
	//192.168.254.100 is my local ip address, please change it to your respective local ip address 	if you want to test 
	render() {
		return (
			<KeyboardAvoidingView 
				behavior="padding" 
				style={styles.container}>
				<Text
					style={styles.title}>
					Sign Up
				</Text>
				<View
					style={styles.infoContainer}>
					<TextInput
						ref = {'user'}
						placeholder="User Name"
						placeholderTextColor="rgba(255,255,255,0.7)"
						autoCapitalize="none"
						autoCorrect={false}
						underlineColorAndroid='transparent'
						style={styles.input}
						onChangeText={u_name => this.setState({u_name})}
					/>
					<View
						style={styles.bigNameContainer}>
						<View
							style={styles.smallNameContainer}>
								<TextInput
									ref = {'fn'} 
									placeholder="First name"
									placeholderTextColor="rgba(255,255,255,0.7)"
									autoCorrect={false}
									underlineColorAndroid='transparent'
									style={styles.input}
									onChangeText={f_name => this.setState({f_name})}
								/>
						</View>
						<View
							style={styles.smallNameContainer}>
								<TextInput 
									ref = {'ln'}
									placeholder="Last name"
									placeholderTextColor="rgba(255,255,255,0.7)"
									autoCorrect={false}
									underlineColorAndroid='transparent'
									style={styles.input}
									onChangeText={l_name => this.setState({l_name})}
								/>
						</View>
					</View>
					<TextInput
						ref = {'em'}
						placeholder="Email"
						placeholderTextColor="rgba(255,255,255,0.7)"
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						underlineColorAndroid='transparent'
						style={styles.input}
						onChangeText={e_mail => this.setState({e_mail})}
					/>
					<TextInput
						ref = {'mn'}
						placeholder="Mobile Number w/o 0"
						placeholderTextColor="rgba(255,255,255,0.7)"
						keyboardType="phone-pad"
						autoCapitalize="none"
						autoCorrect={false}
						underlineColorAndroid='transparent'
						style={styles.input}
						onChangeText={digits => this.setState({digits})}
					/>
					<TextInput 
						ref = {'pw'}
						placeholder="Password"
						placeholderTextColor="rgba(255,255,255,0.7)"
						autoCapitalize="none"
						autoCorrect={false}
						secureTextEntry
						underlineColorAndroid='transparent'
						style={styles.input}
						onChangeText={p_word => this.setState({p_word})}
					/>
					<TextInput 
						ref = {'cpw'}
						placeholder="Confirm password"
						placeholderTextColor="rgba(255,255,255,0.7)"
						autoCapitalize="none"
						autoCorrect={false}
						secureTextEntry
						underlineColorAndroid='transparent'
						style={styles.input}
						onChangeText={cp_word => this.setState({cp_word})}
					/>
					<TouchableOpacity 
						style={styles.buttonContainer}>
						<Text
							onPress={this.CheckTextInputIsEmptyOrNot}
							style={styles.buttonText}>
							CREATE ACCOUNT
						</Text>
					</TouchableOpacity>
					<Text 
						style={styles.signupText}>
							Already a member?
					</Text>
					<TouchableOpacity
						onPress={() => this.props.navigation.goBack()}>
						<Text
							style={styles.signupTextPress}>
							Back to login page.
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create ({
	container: {
		flex: 1,
		backgroundColor: '#3498db'
	},
	title: {
		marginTop: 40,
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		color: '#FFF'	
	},
	infoContainer: {	
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	bigNameContainer: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	smallNameContainer: {
		flex: 1,
		alignItems: 'stretch',
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
	input: {
		height: 35,
		backgroundColor: 'rgba(255,255,255,0.4)',
		marginBottom: 10,
		color: '#FFF',
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginLeft: 7,
		marginRight: 7
	},
	signupText: {
		textAlign: 'center',
		color: '#FFF',
		paddingVertical: 10
	},
	signupTextPress: {
		textAlign: 'center',
		color: '#FFF',
		fontWeight: '900'
	}
})