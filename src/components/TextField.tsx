import React from 'react';
import {View} from 'react-native';
import {Input, Icon} from '@ui-kitten/components';
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
  secure,
  ...otherProps
}) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(secure);

  const renderIcon = style => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.fieldContainer}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={text => setValue(text)}
        style={{}}
        label={title}
        status={error ? 'danger' : value ? 'success' : 'basic'}
        caption={error}
        ref={getRef}
        onSubmitEditing={() => onSubmitEditing(textFieldIndex)}
        // returnKeyLabel={""}
        returnKeyType={returnKeyLabel == 'Next' ? 'next' : 'default'}
        secureTextEntry={secureTextEntry}
        icon={secure ? renderIcon : null}
        onIconPress={onIconPress}
        {...otherProps}
      />
    </View>
  );
};

export default React.memo(TextField);
