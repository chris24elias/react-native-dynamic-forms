import React from 'react';
import {View} from 'react-native';
import {Input} from '@ui-kitten/components';
import styles from '../constants/styles';

const TextField = ({
  value,
  setValue,
  title,
  placeholder,
  error,
  getRef,
  onSubmitEditing,
  textFieldIndex,
  returnKeyLabel,
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={text => setValue(text)}
        style={{}}
        label={title}
        status={error ? 'danger' : 'basic'}
        caption={error}
        ref={getRef}
        onSubmitEditing={() => onSubmitEditing(textFieldIndex)}
        // returnKeyLabel={""}
        returnKeyType={returnKeyLabel == 'Next' ? 'next' : 'default'}
      />
    </View>
  );
};

export default TextField;
