import React from "react";
import { Layout, Radio, RadioGroup, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import styles from "../constants/styles";

interface RadioFieldProps {
  data: any[];
  value: any;
  setValue: any;
  title: string;
  placeholder: string;
  error: any;
  titleStyle: any;
}

const RadioField = ({
  data,
  value,
  setValue,
  title,
  placeholder,
  error,
  titleStyle,
  ...otherProps
}: RadioFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      {title ? (
        <Text category="c2" style={[{ marginBottom: 10 }, titleStyle]}>
          {title}
        </Text>
      ) : null}
      <RadioGroup
        selectedIndex={data.findIndex(val => val.text == value)}
        onChange={index => setValue(data[index].text)}
        {...otherProps}
      >
        {data && data.length > 0
          ? data.map(({ text, ...otherProps }, index) => {
              return <Radio key={index} style={styles.radio} text={text} {...otherProps} />;
            })
          : null}
      </RadioGroup>
    </View>
  );
};

export default React.memo(RadioField);
