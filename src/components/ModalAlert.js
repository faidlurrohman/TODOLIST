import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {modalAlert} from '../css/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ModalAlert extends Component {
  render() {
    return (
      <View style={modalAlert.deleteContainer}>
        <View style={modalAlert.deleteBody}>
          <View style={modalAlert.testimoni}>
            <Text style={{color: '#FBFBFC', fontSize: 20, fontWeight: 'bold'}}>
              TEAM D - BATCH 5
            </Text>
            <Text
              style={{
                color: '#FBFBFC',
                fontSize: 20,
                fontWeight: 'bold',
                borderBottomColor: '#FBFBFC',
                paddingBottom: 20,
              }}>
              MINI PROJECT TODO LIST
            </Text>
            <Text style={{color: '#FBFBFC', fontSize: 20, fontWeight: 'bold'}}>
              <MaterialCommunityIcons name="wunderlist" size={20} /> BACK END
            </Text>
            <Text style={{color: '#FBFBFC', fontSize: 20, fontWeight: 'bold'}}>
              <MaterialCommunityIcons name="human-greeting" size={20} /> CHOI
            </Text>
            <Text
              style={{
                color: '#FBFBFC',
                fontSize: 20,
                fontWeight: 'bold',
                paddingBottom: 20,
              }}>
              <MaterialCommunityIcons name="human-greeting" size={20} /> RICKY
            </Text>
            <Text style={{color: '#FBFBFC', fontSize: 20, fontWeight: 'bold'}}>
              <MaterialCommunityIcons name="wunderlist" size={20} /> FRONT END
            </Text>
            <Text style={{color: '#FBFBFC', fontSize: 20, fontWeight: 'bold'}}>
              <MaterialCommunityIcons name="human-greeting" size={20} /> BIANCA
            </Text>
            <Text
              style={{
                color: '#FBFBFC',
                fontSize: 20,
                fontWeight: 'bold',
                paddingBottom: 20,
              }}>
              <MaterialCommunityIcons name="human-greeting" size={20} /> ERNEST
            </Text>
            <Text style={{color: '#FBFBFC', fontSize: 20, fontWeight: 'bold'}}>
              <MaterialCommunityIcons name="wunderlist" size={20} /> REACT
              NATIVE
            </Text>
            <Text
              style={{
                color: '#FBFBFC',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              <MaterialCommunityIcons name="human-greeting" size={20} /> FAID
            </Text>
          </View>
          <View>
            <Text style={modalAlert.deleteHeader}>
              Are you sure want to logout?
            </Text>
          </View>
          <View style={modalAlert.deleteFooter}>
            <TouchableOpacity
              style={modalAlert.deleteCancel}
              onPress={() => {
                this.props.actionShowModalLogout(!this.props.modalLogoutStatus);
              }}>
              <Text style={modalAlert.textButton}>Cancel</Text>
            </TouchableOpacity>
            <View style={{flex: 0, marginHorizontal: 10}}></View>
            <TouchableOpacity
              style={modalAlert.deleteOk}
              onPress={this.props.actionModallogout}>
              <Text style={modalAlert.textButton}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
