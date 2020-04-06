import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {home} from '../css/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';

import ModalAdd from '../components/ModalAdd';
import Todo from './Todo';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      token: '',
      currentDate: '',
      todos: [],
      modalAdd: false,
      modalEdit: false,
      modalDelete: false,
      idDelete: '',
      dataEdit: [],
      isLoadingTodos: true,
      isLoadingEdit: true,
      isLoadingName: true,
      isLoadingFavorite: false,
      indexFavorite: '',
      isLoadingComplete: false,
      indexCompletion: '',
      hasPage: 1,
      hasLimit: 10,
      colorBtn: 'home',
    };
  }

  componentDidMount = () => {
    let date = new Date();
    const optionsDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    this.setState({
      currentDate: new Date(date).toLocaleDateString('en-US', optionsDate),
    });

    // this.props.navigation.addListener('didFocus', () => {
    //   this._loadToken();
    // });

    this._loadToken();
  };

  _loadToken = async () => {
    await AsyncStorage.getItem('@token', (error, response) => {
      if (response) {
        let resultToken = JSON.parse(response);
        this.setState({
          token: resultToken,
          isLoadingTodos: true,
          isLoadingName: true,
        });
        this._getCurrentUser();
        this._getCurrentTasks();
      } else {
        console.log(error);
      }
    });
  };

  _getCurrentUser = async () => {
    let currentUser = await axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.token,
      },
      url: 'https://aneh-sekalian.herokuapp.com/api/v1/users/',
    });
    if (currentUser.data.status === true) {
      this.setState({
        name: currentUser.data.data.name,
      });
    }
  };

  _getCurrentTasks = async (pageData, indicator) => {
    if (pageData !== undefined) {
      this.setState({
        hasPage: pageData,
        isLoadingTodos: indicator,
      });
    }
    let currentTasks = await axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.token,
      },
      url:
        'https://aneh-sekalian.herokuapp.com/api/v1/tasks?page=' +
        (pageData !== undefined ? pageData : this.state.hasPage) +
        '&limit=' +
        this.state.hasLimit,
    });
    if (currentTasks.data.status === true) {
      this.setState({
        todos: [],
      });
      this.setState({
        todos: currentTasks.data.data,
        isLoadingTodos: false,
        isLoadingName: false,
      });
    }
  };

  _setModalAdd = visible => {
    this.setState({modalAdd: visible});
  };

  _addTodos = async (name, desc, date) => {
    if (name !== '' && desc !== '') {
      let addTasks = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.token,
        },
        url: 'https://aneh-sekalian.herokuapp.com/api/v1/tasks/',
        data: {
          name: name,
          description: desc,
          deadLine: date,
        },
      });
      if (addTasks.data.status === true) {
        this.setState({
          modalAdd: false,
          isLoadingTodos: true,
        });
        await this._getCurrentTasks();
        ToastAndroid.show('Task added!', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show(
        'Name and description cannot be empty!',
        ToastAndroid.SHORT,
      );
    }
  };

  _importanceTodos = async (id, value, indicator) => {
    this.setState({isLoadingFavorite: indicator, indexFavorite: id});
    let importanceTasks = await axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.token,
      },
      url: 'https://aneh-sekalian.herokuapp.com/api/v1/tasks/' + id,
      data: {
        importance: value,
      },
    });
    if (importanceTasks.data.status === true) {
      await this._getCurrentTasks();
      this.setState({isLoadingFavorite: false});
    }
  };

  _completionTodos = async (id, value, indicator) => {
    this.setState({isLoadingComplete: indicator, indexCompletion: id});
    let completionTasks = await axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.token,
      },
      url: 'https://aneh-sekalian.herokuapp.com/api/v1/tasks/' + id,
      data: {
        completion: value,
      },
    });
    if (completionTasks.data.status === true) {
      await this._getCurrentTasks();
      this.setState({isLoadingComplete: false});
    }
  };

  _setModalDelete = (visible, id) => {
    this.setState({
      modalDelete: visible,
      idDelete: id,
    });
  };

  _deleteTodos = async () => {
    let deleteTasks = await axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.token,
      },
      url:
        'https://aneh-sekalian.herokuapp.com/api/v1/tasks/' +
        this.state.idDelete,
    });
    if (deleteTasks.data.status === true) {
      this.setState({
        modalDelete: !this.state.modalDelete,
        isLoadingTodos: true,
        idDelete: '',
      });
      await this._getCurrentTasks();
      ToastAndroid.show('Task deleted!', ToastAndroid.SHORT);
    }
  };

  _setModalEdit = async (visible, id) => {
    this.setState({
      modalEdit: visible,
    });
    if (id !== undefined) {
      let editTasks = await axios({
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.token,
        },
        url: 'https://aneh-sekalian.herokuapp.com/api/v1/tasks/' + id,
      });
      if (editTasks.data.status === true) {
        this.setState({
          dataEdit: editTasks.data.data.data,
          isLoadingEdit: false,
        });
      }
    } else {
      this.setState({
        dataEdit: [],
        isLoadingEdit: true,
      });
    }
  };

  _editTodos = async (name, desc, dateLine) => {
    let editTasks = await axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.token,
      },
      url:
        'https://aneh-sekalian.herokuapp.com/api/v1/tasks/' +
        this.state.dataEdit._id,
      data: {
        name: name,
        description: desc,
        deadLine: dateLine,
      },
    });
    if (editTasks.data.status === true) {
      this.setState({
        modalEdit: !this.state.modalEdit,
        isLoadingTodos: true,
        isLoadingEdit: true,
        dataEdit: [],
      });
      await this._getCurrentTasks();
      ToastAndroid.show('Task edited!', ToastAndroid.SHORT);
    }
  };

  render() {
    const {name, currentDate, isLoadingName} = this.state;
    return (
      <View style={home.container}>
        <View style={home.containerTitle}>
          {isLoadingName === true ? (
            <View
              style={{
                flex: 0,
                alignSelf: 'flex-start',
                paddingLeft: 20,
                paddingVertical: 3,
              }}>
              <ActivityIndicator
                size={25}
                color="#FBFBFC"
                style={{opacity: 0.7}}></ActivityIndicator>
            </View>
          ) : (
            <View style={{flex: 0}}>
              <Text style={home.header}>Hello {name}</Text>
            </View>
          )}
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={home.headerChild}>{currentDate}</Text>
            </View>
            <View style={{flex: 0, paddingRight: 18}}>
              <TouchableOpacity
                style={home.btnAdd}
                onPress={() => {
                  this._setModalAdd(true);
                }}>
                <Text style={home.textBtnAdd}>
                  <MaterialCommunityIcons
                    name="plus-circle"
                    color="#375CBA"
                    size={14}
                  />{' '}
                  Add task
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={home.containerForm}>
          <Todo
            propsTodos={this.state.todos}
            actionImportanceTodos={this._importanceTodos}
            actionCompletionTodos={this._completionTodos}
            actionDeleteTodos={this._deleteTodos}
            statusModalDelete={this.state.modalDelete}
            actionOpenModalDelete={this._setModalDelete}
            actionDataEdit={this.state.dataEdit}
            actionEditTodos={this._editTodos}
            todosIndicator={this.state.isLoadingTodos}
            editIndicator={this.state.isLoadingEdit}
            statusModalEdit={this.state.modalEdit}
            actionOpenModalEdit={this._setModalEdit}
            hasPage={this.state.hasPage}
            currentPageTask={this._getCurrentTasks}
            colorBtn={this.state.colorBtn}
            favoriteIndicator={this.state.isLoadingFavorite}
            indexFavorite={this.state.indexFavorite}
            completeIndicator={this.state.isLoadingComplete}
            indexCompletion={this.state.indexCompletion}
          />
          {/* modal add todos */}
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalAdd}
            onRequestClose={this._setModalAdd}>
            <ModalAdd
              currentDate={this.state.currentDate}
              actionAddTodos={this._addTodos}
              modalStatus={this.state.modalAdd}
              actionModalAdd={this._setModalAdd}
            />
          </Modal>
        </View>
        <NavigationEvents onDidFocus={() => this._loadToken()} />
      </View>
    );
  }
}
