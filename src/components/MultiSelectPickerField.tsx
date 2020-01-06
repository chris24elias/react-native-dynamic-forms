import React, { useState, useRef, useEffect, Component, PureComponent } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { Header, Body, Title, Left, Right } from "native-base";
import { FieldComponentProps, Option } from "../constants/interfaces";
import styles from "../constants/styles";
import { styled, Interaction, Text } from "@ui-kitten/components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { normalizeStyle, normalizeTextStyle } from "../constants/functions";

interface MultiSelectPickerFieldProps extends FieldComponentProps {
  data: Option[];
  style: any;
  themedStyle: any;
}
class MultiSelectPickerField extends PureComponent<MultiSelectPickerFieldProps> {
  static styledComponentName = "Input";

  render() {
    const { error, setValue, title, value, placeholder, data } = this.props;
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
      <View style={styles.fieldContainer}>
        <Text style={textStyle}>{title}</Text>
        <SectionedMultiSelect
          // modalWithSafeAreaView
          // ref={multiSelect}
          items={data && Array.isArray(data) ? data : []}
          uniqueKey="value"
          // subKey="children"d
          selectText={title}
          // showDropDowns={true}
          // readOnlyHeadings={true}
          onSelectedItemsChange={selectedItems => setValue(selectedItems)}
          selectedItems={value && Array.isArray(value) ? value : []}
          alwaysShowSelectText
          searchPlaceholderText={placeholder}
          modalAnimationType={"slide"}
          renderSelectText={() => {
            return (
              <View style={{ flex: 1, marginBottom: 5 }}>
                <Text style={normalizeTextStyle(themedStyle, style)}>{placeholder}</Text>
              </View>
            );
          }}
          headerComponent={() => (
            <Header>
              <Left />
              <Body style={{ flex: 3 }}>
                <Title>{title}</Title>
              </Body>
              <Right></Right>
            </Header>
          )}
          styles={{
            modalWrapper: {
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH,
              backgroundColor: "white"
            },
            listContainer: {
              flex: 1,
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH
            },
            container: {
              flex: 1,
              // height: deviceHeight,
              // width: deviceWidth
              marginHorizontal: 0,
              marginVertical: 0,
              paddingBottom: "5%"
            },
            button: {
              width: "90%",
              borderRadius: 10,
              alignSelf: "center",
              marginTop: 25
            },
            selectToggle: {
              marginBottom: 5,
              ...normalizeStyle(themedStyle, style)
            },
            selectToggleText: normalizeTextStyle(themedStyle, style),
            searchTextInput: {
              color: "black"
            }
          }}
          colors={
            {
              // searchSelectionColor: "black"
            }
          }
          {...restProps}
        />
        {error && <Text style={captionStyle}>{error}</Text>}
      </View>
    );
  }
}

export default styled(MultiSelectPickerField);
