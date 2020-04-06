import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {drawer} from '../css/Styles';
import ModalProfile from '../components/ModalProfile';
import ModalAlert from '../components/ModalAlert';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name: '',
      email: '',
      image: '',
      password: '',
      modalEditProfil: false,
      modalLogout: false,
      modalImage: false,
      isLoadingProfile: true,
      isLoadingEdit: false,
    };
  }

  componentDidMount = () => {
    this._loadToken();
  };

  _loadToken = async () => {
    await AsyncStorage.getItem('@token', (error, response) => {
      if (response) {
        let resultToken = JSON.parse(response);
        this.setState({token: resultToken});
        this._getCurrentUser(resultToken);
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
        email: currentUser.data.data.email,
        password: currentUser.data.data.password,
        image: currentUser.data.data.image,
        isLoadingProfile: false,
      });
    }
  };

  _setModalEdit = async visible => {
    this.setState({modalEditProfil: visible});
  };

  _editProfile = async (name, email, password, image, indicator) => {
    this.setState({isLoadingEdit: indicator});
    if (image !== undefined) {
      if (image === this.state.image) {
        try {
          let editNameEmail = await axios({
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.state.token,
            },
            url: 'https://aneh-sekalian.herokuapp.com/api/v1/users/update',
            data: JSON.stringify({
              name,
              email,
            }),
          });
          if (editNameEmail.data.status === true) {
            if (password !== this.state.password) {
              await axios({
                method: 'put',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.state.token,
                },
                url: 'https://aneh-sekalian.herokuapp.com/api/v1/users/update',
                data: JSON.stringify({
                  password,
                }),
              });
            }
            this.setState({
              modalEditProfil: !this.state.modalEditProfil,
              isLoadingProfile: true,
              isLoadingEdit: false,
            });
            await this._getCurrentUser();
            ToastAndroid.show('Profile edited!', ToastAndroid.SHORT);
          }
        } catch (e) {
          this.setState({
            isLoadingEdit: false,
          });
          ToastAndroid.show(
            'Name or Email is already exist!',
            ToastAndroid.SHORT,
          );
        }
      } else {
        try {
          let editNameEmail = await axios({
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.state.token,
            },
            url: 'https://aneh-sekalian.herokuapp.com/api/v1/users/update',
            data: JSON.stringify({
              name,
              email,
            }),
          });
          if (editNameEmail.data.status === true) {
            if (password !== this.state.password) {
              await axios({
                method: 'put',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.state.token,
                },
                url: 'https://aneh-sekalian.herokuapp.com/api/v1/users/update',
                data: JSON.stringify({
                  password,
                }),
              });
            }
            // image upload
            var dataForm = new FormData();
            dataForm.append('image', {
              uri: image.uri,
              type: image.type,
              name: image.fileName,
            });
            let editImageProfile = await axios.put(
              'https://aneh-sekalian.herokuapp.com/api/v1/users/photo',
              dataForm,
              {
                headers: {
                  // accept: 'image/png',
                  'Content-Type': 'multipart/form-data',
                  Authorization: this.state.token,
                },
              },
            );
            if (editImageProfile.data.status === true) {
              this.setState({
                modalEditProfil: !this.state.modalEditProfil,
                isLoadingProfile: true,
                isLoadingEdit: false,
              });
              await this._getCurrentUser();
              ToastAndroid.show('Profile edited!', ToastAndroid.SHORT);
            }
          }
        } catch (e) {
          this.setState({
            isLoadingEdit: false,
          });
          ToastAndroid.show(
            'Name or Email is already exist!',
            ToastAndroid.SHORT,
          );
        }
      }
    } else {
      try {
        let editNameEmail = await axios({
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.state.token,
          },
          url: 'https://aneh-sekalian.herokuapp.com/api/v1/users/update',
          data: JSON.stringify({
            name,
            email,
          }),
        });
        if (editNameEmail.data.status === true) {
          if (password !== this.state.password) {
            await axios({
              method: 'put',
              headers: {
                'Content-Type': 'application/json',
                Authorization: this.state.token,
              },
              url: 'https://aneh-sekalian.herokuapp.com/api/v1/users/update',
              data: JSON.stringify({
                password,
              }),
            });
          }
          this.setState({
            modalEditProfil: !this.state.modalEditProfil,
            isLoadingProfile: true,
            isLoadingEdit: false,
          });
          await this._getCurrentUser();
          ToastAndroid.show('Profile edited!', ToastAndroid.SHORT);
        }
      } catch (e) {
        this.setState({
          isLoadingEdit: false,
        });
        ToastAndroid.show(
          'Name or Email is already exist!',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  _setModalLogout = async visible => {
    this.setState({modalLogout: visible});
  };

  _showImage = visible => {
    this.setState({modalImage: visible});
  };

  _logout = async () => {
    await AsyncStorage.clear().then(() => {
      console.log('logout');
      this.props.navigation.navigate('AuthLoading');
    });
  };

  render() {
    const {navigate} = this.props.navigation;
    const {
      name,
      email,
      image,
      password,
      isLoadingProfile,
      isLoadingEdit,
    } = this.state;
    const winDimension = Dimensions.get('window');
    const ratioDimension = winDimension.width / 541;
    return (
      <View style={drawer.container}>
        {/* modal */}
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalEditProfil}
          onRequestClose={this._setModalEdit}>
          <ModalProfile
            actionEditProfile={this._editProfile}
            modalName={name}
            modalEmail={email}
            modalImage={image}
            modalPassword={password}
            modalStatus={this.state.modalEditProfil}
            loadingEdit={this.state.isLoadingEdit}
            actionModalProfile={this._setModalEdit}
          />
        </Modal>
        {/* container profile */}
        <View style={drawer.editButton}>
          <TouchableOpacity
            onPress={() => {
              this._setModalEdit(true);
            }}
            style={drawer.containerItem}>
            <View style={drawer.button}>
              <MaterialCommunityIcons
                name="settings"
                size={22}
                color="#FBFBFC"
              />
            </View>
          </TouchableOpacity>
        </View>
        {isLoadingProfile === true ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              paddingVertical: 14,
            }}>
            <ActivityIndicator
              size={50}
              color="#FBFBFC"
              style={{opacity: 0.7}}></ActivityIndicator>
          </View>
        ) : (
          <View style={drawer.containertopRow}>
            <TouchableOpacity
              onPress={() => {
                this._showImage(true);
              }}>
              <Image
                style={drawer.imageTopRow}
                source={
                  image !== undefined
                    ? {
                        uri: image,
                      }
                    : require('../profile_placeholder.png')
                }
              />
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalImage}
              onRequestClose={this._showImage}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: '#000',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <Image
                  style={{
                    width: winDimension.width,
                    height: 362 * ratioDimension,
                    resizeMode: 'contain',
                  }}
                  source={
                    image !== undefined
                      ? {
                          uri: image,
                        }
                      : require('../profile_placeholder.png')
                  }
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this._showImage(!this.state.modalImage);
                    }}>
                    <MaterialCommunityIcons
                      name="close"
                      size={28}
                      color="#FBFBFC"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '100',
                color: '#FBFBFC',
                marginTop: 10,
              }}>
              {name}{' '}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '100',
                color: '#FBFBFC',
                opacity: 0.5,
                marginTop: 2,
              }}>
              {email}{' '}
            </Text>
          </View>
        )}
        {/* button drawer */}
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={drawer.containerBody}>
            <TouchableOpacity
              onPress={() => navigate('Home')}
              style={drawer.containerItem}>
              <View style={drawer.button}>
                <MaterialCommunityIcons
                  name="clipboard-text"
                  size={22}
                  color="#FBFBFC"
                />
                <Text style={drawer.txtBottom}>My Tasks </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigate('Complete')}
              style={drawer.containerItem}>
              <View style={drawer.button}>
                <MaterialCommunityIcons
                  name="checkbox-multiple-marked-circle"
                  size={22}
                  color="#FBFBFC"
                />
                <Text style={drawer.txtBottom}>Complete Tasks </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigate('Favorite')}
              style={drawer.containerItem}>
              <View style={drawer.button}>
                <MaterialCommunityIcons name="star" size={22} color="#FBFBFC" />
                <Text style={drawer.txtBottom}>Favorite Tasks </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={drawer.containerFooter}>
          <TouchableOpacity
            onPress={() => {
              this._setModalLogout(true);
            }}
            style={drawer.containerItem}>
            <View style={drawer.button}>
              <MaterialCommunityIcons name="logout" size={22} color="#FBFBFC" />
              <Text style={drawer.txtBottom}>Log out </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalLogout}>
          <ModalAlert
            actionModallogout={this._logout}
            actionShowModalLogout={this._setModalLogout}
            modalLogoutStatus={this.state.modalLogout}
          />
        </Modal>
      </View>
    );
  }
}
