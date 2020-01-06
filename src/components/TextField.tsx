import React from "react";
import { View } from "react-native";
import { Input, Icon } from "@ui-kitten/components";
import styles from "../constants/styles";

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
  multiline,
  ref, // DONT USE,
  formatText,
  ...otherProps
}) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(secure);

  const renderIcon = style => <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />;

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.fieldContainer}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={text => {
          let txt = text;
          if (formatText) {
            txt = formatText(text);
          }
          setValue(txt);
        }}
        style={{}}
        label={title}
        status={error ? "danger" : value ? "success" : "basic"}
        caption={error}
        ref={getRef}
        onSubmitEditing={() => {
          if (!multiline) {
            onSubmitEditing(textFieldIndex);
          }
        }}
        // returnKeyLabel={""}
        returnKeyType={!multiline && returnKeyLabel == "Next" ? "next" : "default"}
        secureTextEntry={secureTextEntry}
        icon={secure ? renderIcon : null}
        onIconPress={onIconPress}
        multiline={multiline}
        {...otherProps}
      />
    </View>
  );
};

export default React.memo(TextField);
