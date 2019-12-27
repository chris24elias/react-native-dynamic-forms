import React, {Component, useEffect} from 'react';
import {Picker} from 'native-base';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Icon} from 'native-base';
import styles from '../constants/styles';
import {FieldComponentProps} from '../constants/interfaces';
import {styled, Interaction, Text} from '@ui-kitten/components';

interface PickerFieldProps extends FieldComponentProps {
  data: Option[];
  style: any;
  themedStyle: any;
}

interface Option {
  label: string;
  value: any;
}

class PickerField extends Component<PickerFieldProps> {
  static styledComponentName = 'Input';

  normalizeStyle(
    {
      paddingHorizontal,
      borderColor,
      backgroundColor,
      minHeight,
      borderRadius,
      borderWidth,
      paddingVertical,
    },
    style2,
  ) {
    return {
      paddingHorizontal,
      borderColor,
      backgroundColor,
      minHeight,
      borderRadius,
      borderWidth,
      paddingVertical,
      ...style2,
    };
  }

  normalizeTextStyle(style, style2) {
    return {
      color: style.textColor,
      marginHorizontal: style.textMarginHorizontal,
      fontFamily: style.textFontFamily,
      fontSize: style.textFontSize,
      fontWeight: style.textFontWeight,
      lineHeight: style.textLineHeight,
      ...style2,
    };
  }

  render() {
    console.log('PROPS', this.props);
    const {placeholder, error, value, setValue, title, data} = this.props;
    const {style, themedStyle, ...restProps} = this.props;
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
      captionIconTintColor,
    } = themedStyle;

    const textStyle = {
      marginBottom: labelMarginBottom,
      fontSize: labelFontSize,
      fontWeight: labelFontWeight,
      lineHeight: labelLineHeight,
      fontFamily: labelFontFamily,
      color: labelColor,
    };

    const captionStyle = {
      marginTop: captionMarginTop,
      fontSize: captionFontSize,
      fontWeight: captionFontWeight,
      lineHeight: captionLineHeight,
      fontFamily: captionFontFamily,
      color: captionColor,
      //   captionIconWidth,
      //   captionIconHeight,
      //   captionIconMarginRight,
      //   captionIconTintColor,
    };
    return (
      <View style={styles.fieldContainer}>
        <Text style={textStyle}>{title}</Text>
        <Picker
          {...restProps}
          placeholder={placeholder}
          iosIcon={<Icon name="md-arrow-dropdown" />}
          mode="dropdown"
          textStyle={this.normalizeTextStyle(themedStyle, style)}
          selectedValue={value}
          onValueChange={val => setValue(val)}
          // style={styles.pickerStyles}
          style={this.normalizeStyle(themedStyle, style)}>
          {data.map((s, i) => (
            <Picker.Item label={s.label} key={i} value={s.value} />
          ))}
        </Picker>
        {error && <Text style={captionStyle}>{error}</Text>}
      </View>
    );
  }
}

export default styled(PickerField);

const ValidKeys = {
  display: 1,
  width: 1,
  height: 1,
  start: 1,
  end: 1,
  top: 1,
  left: 1,
  right: 1,
  bottom: 1,
  minWidth: 1,
  maxWidth: 1,
  minHeight: 1,
  maxHeight: 1,
  margin: 1,
  marginVertical: 1,
  marginHorizontal: 1,
  marginTop: 1,
  marginBottom: 1,
  marginLeft: 1,
  marginRight: 1,
  marginStart: 1,
  marginEnd: 1,
  padding: 1,
  paddingVertical: 1,
  paddingHorizontal: 1,
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 1,
  paddingRight: 1,
  paddingStart: 1,
  paddingEnd: 1,
  borderWidth: 1,
  borderTopWidth: 1,
  borderStartWidth: 1,
  borderEndWidth: 1,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  position: 1,
  flexDirection: 1,
  flexWrap: 1,
  justifyContent: 1,
  alignItems: 1,
  alignSelf: 1,
  alignContent: 1,
  overflow: 1,
  flex: 1,
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 1,
  aspectRatio: 1,
  zIndex: 1,
  direction: 1,
  shadowColor: 1,
  shadowOffset: 1,
  shadowOpacity: 1,
  shadowRadius: 1,
  transform: 1,
  transformMatrix: 1,
  decomposedMatrix: 1,
  scaleX: 1,
  scaleY: 1,
  rotation: 1,
  translateX: 1,
  translateY: 1,
  backfaceVisibility: 1,
  backgroundColor: 1,
  borderColor: 1,
  borderTopColor: 1,
  borderRightColor: 1,
  borderBottomColor: 1,
  borderLeftColor: 1,
  borderStartColor: 1,
  borderEndColor: 1,
  borderRadius: 1,
  borderTopLeftRadius: 1,
  borderTopRightRadius: 1,
  borderTopStartRadius: 1,
  borderTopEndRadius: 1,
  borderBottomLeftRadius: 1,
  borderBottomRightRadius: 1,
  borderBottomStartRadius: 1,
  borderBottomEndRadius: 1,
  borderStyle: 1,
  opacity: 1,
  elevation: 1,
};
