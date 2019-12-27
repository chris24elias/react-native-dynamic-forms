import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Input, Icon, Text} from '@ui-kitten/components';
import styles from '../constants/styles';
import {FieldComponentProps} from '../constants/interfaces';
// import { Item, Input, Label, Button, Icon } from "native-base";

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
  // const [hashtags, setHashTags] = useState([]);
  const [inputText, setInputText] = useState('');

  // useEffect(() => {
  //   // parse the tags and create hashtags
  //   let newTags = [];
  //   if (tags) {
  //     let fields = tags.split(' ');
  //     fields.forEach(t => {
  //       newTags.push(t);
  //     });
  //   }

  //   setHashTags(newTags);
  // }, [tags]);

  function removeTag(index) {
    let tagsCopy = value.slice(0);
    // let index = tagsCopy.indexOf(tag);
    tagsCopy.splice(index, 1);
    console.log('REMOVED TAG index', index, tagsCopy);
    setValue(tagsCopy);
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
    setValue(newArr);
  }

  function renderTags() {
    if (!value) {
      return null;
    }

    return value.map((tag, index) => {
      return (
        <View
          key={index}
          style={{
            height: 50,
            marginRight: 10,
            flexDirection: 'row',
            // borderWidth: 1,
            // borderColor: color.deepLavender,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#EFDEF9',
              padding: 7,
              borderRadius: 4,
            }}>
            <Text
              style={{
                fontSize: 17,
                lineHeight: 18,
                top: 1.5,
                // color: color.deepLavender,
                marginRight: 2,
              }}>
              {tag}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => removeTag(index)}
            style={{
              top: '0%',
              right: '-10%',
              position: 'absolute',
            }}>
            {/* <Image source={require("../../assets/purple-close.png")} style={{ height: 17, width: 17 }} />
             */}
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
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 0,
          alignItems: 'center',
        }}>
        {renderTags()}
      </View>
    </View>
  );
};

export default TagsInputField;
