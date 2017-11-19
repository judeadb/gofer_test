import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, Text, View, Button } from 'react-native';
import { logout } from '../redux/actions/auth';
 
class Secured extends Component {
    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }
     
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.box, styles.box1]}>
                    <Text style={{fontSize: 27, color: 'white'}}>
                        {`${this.props.username}`}'s Gofer
                    </Text>
                </View>
                <View style={[styles.box, styles.box2]}>
                    <ScrollView style={styles.scroll}></ScrollView>
                </View>
                <View style={[styles.box, styles.box3]}>
                    <Button color='#ddc8c4' onPress={(e) => this.userLogout(e)} title="Logout"/>
                </View>
            </View>
        );
    }
}
 
 
const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#ddc8c4',
        padding: 30,
        flexDirection: 'column'
    },
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
        backgroundColor: '#466362'
    },
    box2: {
        flex: 10,
        backgroundColor: '#8BC34A'
    },
    box3: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#938581'
    }
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Secured);