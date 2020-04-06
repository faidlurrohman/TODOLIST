import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import {modalProfile} from '../css/Styles';

export default class ModalProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyPass: 'inidummylhosayang',
      newName: '',
      newEmail: '',
      newPass: '',
      newImg: '',
    };
  }

  _onSelectedImage = () => {
    var options = {
      title: 'Select Avatar Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('Cancelled');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else {
        this.setState({
          newImg: response,
        });
      }
    });
  };

  _onFocusNewPassword = () => {
    this.setState({dummyPass: ''});
  };

  _onBlurNewPassword = () => {
    if (this.state.newPass === '') {
      this.setState({dummyPass: 'inidummylhosayang'});
    }
  };

  render() {
    const {dummyPass, newName, newEmail, newPass, newImg} = this.state;
    const {loadingEdit} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: '#375CBA'}}>
        {loadingEdit === true ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              size={50}
              color="#FBFBFC"
              style={{opacity: 0.7}}></ActivityIndicator>
          </View>
        ) : (
          <View>
            <View style={{flex: 0}}>
              <Text style={modalProfile.titleProfile}>Your Profile</Text>
              <View
                style={{
                  position: 'absolute',
                  top: 15,
                  right: 15,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.actionModalProfile(!this.props.modalStatus);
                  }}>
                  <MaterialCommunityIcons
                    name="close"
                    size={28}
                    color="#FBFBFC"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 150,
                    }}
                    source={
                      newImg !== ''
                        ? {
                            uri: 'data:image/jpeg;base64,' + newImg.data,
                          }
                        : this.props.modalImage !== undefined
                        ? {
                            uri: this.props.modalImage,
                          }
                        : require('../profile_placeholder.png')
                    }
                  />
                  <View style={modalProfile.imageUpload}>
                    <TouchableOpacity onPress={this._onSelectedImage}>
                      <MaterialCommunityIcons
                        name="image-plus"
                        size={30}
                        color="#375CBA"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flex: 1, paddingHorizontal: 25}}>
                  <Text style={modalProfile.textName}>Fullname :</Text>
                  <TextInput
                    style={modalProfile.inputModalProfile}
                    autoCapitalize="words"
                    selectionColor="#FBFBFC"
                    defaultValue={this.props.modalName}
                    onChangeText={value => this.setState({newName: value})}
                  />
                  <Text style={modalProfile.txtEmailAndPass}>Email :</Text>
                  <TextInput
                    style={modalProfile.inputModalProfile}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor="#FBFBFC"
                    defaultValue={this.props.modalEmail}
                    onChangeText={value => this.setState({newEmail: value})}
                  />
                  <Text style={modalProfile.txtEmailAndPass}>Password :</Text>
                  <TextInput
                    style={modalProfile.inputModalProfile}
                    secureTextEntry
                    onFocus={this._onFocusNewPassword}
                    onBlur={this._onBlurNewPassword}
                    autoCapitalize="none"
                    selectionColor="#FBFBFC"
                    defaultValue={dummyPass}
                    onChangeText={value => this.setState({newPass: value})}
                  />
                </View>
                <View style={{flex: 0}}>
                  <TouchableOpacity
                    style={modalProfile.btnSave}
                    onPress={() =>
                      this.props.actionEditProfile(
                        newName === '' ? this.props.modalName : newName,
                        newEmail === '' ? this.props.modalEmail : newEmail,
                        newPass === '' ? this.props.modalPassword : newPass,
                        newImg === '' ? this.props.modalImage : newImg,
                        !this.props.loadingEdit,
                      )
                    }>
                    <Text style={modalProfile.txtBtnSave}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}
