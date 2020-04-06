import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {todo} from '../css/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDelete from '../components/ModalDelete';
import ModalEdit from '../components/ModalEdit';

export default class Todo extends Component {
  render() {
    const optionsDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const todos = this.props.propsTodos;
    return (
      <View style={todo.containerFormControl}>
        {this.props.todosIndicator === true ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <ActivityIndicator
              size={50}
              color={
                this.props.colorBtn === 'home'
                  ? '#375CBA'
                  : this.props.colorBtn === 'complete'
                  ? '#B51B22'
                  : '#F79237'
              }
              style={{opacity: 0.7}}></ActivityIndicator>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              paddingHorizontal: 5,
              marginTop: 20,
            }}>
            {todos.totalDocs === 0 ? (
              <View style={{paddingVertical: 15}}>
                {this.props.colorBtn === 'home' ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: '#375CBA',
                    }}>
                    Sorry, you dont have any task.
                  </Text>
                ) : this.props.colorBtn === 'complete' ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: '#B51B22',
                    }}>
                    Sorry, you dont have any complete task.
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: '#F79237',
                    }}>
                    Sorry, you dont have any favorite task.
                  </Text>
                )}
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() =>
                  todos.totalDocs >= 10 ? (
                    <View
                      style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 20,
                        paddingVertical: 5,
                      }}>
                      <TouchableOpacity
                        disabled={todos.hasPrevPage == false ? true : false}
                        onPress={() =>
                          this.props.currentPageTask(
                            this.props.hasPage - 1,
                            !this.props.todosIndicator,
                          )
                        }>
                        <MaterialCommunityIcons
                          name="skip-previous-circle"
                          color={
                            this.props.colorBtn === 'home'
                              ? '#375CBA'
                              : this.props.colorBtn === 'complete'
                              ? '#B51B22'
                              : '#F79237'
                          }
                          style={
                            todos.hasPrevPage == true
                              ? {opacity: 1}
                              : {opacity: 0.5}
                          }
                          size={40}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={todos.hasNextPage == false ? true : false}
                        style={{paddingLeft: 20}}
                        onPress={() =>
                          this.props.currentPageTask(
                            this.props.hasPage + 1,
                            !this.props.todosIndicator,
                          )
                        }>
                        <MaterialCommunityIcons
                          name="skip-next-circle"
                          color={
                            this.props.colorBtn === 'home'
                              ? '#375CBA'
                              : this.props.colorBtn === 'complete'
                              ? '#B51B22'
                              : '#F79237'
                          }
                          style={
                            todos.hasNextPage == true
                              ? {opacity: 1}
                              : {opacity: 0.5}
                          }
                          size={40}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )
                }
                data={todos.docs}
                renderItem={({item}) => (
                  <View
                    style={{
                      flex: 1,
                      elevation: 3,
                      backgroundColor: '#FBFBFC',
                      marginVertical: 10,
                      marginRight: 15,
                      marginLeft: 25,
                      paddingVertical: 20,
                      paddingLeft: 40,
                      borderRadius: 10,
                      marginBottom: 20,
                      borderWidth: 1,
                      borderColor:
                        item.completion === true
                          ? '#B51B22'
                          : item.importance === true
                          ? '#F79237'
                          : '#375CBA',
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        transform: [{translateX: -50}, {translateY: -50}],
                        top: 100,
                        left: 30,
                        backgroundColor:
                          item.completion === true ? '#B51B22' : '#FBFBFC',
                        borderColor:
                          item.completion === true
                            ? '#B51B22'
                            : item.importance === true
                            ? '#F79237'
                            : '#375CBA',
                        borderWidth: 1,
                        borderRadius: 100,
                        elevation: 3,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.actionCompletionTodos(
                            item._id,
                            !item.completion,
                            !this.props.completeIndicator,
                          )
                        }>
                        {this.props.completeIndicator === true &&
                        item._id === this.props.indexCompletion ? (
                          <ActivityIndicator
                            size={40}
                            color={
                              item.completion === true
                                ? '#FBFBFC'
                                : item.importance === true
                                ? '#F79237'
                                : '#375CBA'
                            }
                            style={{opacity: 0.7}}></ActivityIndicator>
                        ) : (
                          <MaterialCommunityIcons
                            name="check-bold"
                            style={{padding: 5}}
                            size={30}
                            color={
                              item.completion === true
                                ? '#FBFBFC'
                                : item.importance === true
                                ? '#F79237'
                                : '#375CBA'
                            }
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          paddingRight: 15,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.actionImportanceTodos(
                              item._id,
                              !item.importance,
                              !this.props.favoriteIndicator,
                            )
                          }>
                          {this.props.favoriteIndicator === true &&
                          item._id === this.props.indexFavorite ? (
                            <ActivityIndicator
                              size={27}
                              color={
                                item.completion === true
                                  ? '#B51B22'
                                  : item.importance === true
                                  ? '#F79237'
                                  : '#375CBA'
                              }
                              style={{opacity: 0.7}}></ActivityIndicator>
                          ) : (
                            <MaterialCommunityIcons
                              name={
                                item.importance === true
                                  ? 'star'
                                  : 'star-outline'
                              }
                              size={26}
                              color={
                                item.completion === true
                                  ? '#B51B22'
                                  : item.importance === true
                                  ? '#F79237'
                                  : '#375CBA'
                              }
                            />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.actionOpenModalEdit(
                              !this.props.statusModalEdit,
                              item._id,
                            )
                          }>
                          <MaterialCommunityIcons
                            name="square-edit-outline"
                            size={25}
                            color={
                              item.completion === true
                                ? '#B51B22'
                                : item.importance === true
                                ? '#F79237'
                                : '#375CBA'
                            }
                            style={{
                              paddingLeft: 5,
                            }}
                          />
                        </TouchableOpacity>
                        {/* modal edit todos */}
                        <Modal
                          animationType="none"
                          transparent={false}
                          visible={this.props.statusModalEdit}
                          onRequestClose={() =>
                            this.props.actionOpenModalEdit(
                              !this.props.statusModalEdit,
                            )
                          }>
                          <ModalEdit
                            editIndicator={this.props.editIndicator}
                            modalStatus={this.props.statusModalEdit}
                            actionModalEdit={this.props.actionOpenModalEdit}
                            actionEditTodos={this.props.actionEditTodos}
                            dataEditTodos={this.props.actionDataEdit}
                          />
                        </Modal>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.actionOpenModalDelete(
                              !this.props.statusModalDelete,
                              item._id,
                            )
                          }>
                          <MaterialCommunityIcons
                            name="trash-can-outline"
                            size={25}
                            color={
                              item.completion === true
                                ? '#B51B22'
                                : item.importance === true
                                ? '#F79237'
                                : '#375CBA'
                            }
                            style={{
                              paddingLeft: 5,
                            }}
                          />
                        </TouchableOpacity>
                        {/* modal delete todos */}
                        <Modal
                          transparent={true}
                          animationType="fade"
                          visible={this.props.statusModalDelete}
                          onRequestClose={() =>
                            this.props.actionOpenModalDelete(
                              !this.props.statusModalDelete,
                            )
                          }>
                          <ModalDelete
                            modalStatus={this.props.statusModalDelete}
                            actionModalDelete={this.props.actionOpenModalDelete}
                            actionDeleteModalTodos={
                              this.props.actionDeleteTodos
                            }
                          />
                        </Modal>
                      </View>
                      <View>
                        <Text
                          style={{
                            color:
                              item.completion === true
                                ? '#B51B22'
                                : item.importance === true
                                ? '#F79237'
                                : '#375CBA',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color:
                              item.completion === true
                                ? '#B51B22'
                                : item.importance === true
                                ? '#F79237'
                                : '#375CBA',
                            paddingVertical: 5,
                            fontSize: 16,
                          }}>
                          {item.description}
                        </Text>
                        <Text
                          style={{
                            color:
                              item.completion === true
                                ? '#B51B22'
                                : item.importance === true
                                ? '#F79237'
                                : '#375CBA',
                            paddingVertical: 8,
                            paddingHorizontal: 20,
                            fontSize: 14,
                            alignSelf: 'flex-end',
                          }}>
                          <MaterialCommunityIcons
                            name="calendar"
                            size={14}
                            color={
                              item.completion === true
                                ? '#B51B22'
                                : item.importance === true
                                ? '#F79237'
                                : '#375CBA'
                            }
                          />{' '}
                          {new Date(item.deadLine).toLocaleDateString(
                            'en-US',
                            optionsDate,
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={item => item._id}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}
