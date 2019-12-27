import React from 'react';
import {Select} from '@ui-kitten/components';
import styles from '../constants/styles';
import {View} from 'react-native';

const SelectField = ({data, value, setValue, title, placeholder, error}) => {
  return (
    <View style={styles.fieldContainer}>
      <Select
        data={data}
        selectedOption={value}
        onSelect={val => {
          // setValue
          setValue(val.text);
        }}
        placeholder={placeholder}
        style={{marginBottom: 10}}
        label={title}
        status={error ? 'danger' : 'basic'}
        // caption={error}
        // ref={getRef}
        // onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default SelectField;
