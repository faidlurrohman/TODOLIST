import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {modalAdd} from '../css/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerVisible: false,
      datePicker: new Date(),
      date: this.props.currentDate,
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
    const {date, datePicker, datePickerVisible} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0}}>
          <Text style={modalAdd.headerModalAdd}>New task</Text>
          <View style={modalAdd.editButton}>
            <TouchableOpacity
              onPress={() => {
                this.props.actionModalAdd(!this.props.modalStatus);
              }}
              style={modalAdd.containerItem}>
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
              style={modalAdd.inputName}
              autoCapitalize="words"
              selectionColor="#375CBA"
              placeholder="Name of your planning"
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
              style={modalAdd.inputDesc}
              multiline={true}
              autoCapitalize="none"
              selectionColor="#375CBA"
              placeholder="What are you planning?"
              onChangeText={value => this.setState({descTodos: value})}
            />
            <TouchableOpacity
              style={modalAdd.btnDate}
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
                <Text style={modalAdd.btnCreateDate}>{date}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{flex: 0}}>
          <TouchableOpacity
            style={modalAdd.btnCreate}
            onPress={() =>
              this.props.actionAddTodos(
                this.state.nameTodos,
                this.state.descTodos,
                this.state.datePicker,
              )
            }>
            <Text style={modalAdd.btnCreateText}>Create</Text>
          </TouchableOpacity>
        </View>
        {/* datetimepicker */}
        {datePickerVisible === true ? (
          <DateTimePicker
            value={datePicker}
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
                  datePicker: value,
                  date: new Date(value).toLocaleDateString(
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
