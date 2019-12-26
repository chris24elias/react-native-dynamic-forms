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
import {Formik} from 'formik';
import {Header} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoadingOverlay from './LoadingOverlay';
import SafeAreaView from 'react-native-safe-area-view';
import CheckboxField from './components/CheckboxField';

interface DynamicFormProps {
  form: any;
}

const MOCK_FORM = {
  title: 'User',
  initialValues: {
    first_name: '',
    last_name: '',
    third_field: false,
    fourth_field: '',
    fifth_field: '',
    six_field: '',
  },
  schema: yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    third_field: yup.boolean().required(),
    fourth_field: yup.string().required(),
    fifth_field: yup.string().required(),
    six_field: yup.string().required(),
  }),
  fields: [
    {
      name: 'first_name',
      type: 'textField',
      placeholder: 'first name',
      title: 'First Name',
    },
    {
      name: 'last_name',
      type: 'selectField',
      placeholder: 'last name',
      title: 'Last Name',
      options: [{text: 'Option 1'}, {text: 'Option 2'}, {text: 'Option 3'}],
    },
    {
      name: 'third_field',
      type: 'checkboxField',
      placeholder: 'last name',
      title: 'Last Name',
    },
    {
      name: 'fourth_field',
      type: 'textField',
      placeholder: 'last name',
      title: 'Last Name',
    },
    {
      name: 'last_name',
      type: 'selectField',
      placeholder: 'last name',
      title: 'Last Name',
      options: [{text: 'Option 1'}, {text: 'Option 2'}, {text: 'Option 3'}],
    },
    {
      name: 'fifth_field',
      type: 'textField',
      placeholder: 'last name',
      title: 'Last Name',
    },
    {
      name: 'six_field',
      type: 'textField',
      placeholder: 'last name',
      title: 'Last Name',
    },
  ],
};

const DynamicForm = ({}: DynamicFormProps) => {
  const {schema, initialValues, fields} = MOCK_FORM;
  const [loading, setLoading] = useState(false);

  const refs = [];
  const textFieldKeys = [];

  // fields.forEach(() => {
  //   refs.push(useRef(null));
  // });

  function renderFields(values, handleChange, errors, onSubmit) {
    if (fields && fields.length > 0) {
      let textFieldCount = 0;

      return fields.map((field, index) => {
        const {type, placeholder, title, name, options} = field;

        if (type == 'textField') {
          textFieldKeys.push(index);
          textFieldCount++;
          return (
            <TextField
              key={index}
              textFieldIndex={textFieldCount}
              label={title}
              value={values[name]}
              setValue={handleChange(name)}
              placeholder={placeholder}
              error={errors[name]}
              getRef={ref => (refs[index] = ref)}
              returnKeyLabel={index == fields.length - 1 ? 'Submit' : 'Next'}
              onSubmitEditing={key => {
                if (index < fields.length - 1) {
                  refs[textFieldKeys[key]].focus();
                } else {
                  onSubmit();
                }
              }}
            />
          );
        }

        if (type == 'selectField') {
          return (
            <SelectField
              key={index}
              label={title}
              value={values[name]}
              setValue={handleChange(name)}
              placeholder={placeholder}
              error={errors[name]}
              // getRef={ref => (refs[index] = ref)}
              data={options}
            />
          );
        }

        if (type == 'checkboxField') {
          return (
            <CheckboxField
              key={index}
              checked={values[name]}
              onCheckedChange={handleChange(name)}
            />
          );
        }
      });
    }
  }

  function handleSubmit(values) {
    console.log('SUBMITTING', values);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Header /> */}
      <LoadingOverlay visible={loading} />
      <Layout style={{flex: 1, padding: 15}}>
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={handleSubmit}>
          {props => {
            console.log('REFS', refs);
            return (
              <View style={{flex: 1}}>
                <KeyboardAwareScrollView>
                  {renderFields(
                    props.values,
                    props.handleChange,
                    props.errors,
                    props.handleSubmit,
                  )}
                </KeyboardAwareScrollView>
                <Button disabled={!props.isValid}>Submit</Button>
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

const TextField = ({
  value,
  setValue,
  label,
  placeholder,
  error,
  getRef,
  onSubmitEditing,
  textFieldIndex,
  returnKeyLabel,
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={text => setValue(text)}
      style={{marginBottom: 10}}
      label={label}
      status={error ? 'danger' : 'basic'}
      caption={error}
      ref={getRef}
      onSubmitEditing={() => onSubmitEditing(textFieldIndex)}
      // returnKeyLabel={""}
      returnKeyType={returnKeyLabel == 'Next' ? 'next' : 'default'}
    />
  );
};

const SelectField = ({data, value, setValue, label, placeholder, error}) => {
  return (
    <Select
      data={data}
      selectedOption={value}
      onSelect={val => {
        console.log('VALUE SELECTED', val);
        // setValue
        setValue(val.text);
      }}
      placeholder={placeholder}
      style={{marginBottom: 10}}
      label={label}
      status={error ? 'danger' : 'basic'}
      // caption={error}
      // ref={getRef}
      // onSubmitEditing={onSubmitEditing}
    />
  );
};
