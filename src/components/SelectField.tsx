import React from "react";
import { Select, Text } from "@ui-kitten/components";
import styles from "../constants/styles";
import { View } from "react-native";

const SelectField = ({ data, value, setValue, title, placeholder, error, multiSelect, ...otherProps }) => {
  function getLabelForValue(value) {
    let label = null;
    data.forEach(element => {
      if (element.value == value) {
        label = element.text;
      }
    });

    if (label) {
      return { text: label };
    }

    return null;
  }

  return (
    <View style={styles.fieldContainer}>
      <Select
        data={data}
        selectedOption={value ? getLabelForValue(value) : null}
        onSelect={val => {
          if (multiSelect) {
            setValue(val);
          } else {
            setValue(val.value ? val.value : val.text);
          }
        }}
        placeholder={placeholder}
        style={{ marginBottom: 0 }}
        label={title}
        status={error ? "danger" : value ? "success" : "basic"}
        // caption={error}
        // ref={getRef}
        // onSubmitEditing={onSubmitEditing}
        multiSelect={multiSelect}
        {...otherProps}
      />
      {error && (
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
      )}
    </View>
  );
};

export default React.memo(SelectField);
