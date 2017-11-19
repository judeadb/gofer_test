import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Image, Text,KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
	render() {
		return (
			<KeyboardAvoidingView 
				behavior="padding" 
				style={styles.container}>
				<View 
					style={styles.logoContainer}>
					<Image 
						style={styles.logo}
						source={require('../Images/TempLogo.png')} 
					/>
					<Text 
						style={styles.title}>
						A work in progress
					</Text>
				</View>
			
				<View 
					style={styles.formContainer}>
					<LoginForm navigation={this.props.navigation} />
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
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	logo: {
		width: 149,
		height: 124
	},
	title: {
		color: '#FFF',
		marginTop: 10,
		width: 150,
		textAlign: 'center',
		opacity: 0.9
	}
});
