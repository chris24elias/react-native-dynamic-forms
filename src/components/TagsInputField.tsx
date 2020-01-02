import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Input, Text } from "@ui-kitten/components";
import styles from "../constants/styles";
import { FieldComponentProps } from "../constants/interfaces";
import { Icon } from "native-base";

interface TagsInputFieldProps extends FieldComponentProps {
  value: string[];
  tagTextStyle: any;
  tagContainerStyle: any;
  tagIconStyle: any;
  renderCloseIcon: any;
}

const TagsInputField = ({
  setValue,
  error,
  title,
  value,
  placeholder,
  tagContainerStyle,
  tagIconStyle,
  tagTextStyle,
  renderCloseIcon
}: TagsInputFieldProps) => {
  const [inputText, setInputText] = useState("");

  function removeTag(index) {
    let tagsCopy = value.slice(0);
    // let index = tagsCopy.indexOf(tag);
    tagsCopy.splice(index, 1);
    setValue(tagsCopy, false);
  }

  function addTag(text) {
    let newArr = [
      ...value,
      text
        .replace(",", "")
        .replace("#", "")
        .trim()
    ];
    setInputText("");
    setValue(newArr, false);
  }

  function renderTags() {
    if (!value || !Array.isArray(value)) {
      return null;
    }

    return value.map((tag, index) => {
      if (tag) {
        return (
          <View key={index} style={[styles.tagContainer, tagContainerStyle]}>
            <View style={styles.tag}>
              <Text style={[styles.tagText, tagTextStyle]}>{tag}</Text>
            </View>

            <TouchableOpacity onPress={() => removeTag(index)} style={[styles.tagCloseIcon]}>
              {renderCloseIcon ? (
                renderCloseIcon()
              ) : (
                <Icon name={"ios-close-circle"} type="Ionicons" style={[{ fontSize: 18 }, tagIconStyle]} />
              )}
            </TouchableOpacity>
          </View>
        );
      }
    });
  }

  return (
    <View style={styles.fieldContainer}>
      <Input
        label={title}
        placeholder={placeholder}
        value={inputText}
        onChangeText={text => {
          // this.props.changePracticeFieldAction({ tags: text })
          if (text.charAt(text.length - 1) == "," || text.charAt(text.length - 1) == " ") {
            addTag(text);
          } else {
            setInputText(text);
          }
        }}
        onSubmitEditing={() => {
          let text = inputText;
          if (text) {
            addTag(text);
          }
        }}
        autoCorrect={false}
      />
      <View style={styles.tagsContainer}>{renderTags()}</View>
    </View>
  );
};

export default TagsInputField;
