import React, {Component, useEffect} from 'react';
import {Picker} from 'native-base';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Icon} from 'native-base';
import styles from '../constants/styles';
import {FieldComponentProps, Option} from '../constants/interfaces';
import {styled, Interaction, Text} from '@ui-kitten/components';
import {normalizeStyle, normalizeTextStyle} from '../constants/functions';

interface PickerFieldProps extends FieldComponentProps {
  data: Option[];
  style: any;
  themedStyle: any;
}

class PickerField extends Component<PickerFieldProps> {
  static styledComponentName = 'Input';

  render() {
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
          textStyle={normalizeTextStyle(themedStyle, style)}
          selectedValue={value}
          onValueChange={val => setValue(val)}
          // style={styles.pickerStyles}
          style={normalizeStyle(themedStyle, style)}>
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
