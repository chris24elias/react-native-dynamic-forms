import React from 'react';
import DynamicForm, {Field} from '../src';
import * as yup from 'yup';

interface ProfileFormProps {}

const profileForm: {[x: string]: Field} = {
  firstName: {
    type: 'textField',
    placeholder: 'first name',
    title: 'First Name',
    initialValue: '',
  },
  lastName: {
    type: 'textField',
    placeholder: 'last name',
    title: 'Last Name',
    initialValue: '',
  },
  email: {
    type: 'textField',
    placeholder: 'email',
    title: 'Email',
    initialValue: '',
  },
  gender: {
    title: 'Gender',
    initialValue: 'Male',
    type: 'radioField',
    options: [{text: 'Male'}, {text: 'Female'}],
    placeholder: 'gender',
  },
  lastName2: {
    type: 'textField',
    placeholder: 'last name',
    title: 'Last Name',
    initialValue: '',
  },
  lastName3: {
    type: 'textField',
    placeholder: 'last name',
    title: 'Last Name',
    initialValue: '',
  },
};

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  // password: yup.string().required(),
  // checkbox: yup.bool().oneOf([true], 'Field must be checked'),
});

const ProfileForm = ({}: ProfileFormProps) => {
  return <DynamicForm form={profileForm} schema={schema} />;
};

export default ProfileForm;
