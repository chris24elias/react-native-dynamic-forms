import React from "react";
import { View } from "react-native";
import styles from "../constants/styles";
import { Text } from "@ui-kitten/components";

interface FieldSectionProps {
  children?: any;
  title: string;
  contentContainerStyle: any;
  containerStyle: any;
  titleTextStyle: any;
}

const FieldSection = (props: FieldSectionProps) => {
  return (
    <View style={[styles.sectionContainer, props.containerStyle]}>
      {props.title ? (
        <Text
          category="h6"
          style={[
            { fontWeight: "800", color: "#8F9BB3", fontFamily: "System", marginBottom: 15 },
            props.titleTextStyle
          ]}
        >
          {props.title}
        </Text>
      ) : null}
      <View style={[{ paddingHorizontal: 15 }, props.contentContainerStyle]}>{props.children}</View>
    </View>
  );
};

export default FieldSection;
