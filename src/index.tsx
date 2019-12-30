import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Input,
  Select,
  Layout,
  Button,
  Text,
  CheckBox,
} from '@ui-kitten/components';
// import { SafeAreaView } from "react-navigation";
import * as yup from 'yup';
import {Formik, FormikProps} from 'formik';
import {Header} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoadingOverlay from './components/LoadingOverlay';
import SafeAreaView from 'react-native-safe-area-view';
import CheckboxField from './components/CheckboxField';
import TextField from './components/TextField';
import SelectField from './components/SelectField';
import ToggleField from './components/ToggleField';
import RadioField from './components/RadioField';
import DatePickerField from './components/DatePickerField';
import ChooseAvatar from './components/ChooseAvatar';
import TagsInputField from './components/TagsInputField';
import PickerField from './components/PickerField';
import MultiSelectPickerField from './components/MultiSelectPickerField';
import AutoCompleteAddressField from './components/AutoCompleteAddressField';
import styles from './constants/styles';
import {Field} from './constants/interfaces';
import ButtonGroupField from './components/ButtonGroupField';

interface DynamicFormProps {
  form: {[x: string]: Field};
  schema: any;
  onSubmit: any;
  showErrorSummary?: boolean;
  submitButtonStyle?: any;
  submitButtonTextStyle?: any;
  containerStyle?: any;
  contentContainerStyle?: any;
  scrollViewProps?: any;
  formikProps?: any;
  showsVerticalScrollIndicator?: boolean;
  submitButtonText?: string;
}

const DynamicForm = ({
  form,
  schema,
  onSubmit,
  showErrorSummary = false,
  submitButtonStyle = {},
  submitButtonTextStyle = {},
  containerStyle = {},
  contentContainerStyle = {},
  scrollViewProps = {},
  formikProps,
  showsVerticalScrollIndicator = false,
  submitButtonText = 'Submit',
}: DynamicFormProps) => {
  const refs = [];
  let textFieldKeys = [];

  function renderFields(props: FormikProps<any>) {
    const {values, handleChange, errors, handleSubmit, setFieldValue} = props;

    if (!form) {
      return null;
    }

    let textFieldCount = 0;
    textFieldKeys = [];
    let fields = Object.keys(form);
    return fields.map((key, index) => {
      const field = form[key];
      const name = key;
      const {
        type,
        placeholder,
        title,
        options,
        initialValue,
        ...otherProps
      } = field;

      const sharedFieldProps = {
        ...otherProps,
        key: index,
        value: values[name],
        error: errors[name],
        setValue: (value, shouldValidate) => {
          setFieldValue(name, value, shouldValidate);
        },
        title: title,
        placeholder,
        data: options,
      };

      if (type == 'textField') {
        let extraProps = {};
        if (!sharedFieldProps.disabled) {
          textFieldKeys.push(index);
          textFieldCount++;
          extraProps = {
            textFieldIndex: textFieldCount,
            getRef: ref => (refs[index] = ref),
            returnKeyLabel: index == fields.length - 1 ? 'Submit' : 'Next',
            onSubmitEditing: keyIndex => {
              if (index < fields.length - 1) {
                if (refs[textFieldKeys[keyIndex]]) {
                  refs[textFieldKeys[keyIndex]].focus();
                }
              } else {
                handleSubmit();
              }
            },
          };
        }

        return <TextField {...extraProps} {...sharedFieldProps} />;
      }

      // @TODO FIX MULTISELECT
      if (type == 'selectField') {
        return <SelectField {...sharedFieldProps} />;
      }

      if (type == 'radioField') {
        return <RadioField {...sharedFieldProps} />;
      }

      if (type == 'checkboxField') {
        return <CheckboxField {...sharedFieldProps} />;
      }

      if (type == 'toggleField') {
        return <ToggleField {...sharedFieldProps} />;
      }

      if (type == 'datePickerField') {
        return <DatePickerField {...sharedFieldProps} />;
      }

      if (type == 'avatarField') {
        return <ChooseAvatar {...sharedFieldProps} />;
      }

      if (type == 'tagsInputField') {
        return <TagsInputField {...sharedFieldProps} />;
      }

      if (type == 'pickerField') {
        return (
          <PickerField
            {...sharedFieldProps}
            status={
              sharedFieldProps.error
                ? 'danger'
                : sharedFieldProps.value && sharedFieldProps.value
                ? 'success'
                : 'basic'
            }
          />
        );
      }

      if (type == 'multiSelectPickerField') {
        return (
          <MultiSelectPickerField
            {...sharedFieldProps}
            status={
              sharedFieldProps.error
                ? 'danger'
                : sharedFieldProps.value && sharedFieldProps.value.length
                ? 'success'
                : 'basic'
            }
          />
        );
      }

      if (type == 'autoCompleteAddressField') {
        return <AutoCompleteAddressField {...sharedFieldProps} />;
      }

      if (type == 'buttonGroupField') {
        return <ButtonGroupField {...sharedFieldProps} />;
      }
    });
  }

  function renderErrors(errors) {
    if (!showErrorSummary) {
      return null;
    }
    if (errors && Object.keys(errors).length) {
      let x = Object.keys(errors).map((key, index) => {
        const error = errors[key];
        return (
          <Text
            key={index}
            style={{marginBottom: 5}}
            category="c2"
            status={'warning'}>
            • {error}
          </Text>
        );
      });

      return (
        <View
          style={{
            backgroundColor: '#ffeaa780',
            padding: 10,
            borderRadius: 8,
            ...styles.fieldContainer,
          }}>
          <Text style={{marginBottom: 7}} category="s1" status={'warning'}>
            Please address the following
          </Text>
          <View style={{paddingLeft: 5}}>{x}</View>
        </View>
      );
    }
    return null;
  }

  function onsubmit(values) {
    if (onSubmit) {
      onSubmit(values);
    }
  }

  function getInitialValues() {
    const initialValues = {};
    Object.keys(form).forEach(key => {
      if (form[key].type == 'selectField') {
        if (form[key].initialValue) {
          initialValues[key] = {text: form[key].initialValue};
        } else {
          initialValues[key] = form[key].initialValue;
        }
      } else {
        initialValues[key] = form[key].initialValue;
      }
    });
    return initialValues;
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={getInitialValues()}
      onSubmit={onsubmit}
      {...formikProps}>
      {props => {
        return (
          <Layout style={[{flex: 1, padding: 15}, containerStyle]}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              contentContainerStyle={contentContainerStyle}
              {...scrollViewProps}>
              {renderFields(props)}
              {renderErrors(props.errors)}
              <Button
                style={[{marginTop: 5}, submitButtonStyle]}
                textStyle={submitButtonTextStyle}
                disabled={!props.isValid}
                onPress={() => props.handleSubmit()}>
                {submitButtonText}
              </Button>
            </KeyboardAwareScrollView>
          </Layout>
        );
      }}
    </Formik>
  );
};

export default React.memo(DynamicForm);
