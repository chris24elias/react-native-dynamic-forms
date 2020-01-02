import React from "react";
import { Input, Select, Layout, Button, Text, CheckBox } from "@ui-kitten/components";
import { View } from "react-native";
import styles from "../constants/styles";

interface CheckboxFieldProps {
  value: boolean;
  setValue: any;
  title: string;
  error: any;
}

const CheckboxField = ({ value, setValue, title, error, ...otherProps }: CheckboxFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <CheckBox
        text={title}
        checked={value}
        onChange={isChecked => {
          setValue(isChecked);
        }}
        status={error ? "danger" : value ? "success" : "basic"}
        {...otherProps}
      />
      <Text
        appearance="hint"
        category="label"
        status={error ? "danger" : value ? "success" : "basic"}
        style={{
          marginTop: 5,
          fontWeight: "400",
          fontSize: 12,
          lineHeight: 16,
          fontFamily: "System"
        }}
      >
        {error}
      </Text>
    </View>
  );
};

export default React.memo(CheckboxField);
