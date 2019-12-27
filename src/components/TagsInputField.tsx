import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Input, Icon, Text} from '@ui-kitten/components';
import styles from '../constants/styles';
import {FieldComponentProps} from '../constants/interfaces';

interface TagsInputFieldProps extends FieldComponentProps {
  value: string[];
}

const TagsInputField = ({
  setValue,
  error,
  title,
  value,
  placeholder,
}: TagsInputFieldProps) => {
  const [inputText, setInputText] = useState('');

  function removeTag(index) {
    let tagsCopy = value.slice(0);
    // let index = tagsCopy.indexOf(tag);
    tagsCopy.splice(index, 1);
    console.log('REMOVED TAG index', index, tagsCopy);
    setValue(tagsCopy, false);
  }

  function addTag(text) {
    let newArr = [
      ...value,
      text
        .replace(',', '')
        .replace('#', '')
        .trim(),
    ];
    setInputText('');
    setValue(newArr, false);
  }

  function renderTags() {
    if (!value) {
      return null;
    }

    return value.map((tag, index) => {
      return (
        <View key={index} style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>

          <TouchableOpacity
            onPress={() => removeTag(index)}
            style={styles.tagCloseIcon}>
            <Icon name={'close-circle-outline'} width={17} height={17} />
          </TouchableOpacity>
        </View>
      );
    });
  }

  return (
    <View style={styles.fieldContainer}>
      <Input
        label={title}
        placeholder={
          inputText || (value && value.length > 0) ? '' : placeholder
        }
        value={inputText}
        onChangeText={text => {
          // this.props.changePracticeFieldAction({ tags: text })
          if (
            text.charAt(text.length - 1) == ',' ||
            text.charAt(text.length - 1) == ' '
          ) {
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
