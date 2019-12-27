import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {Header, Body, Title, Left, Right} from 'native-base';
import {FieldComponentProps} from '../constants/interfaces';
import styles from '../constants/styles';

interface MultiSelectPickerFieldProps extends FieldComponentProps {}

const MultiSelectPickerField = ({
  error,
  setValue,
  title,
  value,
  placeholder,
}: MultiSelectPickerFieldProps) => {
  //   const [selectedItems, setSelectedItems] = useState([]);
  const multiSelect = useRef(null);
  //   const [languages, setLanguages] = useState(null);

  function onSelectedItemsChange(selectedItems) {
    setValue(selectedItems);
  }

  function onCancelPress() {
    multiSelect.current._toggleSelector();

    // set back to whatever was original
    // setSelectedItems(selectedItems);
    // handleChange("language_list")(selectedItems);
  }

  return (
    <View style={styles.fieldContainer}>
      <SectionedMultiSelect
        // modalWithSafeAreaView
        ref={multiSelect}
        items={languages}
        uniqueKey="name"
        // subKey="children"
        selectText={title}
        // showDropDowns={true}
        // readOnlyHeadings={true}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        alwaysShowSelectText
        searchPlaceholderText={translate('profile_field.search_text')}
        renderSelectText={() => {
          return (
            <View style={{flex: 1, marginBottom: 5}}>
              <Text style={{color: 'rgba(0,122,255,1)', fontSize: 17}}>
                {translate('profile_field.specialties')}
              </Text>
            </View>
          );
        }}
        headerComponent={() => (
          <Header>
            <Left>
              {/* <TouchableOpacity
                  onPress={() => onCancelPress()}
                >
                  <Text style={{ color: "rgba(0,122,255,1)", fontSize: 17 }}>
                    Cancel
                  </Text>
                </TouchableOpacity> */}
            </Left>
            <Body style={{flex: 3}}>
              <Title>{translate('profile_field.select_specialty')}</Title>
            </Body>
            <Right></Right>
          </Header>
        )}
        styles={{
          modalWrapper: {
            height: deviceHeight,
            width: deviceWidth,
            backgroundColor: 'white',
          },
          listContainer: {
            flex: 1,
            height: deviceHeight,
            width: deviceWidth,
          },
          container: {
            flex: 1,
            // height: deviceHeight,
            // width: deviceWidth
            marginHorizontal: 0,
            marginVertical: 0,
            paddingBottom: '5%',
          },
          button: {
            width: '90%',
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 25,
          },
          selectToggle: {
            marginBottom: 5,
          },
          selectToggleText: {
            color: 'rgba(0,122,255,1)',
          },
        }}
        modalAnimationType={'slide'}
      />
    </View>
    //   {errorMsg ? (
    //     <Text
    //       style={{
    //         fontSize: fontSize.msg,
    //         marginTop: 4,
    //         color: errorMsg ? color.red : color.black,
    //       }}>
    //       {errorMsg}
    //     </Text>
    //   ) : null}
    // </View>
  );
};

export default MultiSelectPickerField;
