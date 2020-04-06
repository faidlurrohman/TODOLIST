import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {signup} from '../css/Styles';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      loadingLoading: false,
      errorChecking: false,
    };
  }

  _loadCheck = () => {
    this.setState({
      errorChecking: false,
    });
  };

  handleName = value => {
    this.setState({
      name: value,
    });
  };

  handleEmail = value => {
    this.setState({
      email: value,
    });
  };

  handlePassword = value => {
    this.setState({
      password: value,
    });
  };

  _register = async () => {
    this.setState({loadingLoading: true});
    const {name, email, password} = this.state;
    if (name === '' || email === '' || password === '') {
      this.setState({
        errorChecking: true,
      });
      ToastAndroid.show(
        'Name, email and password field cannot be empty!',
        ToastAndroid.SHORT,
      );
      this.setState({loadingLoading: false});
    } else {
      try {
        const _procRegister = await axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          url: 'https://aneh-sekalian.herokuapp.com/api/v1/users/',
          data: JSON.stringify({
            name,
            email,
            password,
          }),
        });
        if (_procRegister.data.status === true) {
          await AsyncStorage.setItem(
            '@token',
            JSON.stringify(_procRegister.data.data.token),
          );
          this.setState({loadingLoading: false});
          this.props.navigation.navigate('AuthLoading');
        }
      } catch (e) {
        this.setState({loadingLoading: false, errorChecking: true});
        ToastAndroid.show(
          'Name or email is already exist!',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  render() {
    return (
      <View style={signup.container}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={signup.containerTitle}>
            <Text style={signup.header}>Sign up</Text>
          </View>
          <View style={signup.containerForm}>
            <View style={signup.containerFormControl}>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    color: '#02116d',
                    opacity: 0.5,
                    paddingHorizontal: 5,
                  }}>
                  Fullname
                </Text>
                <TextInput
                  style={
                    this.state.errorChecking === true
                      ? signup.inputError
                      : signup.input
                  }
                  underlineColorAndroid="transparent"
                  placeholder="Enter your fullname"
                  autoCapitalize="words"
                  selectionColor="#375CBA"
                  onChangeText={value => this.handleName(value)}
                />
                <Text
                  style={{
                    color: '#02116d',
                    opacity: 0.5,
                    paddingHorizontal: 5,
                  }}>
                  Email
                </Text>
                <TextInput
                  style={
                    this.state.errorChecking === true
                      ? signup.inputError
                      : signup.input
                  }
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  selectionColor="#375CBA"
                  onChangeText={value => this.handleEmail(value)}
                />
                <Text
                  style={{
                    color: '#02116d',
                    opacity: 0.5,
                    paddingHorizontal: 5,
                  }}>
                  Password
                </Text>
                <TextInput
                  style={
                    this.state.errorChecking === true
                      ? signup.inputError
                      : signup.input
                  }
                  placeholder="Enter your password"
                  underlineColorAndroid="transparent"
                  secureTextEntry
                  autoCapitalize="none"
                  selectionColor="#375CBA"
                  onChangeText={value => this.handlePassword(value)}
                />
              </View>
              <View style={{flex: 0, marginTop: 15}}>
                <TouchableOpacity style={signup.btn1} onPress={this._register}>
                  {this.state.loadingLoading === true ? (
                    <ActivityIndicator color="#FBFBFC" size={24} />
                  ) : (
                    <Text style={signup.textBtn1}>Sign up</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <Text
              style={{
                color: '#02116d',
                opacity: 0.5,
              }}>
              Already have an account?
            </Text>
            <Text
              style={{color: '#375CBA'}}
              onPress={() => this.props.navigation.navigate('Login')}>
              {' '}
              Login!
            </Text>
          </View>
        </ScrollView>
        <NavigationEvents onDidFocus={() => this._loadCheck()} />
      </View>
    );
  }
}
