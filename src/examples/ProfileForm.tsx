import React from 'react';
import DynamicForm, {Field} from '..';
import * as yup from 'yup';
import {Icon, TopNavigationAction, TopNavigation} from '@ui-kitten/components';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  phone: {
    type: 'textField',
    placeholder: 'phone',
    title: 'Phone',
    initialValue: '',
    keyboardType: 'number-pad',
  },
  about: {
    type: 'textField',
    placeholder: 'about',
    title: 'About',
    initialValue: '',
    multiline: true,
  },
  specialties: {
    type: 'multiSelectPickerField',
    initialValue: [],
    title: 'Specialties',
    options: [
      {name: 'US', value: 1},
      {name: 'Canada', value: 2},
    ],
  },
  practice_names: {
    type: 'textField',
    placeholder: 'practice names',
    title: 'Practice names',
    initialValue: '',
    disabled: true,
  },
  board_certificates: {
    type: 'textField',
    placeholder: 'board certifications',
    title: 'Board Certifications',
    initialValue: '',
  },
  education: {
    type: 'textField',
    placeholder: 'education and training',
    title: 'Education and Training',
    initialValue: '',
  },
  awards: {
    type: 'textField',
    placeholder: 'awards',
    title: 'Awards',
    initialValue: '',
  },
  // country_code: {
  //   initialValue: 0,
  //   title: 'Country Code',
  //   type: 'pickerField',
  //   options: [{label: 'US', value: 1}],
  //   placeholder: 'Select one',
  // },
  language_list: {
    type: 'multiSelectPickerField',
    initialValue: [],
    title: 'Languages',
    options: [
      {name: 'US', value: 1},
      {name: 'Canada', value: 2},
    ],
  },
  gender: {
    title: 'Gender',
    initialValue: 'Male',
    type: 'selectField',
    options: [{text: 'Male'}, {text: 'Female'}],
    placeholder: 'gender',
  },
  npi: {
    type: 'textField',
    placeholder: 'npi',
    title: 'NPI',
    initialValue: '',
    keyboardType: 'number-pad',
  },
  tags: {
    type: 'tagsInputField',
    placeholder: 'add tags separated by commas...',
    title: 'Tags',
    initialValue: [],
  },
  accepting: {
    type: 'checkboxField',
    placeholder: '',
    title: 'Accepting new patients',
    initialValue: false,
  },
};

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  // country_code: yup.number().required(),
  // password: yup.string().required(),
  // checkbox: yup.bool().oneOf([true], 'Field must be checked'),
});

const ProfileForm = ({}: ProfileFormProps) => {
  const BackIcon = style => <Icon {...style} name="arrow-back" />;

  const BackAction = () => <TopNavigationAction icon={BackIcon} />;
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        // leftControl={BackAction()}
        title="Application Title"
      />
      <DynamicForm form={profileForm} schema={schema} />
    </SafeAreaView>
  );
};

export default ProfileForm;
