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

interface Option {
  text: string;
}

export interface Field {
  type: 'textField' | 'selectField' | 'checkboxField' | 'toggleField';
  placeholder: string;
  title: string;
  initialValue: any;
  options?: Option[];
}

interface DynamicFormProps {
  form: {[x: string]: Field};
  schema: any;
}

const DynamicForm = ({form, schema}: DynamicFormProps) => {
  const [loading, setLoading] = useState(false);

  const refs = [];
  const textFieldKeys = [];

  function renderFields(props: FormikProps<any>) {
    const {values, handleChange, errors, handleSubmit, setFieldValue} = props;

    if (!form) {
      return null;
    }

    let textFieldCount = 0;
    let fields = Object.keys(form);
    return fields.map((key, index) => {
      const field = form[key];
      const name = key;
      const {type, placeholder, title, options} = field;

      const sharedFieldProps = {
        key: index,
        value: values[name],
        error: errors[name],
        setValue: value => setFieldValue(name, value),
        title: title,
        placeholder,
        data: options,
      };

      if (type == 'textField') {
        textFieldKeys.push(index);
        textFieldCount++;
        return (
          <TextField
            textFieldIndex={textFieldCount}
            getRef={ref => (refs[index] = ref)}
            returnKeyLabel={index == fields.length - 1 ? 'Submit' : 'Next'}
            onSubmitEditing={keyIndex => {
              if (index < fields.length - 1) {
                if (refs[textFieldKeys[keyIndex]]) {
                  refs[textFieldKeys[keyIndex]].focus();
                }
              } else {
                handleSubmit();
              }
            }}
            {...sharedFieldProps}
          />
        );
      }

      if (type == 'selectField') {
        return <SelectField {...sharedFieldProps} />;
      }

      if (type == 'checkboxField') {
        return <CheckboxField {...sharedFieldProps} />;
      }

      if (type == 'toggleField') {
        return <ToggleField {...sharedFieldProps} />;
      }
    });
  }

  function onsubmit(values) {
    console.log('SUBMITTING', values);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  const initialValues = {};
  Object.keys(form).forEach(key => {
    if (form[key].type == 'selectField') {
      initialValues[key] = {text: form[key].initialValue};
    } else {
      initialValues[key] = form[key].initialValue;
    }
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <LoadingOverlay visible={loading} />
      <Layout style={{flex: 1, padding: 15}}>
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={onsubmit}>
          {props => {
            // console.log('REFS', refs, props);
            if (props.errors && Object.keys(props.errors).length) {
              console.log('ERRORs', props.errors);
            }
            return (
              <View style={{flex: 1}}>
                <KeyboardAwareScrollView>
                  {renderFields(props)}
                </KeyboardAwareScrollView>
                <Button
                  disabled={!props.isValid}
                  onPress={() => props.handleSubmit()}>
                  Submit
                </Button>
              </View>
            );
          }}
        </Formik>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default DynamicForm;
