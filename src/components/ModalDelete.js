import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {modalDelete} from '../css/Styles';

export default class ModalDelete extends Component {
  render() {
    return (
      <View style={modalDelete.deleteContainer}>
        <View style={modalDelete.deleteBody}>
          <View style={{marginTop: 20}}>
            <Text style={modalDelete.deleteHeader}>
              Are you sure want to delete this task?
            </Text>
          </View>
          <View style={modalDelete.deleteFooter}>
            <TouchableOpacity
              style={modalDelete.deleteCancel}
              onPress={() => {
                this.props.actionModalDelete(!this.props.modalStatus);
              }}>
              <Text style={modalDelete.textButton}>Cancel</Text>
            </TouchableOpacity>
            <View style={{flex: 0, marginHorizontal: 10}}></View>
            <TouchableOpacity
              style={modalDelete.deleteOk}
              onPress={this.props.actionDeleteModalTodos}>
              <Text style={modalDelete.textButton}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
