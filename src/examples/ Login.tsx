import React from 'react';
import DynamicForm, {Field} from '..';
import * as yup from 'yup';

interface LoginProps {}

const loginForm: {[x: string]: Field} = {
  email: {
    type: 'textField',
    placeholder: 'email',
    title: 'Email',
    initialValue: '',
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
  },
};

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  checkbox: yup.bool().oneOf([true], 'Field must be checked'),
});

const Login = ({}: LoginProps) => {
  return <DynamicForm form={loginForm} schema={schema} />;
};

export default Login;
