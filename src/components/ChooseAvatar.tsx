import React, {Component, useState} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import CameraRoll, {saveToCameraRoll} from '@react-native-community/cameraroll';
// import {request, PERMISSIONS} from 'react-native-permissions';
import styles from '../constants/styles';
import {Avatar, Image} from 'react-native-elements';

const options = {
  title: 'Select Avatar',
  // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

interface ChooseAvatarProps {
  value: string;
  setValue: any;
  title: string;
  size: any;
  position: 'center';
}

const ChooseAvatar = ({
  value,
  setValue,
  title,
  size,
  position,
  ...otherProps
}: ChooseAvatarProps) => {
  function onEditPress() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // saveToCameraRoll(source.uri, 'photo');

        setValue(source.uri);
      }
    });
  }

  function getPosition() {
    if (position == 'center') {
      return styles.center;
    }
  }

  return (
    <View style={[styles.fieldContainer, getPosition()]}>
      {/* <Image
        source={{
          uri: value,
        }}
        // showEditButton
        // onEditPress={}
        // size={size}
        style={size}
        {...otherProps}
      /> */}
      <Avatar
        title={title}
        source={{
          uri: value,
        }}
        // showEditButton
        // onEditPress={onEditPress}
        onPress={onEditPress}
        size={size.height}
        {...otherProps}
      />
    </View>
  );
};

export default ChooseAvatar;
