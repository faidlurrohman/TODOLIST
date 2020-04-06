import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {landing} from '../css/Styles';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Landing extends Component {
  render() {
    return (
      <View style={landing.container}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={landing.txtTitle}>TO DO LIST</Text>
            <Swiper
              showsButtons={false}
              dot={
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,.3)',
                    width: 8,
                    height: 8,
                    borderRadius: 7,
                    marginLeft: 7,
                    marginRight: 7,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: '#FBFBFC',
                    width: 8,
                    height: 8,
                    borderRadius: 7,
                    marginLeft: 7,
                    marginRight: 7,
                  }}
                />
              }>
              <View style={landing.slide1}>
                <Icon name="tasks" size={150} color="#FBFBFC" />
                <Text style={landing.textSlide}>
                  Add task, reminders, and ideas quickly.
                </Text>
              </View>
              <View style={landing.slide2}>
                <Icon name="wpforms" size={150} color="#FBFBFC" />
                <Text style={landing.textSlide}>
                  Know what you need to get done.
                </Text>
              </View>
            </Swiper>
          </View>
        </View>
        <View style={{flex: 0}}>
          <TouchableOpacity
            style={landing.btn1}
            onPress={() => this.props.navigation.navigate('Login')}>
            <View>
              <Text style={landing.textBtn1}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={landing.btn2}
            onPress={() => this.props.navigation.navigate('Signup')}>
            <View>
              <Text style={landing.textBtn2}>Create an account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
