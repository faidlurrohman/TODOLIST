import React, {Component} from 'react';
import {Text, View, ToastAndroid} from 'react-native';
import {favorite} from '../css/Styles';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';

import Todo from './Todo';

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      isLoadingFavorite: false,
      indexFavorite: '',
      isLoadingComplete: false,
      indexCompletion: '',
      hasPage: 1,
      hasLimit: 10,
      colorBtn: 'favorite',
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
        this.setState({token: resultToken, isLoadingTodos: true});
        this._getCurrentTasks();
      } else {
        console.log(error);
      }
    });
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
        'https://aneh-sekalian.herokuapp.com/api/v1/tasks/findTaskByImportance?page=' +
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
      });
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
        dataEdit: '',
      });
      await this._getCurrentTasks();
      ToastAndroid.show('Task edited!', ToastAndroid.SHORT);
    }
  };

  render() {
    const {currentDate} = this.state;
    return (
      <View style={favorite.container}>
        <View style={favorite.containerTitle}>
          <View style={{flex: 0}}>
            <Text style={favorite.header}>Your Favorite Tasks</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={favorite.headerChild}>{currentDate}</Text>
            </View>
          </View>
        </View>
        <View style={favorite.containerForm}>
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
        </View>
        <NavigationEvents onDidFocus={() => this._loadToken()} />
      </View>
    );
  }
}
