import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {modalEdit} from '../css/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerVisible: false,
      nameTodos: '',
      descTodos: '',
      dateTodos: '',
    };
  }

  _showDatePicker = () => {
    this.setState({
      datePickerVisible: true,
    });
  };

  render() {
    const optionsDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const {datePickerVisible, dateTodos} = this.state;
    if (this.props.editIndicator === true) {
      return (
        <View
          style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator
            size={50}
            color="#375CBA"
            style={{opacity: 0.7}}></ActivityIndicator>
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0}}>
          <Text style={modalEdit.headerModaEdit}>Edit task</Text>
          <View style={modalEdit.editButton}>
            <TouchableOpacity
              onPress={() => {
                this.props.actionModalEdit(!this.props.modalStatus);
              }}
              style={modalEdit.containerItem}>
              <MaterialCommunityIcons name="close" size={28} color="#375CBA" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 25}}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                color: '#375CBA',
                paddingHorizontal: 5,
              }}>
              Name :
            </Text>
            <TextInput
              style={modalEdit.inputName}
              autoCapitalize="words"
              selectionColor="#375CBA"
              defaultValue={this.props.dataEditTodos.name}
              onChangeText={value => this.setState({nameTodos: value})}
            />
            <Text
              style={{
                fontSize: 18,
                color: '#375CBA',
                paddingHorizontal: 5,
              }}>
              Descriptions :
            </Text>
            <TextInput
              style={modalEdit.inputDesc}
              multiline={true}
              autoCapitalize="none"
              selectionColor="#375CBA"
              defaultValue={this.props.dataEditTodos.description}
              onChangeText={value => this.setState({descTodos: value})}
            />
            <TouchableOpacity
              style={modalEdit.btnDate}
              onPress={this._showDatePicker}>
              <View style={{flex: 1}}>
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={22}
                  color="#375CBA"
                  style={{paddingRight: 5}}
                />
              </View>
              <View style={{flex: 0}}>
                <Text style={modalEdit.btnCreateDate}>
                  {dateTodos !== ''
                    ? dateTodos
                    : new Date(
                        this.props.dataEditTodos.deadLine,
                      ).toLocaleDateString('en-US', optionsDate)}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{flex: 0}}>
          <TouchableOpacity
            style={modalEdit.btnCreate}
            onPress={() =>
              this.props.actionEditTodos(
                this.state.nameTodos === ''
                  ? this.props.dataEditTodos.name
                  : this.state.nameTodos,
                this.state.descTodos === ''
                  ? this.props.dataEditTodos.description
                  : this.state.descTodos,
                this.state.dateTodos === ''
                  ? this.props.dataEditTodos.deadLine
                  : this.state.dateTodos,
              )
            }>
            <Text style={modalEdit.btnCreateText}>Save</Text>
          </TouchableOpacity>
        </View>
        {/* datetimepicker */}
        {datePickerVisible === true ? (
          <DateTimePicker
            value={new Date(this.props.dataEditTodos.deadLine)}
            mode="date"
            display="spinner"
            visible={this.state.datePickerVisible}
            onChange={(event, value) => {
              if (value !== undefined) {
                const optionsDate = {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                };
                this.setState({
                  datePickerVisible: false,
                  dateTodos: new Date(value).toLocaleDateString(
                    'en-US',
                    optionsDate,
                  ),
                });
              } else {
                this.setState({
                  datePickerVisible: false,
                });
              }
            }}
          />
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}
