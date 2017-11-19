import React, {Component} from 'react';
import {AppRegistry,StyleSheet,TextInput,View,Alert,Button} from 'react-native';

export default class SampleApp extends Component {
  constructor(props){
    super(props);
    this.InsertUser = this.InsertUser.bind(this);
    this.state = {u_name: '', l_name: '', f_name: '', e_mail: '', digits: '', pword: ''};
  }
  //192.168.254.101 is my local ip address, please change it to your respective local ip address if you want to test 
  InsertUser(){
    fetch('http://192.168.254.101/insertUser.php',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: this.state.u_name,
        last_name: this.state.l_name,
        first_name: this.state.f_name,
        email: this.state.e_mail,
        phone_number: this.state.digits,
        password: this.state.pword
      })//printing to console that will say the unexpected EOF error
    }).then((response) => response.json()).then(Alert.alert("Succesfully made an account!")).catch((error) =>{console.log(error)}).done();
    }
    render(){
      return(
        <View style={styles.container}>
        <TextInput placeholder="Enter Username" onChangeText={u_name => this.setState({u_name})} underlineColorAndroid='transparent' style={styles.TextInputStyleClass}/>
        <TextInput placeholder="Enter Last Name" onChangeText={l_name => this.setState({l_name})} underlineColorAndroid='transparent' style={styles.TextInputStyleClass}/>
        <TextInput placeholder="Enter First Name" onChangeText={f_name => this.setState({f_name})} underlineColorAndroid='transparent' style={styles.TextInputStyleClass}/>
        <TextInput placeholder="Enter Email" onChangeText={e_mail => this.setState({e_mail})} underlineColorAndroid='transparent' style={styles.TextInputStyleClass}/>
        <TextInput placeholder="Enter Phone Number without Zero" onChangeText={digits => this.setState({digits})} underlineColorAndroid='transparent' style={styles.TextInputStyleClass}/>
        <TextInput placeholder="Enter Password" onChangeText={pword => this.setState({pword})} underlineColorAndroid='transparent' style={styles.TextInputStyleClass}/>
        <Button title="Sign Up" onPress={this.InsertUser} color="#2196F3"/>
        </View>
        );
      }
    }

    const styles = StyleSheet.create({

      container:{
        justifyContent: 'center',
        flex:1,
        margin: 10
      },

      TextInputStyleClass:{
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#FF5722',
      }

    });

    AppRegistry.registerComponent('SampleApp', () => SampleApp);
    
    