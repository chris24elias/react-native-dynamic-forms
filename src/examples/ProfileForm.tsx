import React from 'react';
import DynamicForm, {Field} from '..';
import * as yup from 'yup';

interface ProfileFormProps {}

const profileForm: {[x: string]: Field} = {
  profilePhoto: {
    type: 'avatarField',
    title: 'First Name',
    initialValue: 'https://picsum.photos/600',
    size: {height: 150, width: 150},
    position: 'center',
    rounded: true,
  },
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
    initialValue: 'dasda@gmail.com',
    disabled: true,
  },
  country_code: {
    initialValue: null,
    title: 'Country Code',
    type: 'pickerField',
    options: [{label: 'US', value: 1}],
    placeholder: 'Select one',
  },
  gender: {
    title: 'Gender',
    initialValue: 'Male',
    type: 'radioField',
    options: [{text: 'Male'}, {text: 'Female'}],
    placeholder: 'gender',
  },
  tags: {
    type: 'tagsInputField',
    placeholder: 'add tags separated by commas...',
    title: 'Tags',
    initialValue: [],
  },
};

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  country_code: yup.number().required(),
  // password: yup.string().required(),
  // checkbox: yup.bool().oneOf([true], 'Field must be checked'),
});

const ProfileForm = ({}: ProfileFormProps) => {
  return <DynamicForm form={profileForm} schema={schema} />;
};

export default ProfileForm;
