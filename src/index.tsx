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

interface Option {
  text: string;
}

export interface Field {
  type:
    | 'textField'
    | 'selectField'
    | 'checkboxField'
    | 'toggleField'
    | 'radioField'
    | 'datePickerField'
    | 'avatarField'
    | 'tagsInputField'
    | 'pickerField'
    | 'multiSelectPickerField'
    | 'autoCompleteAddressField';
  placeholder?: string;
  title: string;
  initialValue: any;
  options?: Option[];
  secure?: boolean;
}

interface DynamicFormProps {
  form: {[x: string]: Field};
  schema: any;
  showErrorSummary?: boolean;
}

const DynamicForm = ({
  form,
  schema,
  showErrorSummary = true,
}: DynamicFormProps) => {
  const [loading, setLoading] = useState(false);

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
    console.log('SUBMITTING', values);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  function getInitialValues() {
    const initialValues = {};
    Object.keys(form).forEach(key => {
      if (form[key].type == 'selectField') {
        initialValues[key] = {text: form[key].initialValue};
      } else {
        initialValues[key] = form[key].initialValue;
      }
    });
    return initialValues;
  }

  return (
    <SafeAreaView style={{flex: 1}} forceInset={{bottom: 'never'}}>
      <LoadingOverlay visible={loading} />
      <Layout style={{flex: 1, padding: 15}}>
        <Formik
          validationSchema={schema}
          initialValues={getInitialValues()}
          onSubmit={onsubmit}>
          {props => {
            // console.log('VALUES', props.values);
            if (props.errors && Object.keys(props.errors).length) {
              // console.log('ERRORs', props.errors);
            }
            return (
              <View style={{flex: 1}}>
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  // extraHeight={0}
                  // enableAutomaticScroll={false}
                  // enableResetScrollToCoords={false}
                >
                  {renderFields(props)}

                  {renderErrors(props.errors)}
                  <Button
                    style={{marginTop: 5}}
                    disabled={!props.isValid}
                    onPress={() => props.handleSubmit()}>
                    Submit
                  </Button>
                </KeyboardAwareScrollView>
              </View>
            );
          }}
        </Formik>
      </Layout>
    </SafeAreaView>
  );
};

export default DynamicForm;
