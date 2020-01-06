import React, { Component, Fragment, PureComponent } from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { Input, Icon, Text, styled, Button } from "@ui-kitten/components";
import styles from "../constants/styles";
import { FieldComponentProps } from "../constants/interfaces";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Overlay, SearchBar } from "react-native-elements";
import { Header, Left, Body, Right } from "native-base";
import { normalizeStyle, normalizeTextStyle } from "../constants/functions";

interface AutoCompleteAddressFieldProps extends FieldComponentProps {
  apiKey: string;
  style: any;
  themedStyle: any;
}
class AutoCompleteAddressField extends PureComponent<AutoCompleteAddressFieldProps> {
  static styledComponentName = "Input";

  state = {
    modalVisible: false
  };
  // const AutoCompleteAddressField = ({
  //   value,
  //   setValue,
  //   title,
  //   placeholder,
  //   error,
  //   getRef,
  //   onSubmitEditing,
  //   textFieldIndex,
  //   returnKeyLabel,
  //   secure,
  //   ...otherProps
  // }: AutoCompleteAddressFieldProps) => {
  //   const [secureTextEntry, setSecureTextEntry] = React.useState(secure);

  //   const renderIcon = style => (
  //     <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  //   );

  //   const onIconPress = () => {
  //     setSecureTextEntry(!secureTextEntry);
  //   };
  render() {
    const {
      value,
      setValue,
      title,
      placeholder,
      error,
      getRef,
      onSubmitEditing,
      textFieldIndex,
      returnKeyLabel,
      secure,
      onAddressPress,
      setFieldValue,
      ...otherProps
    } = this.props;

    const { style, themedStyle, ...restProps } = this.props;
    const {
      labelMarginBottom,
      labelFontSize,
      labelFontWeight,
      labelLineHeight,
      labelFontFamily,
      labelColor,
      captionMarginTop,
      captionFontSize,
      captionFontWeight,
      captionLineHeight,
      captionFontFamily,
      captionColor,
      captionIconWidth,
      captionIconHeight,
      captionIconMarginRight,
      captionIconTintColor
    } = themedStyle;

    const textStyle = {
      marginBottom: labelMarginBottom,
      fontSize: labelFontSize,
      fontWeight: labelFontWeight,
      lineHeight: labelLineHeight,
      fontFamily: labelFontFamily,
      color: labelColor
    };

    const captionStyle = {
      marginTop: captionMarginTop,
      fontSize: captionFontSize,
      fontWeight: captionFontWeight,
      lineHeight: captionLineHeight,
      fontFamily: captionFontFamily,
      color: captionColor
      //   captionIconWidth,
      //   captionIconHeight,
      //   captionIconMarginRight,
      //   captionIconTintColor,
    };

    return (
      <Fragment>
        <Modal visible={this.state.modalVisible} animationType="slide" onDismiss={() => {}} animated>
          <View style={{ flex: 1, paddingBottom: "3%" }}>
            <Header>
              <Left>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this.setState({ modalVisible: false })}
                >
                  <Icon name="close-outline" width={25} height={25} />
                </TouchableOpacity>
              </Left>
              <Body>
                <Text>Address</Text>
              </Body>
              <Right></Right>
            </Header>
            <GooglePlacesAutocomplete
              placeholder="Enter Location"
              minLength={2}
              autoFocus={true}
              returnKeyType={"default"}
              fetchDetails={true}
              nearbyPlacesAPI="GooglePlacesSearch"
              // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              // currentLocationLabel="Current location"
              query={{
                key: this.props.apiKey,
                language: "en" // language of the results
                // types: "(cities)" // default: 'geocode'
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: "rgba(0,0,0,0)",
                  borderTopWidth: 0,
                  borderBottomWidth: 0
                },
                textInput: {
                  ...normalizeStyle(themedStyle, style),
                  color: "black"
                },
                predefinedPlacesDescription: {
                  color: "#1faadb"
                },
                listView: {
                  marginTop: 10
                }
              }}
              textInputProps={{
                onChangeText: text => {
                  setValue(text);
                }
              }}
              onPress={(data, details = null) => {
                if (onAddressPress) {
                  onAddressPress(data, details, setFieldValue);
                } else {
                  setValue(data.description);
                }
              }}
              getDefaultValue={() => value}
              enablePoweredByContainer={false}
              // {...restProps}
            />
            <View style={{ padding: 15 }}>
              <Button onPress={() => this.setState({ modalVisible: false })}>Done</Button>
            </View>
          </View>
        </Modal>

        <View style={styles.fieldContainer}>
          <Input
            placeholder={placeholder}
            value={value}
            // onChangeText={text => setValue(text)}
            label={title}
            status={error ? "danger" : value ? "success" : "basic"}
            caption={error}
            {...otherProps}
            onFocus={() => this.setState({ modalVisible: true })}
          />
        </View>
      </Fragment>
    );
  }
}

export default styled(AutoCompleteAddressField);
