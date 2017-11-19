import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';
import '../../App';
import { logout } from '../../redux/actions/auth';

class HomePage extends Component {
	render() {
		return (
			<KeyboardAvoidingView 
				behavior="padding" 
				style={styles.container}>
				<Text
					style={styles.title}>
					Welcome to Gofer, {`${this.props.credential}`}
				</Text>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        credential: state.auth.credential
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
}

const styles = StyleSheet.create({
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);