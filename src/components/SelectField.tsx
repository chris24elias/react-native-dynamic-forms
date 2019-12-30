import React from 'react';
import {Select} from '@ui-kitten/components';
import styles from '../constants/styles';
import {View} from 'react-native';

const SelectField = ({
  data,
  value,
  setValue,
  title,
  placeholder,
  error,
  multiSelect,
  ...otherProps
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Select
        data={data}
        selectedOption={value}
        onSelect={val => {
          if (multiSelect) {
            setValue(val);
          } else {
            setValue(val.text);
          }
        }}
        placeholder={placeholder}
        style={{marginBottom: 10}}
        label={title}
        status={error ? 'danger' : value ? 'success' : 'basic'}
        // caption={error}
        // ref={getRef}
        // onSubmitEditing={onSubmitEditing}
        multiSelect={multiSelect}
        {...otherProps}
      />
    </View>
  );
};

export default React.memo(SelectField);
