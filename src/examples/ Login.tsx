import React from 'react';
import DynamicForm from '..';
import * as yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';

interface LoginProps {}

const loginForm = {
  email: {
    type: 'textField',
    placeholder: 'email',
    title: 'Email',
    initialValue: '',
    keyboardType: 'email-address',
  },
  password: {
    type: 'textField',
    placeholder: 'password',
    title: 'Password',
    initialValue: '',
    secure: true,
  },

  checkbox: {
    type: 'checkboxField',
    placeholder: 'check',
    title: 'I agree with Terms & Conditions',
    initialValue: false,
    style: {},
    textStyle: {},
  },
};

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  checkbox: yup
    .bool()
    .oneOf([true], 'You must agree with terms and conditions'),
});

const Login = ({}: LoginProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DynamicForm
        form={loginForm}
        schema={schema}
        onSubmit={values => {
          console.log('SUBMITTED VALUES', values);
        }}
        submitButtonText="Login"
        submitButtonStyle={{}}
        submitButtonTextStyle={{}}
      />
    </SafeAreaView>
  );
};

export default Login;
