import React from 'react';
import {
  Input,
  Select,
  Layout,
  Button,
  Text,
  CheckBox,
} from '@ui-kitten/components';
import {View} from 'react-native';
import styles from '../constants/styles';

interface CheckboxFieldProps {
  value: boolean;
  setValue: any;
  title: string;
}

const CheckboxField = ({value, setValue, title}: CheckboxFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <CheckBox
        text={title}
        checked={value}
        onChange={isChecked => {
          setValue(isChecked);
        }}
      />
    </View>
  );
};

export default CheckboxField;
