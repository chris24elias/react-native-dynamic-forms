import React, { Component, useState } from "react";
import { View, Alert, StyleSheet, Text, TouchableOpacity, Platform, Image } from "react-native";
import ImagePicker from "react-native-image-picker";
import CameraRoll, { saveToCameraRoll } from "@react-native-community/cameraroll";
// import {request, PERMISSIONS} from 'react-native-permissions';
import styles from "../constants/styles";
// import { Avatar, Image } from "react-native-elements";
import { styled } from "@ui-kitten/components";

const defaultOptions = {
  title: "Choose Photo",
  // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: "images",
    cameraRoll: true
  },
  // tintColor: 'white',
  allowsEditing: true
};

interface ChooseAvatarProps {
  value: string;
  setValue: any;
  title: string;
  size: any;
  position: "center";
  captionStyle: any;
  caption: string;
  style: any;
  renderComponent: any;
  containerStyle: any;
  imagePickerOptions: any;
}

const ChooseAvatar = ({
  value,
  setValue,
  title,
  size,
  position,
  style,
  caption,
  captionStyle,
  renderComponent,
  containerStyle,
  imagePickerOptions,
  ...otherProps
}: ChooseAvatarProps) => {
  function onEditPress() {
    ImagePicker.showImagePicker(Object.assign(defaultOptions, imagePickerOptions), response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri, type: response.type, ...response };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // saveToCameraRoll(source.uri, 'photo');

        setValue(source);
      }
    });
  }

  function getPosition() {
    if (position == "center") {
      return styles.center;
    }
  }

  return (
    <View style={[styles.fieldContainer, getPosition()]}>
      <TouchableOpacity
        onPress={onEditPress}
        style={[
          {
            shadowColor: "#9b9b9b",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.7,
            shadowRadius: 2,
            elevation: 1
          },
          containerStyle
        ]}
      >
        {renderComponent ? (
          renderComponent(value)
        ) : (
          <Image
            source={
              value && typeof value == "string"
                ? {
                    uri: value
                  }
                : value
            }
            size={size ? (size.height ? size.height : size) : "medium"}
            style={[size, style]}
            {...otherProps}
            // containerStyle={{marginBottom: 20}}
          />
        )}
      </TouchableOpacity>
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

      {caption ? <Text style={captionStyle}>{caption}</Text> : null}
    </View>
  );
};

export default React.memo(ChooseAvatar);
