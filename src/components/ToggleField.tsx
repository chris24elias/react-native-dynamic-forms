import React from 'react';
import {Toggle} from '@ui-kitten/components';
import {View} from 'react-native';
import styles from '../constants/styles';

interface ToggleFieldProps {
  value: boolean;
  setValue: any;
  title: string;
}

const ToggleField = ({
  value,
  setValue,
  title,
  ...otherProps
}: ToggleFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <Toggle
        text={title}
        checked={value}
        onChange={setValue}
        {...otherProps}
      />
    </View>
  );
};

export default React.memo(ToggleField);
