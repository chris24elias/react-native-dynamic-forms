import React from 'react';
import DynamicForm, {Field} from '..';
import * as yup from 'yup';
import {
  Icon,
  TopNavigationAction,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import {View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SCREEN_WIDTH} from '../constants';

interface PracticeFormProps {}

const practice_form: {[x: string]: Field} = {
  cover: {
    type: 'avatarField',
    title: 'First Name',
    initialValue: 'https://picsum.photos/600',
    // size: {height: 150, width: SCREEN_WIDTH},
    style: {
      height: 200,
      width: SCREEN_WIDTH * 0.9,
      borderRadius: 12,
      overflow: 'hidden',
      alignSelf: 'center',
    },
    // position: 'center',
    // rounded: true,
  },
  logo: {
    type: 'avatarField',
    title: 'First Name',
    initialValue: 'https://picsum.photos/600',
    size: {height: 90, width: 90},
    position: 'center',
    rounded: true,
    style: {marginTop: -50},
  },
  practice_name: {
    type: 'textField',
    placeholder: 'name',
    title: 'Name',
    initialValue: '',
  },
  email: {
    type: 'textField',
    placeholder: 'email',
    title: 'Email',
    initialValue: 'dasda@gmail.com',
    disabled: true,
    keyboardType: 'email-address',
  },
  country_code: {
    initialValue: 0,
    title: 'Country Code',
    type: 'pickerField',
    options: [{label: 'US', value: 1}],
    placeholder: 'Select one',
  },
  phone: {
    type: 'textField',
    placeholder: 'phone',
    title: 'Phone',
    initialValue: '',
    keyboardType: 'number-pad',
  },
  address: {
    type: 'autoCompleteAddressField',
    placeholder: 'address',
    title: 'Address',
    initialValue: '',
    apiKey: 'API-KEY',
  },
  address2: {
    type: 'textField',
    placeholder: 'address',
    title: 'Address 2 (optional)',
    initialValue: '',
  },
  insurances: {
    type: 'textField',
    placeholder: 'in-network insurances',
    title: 'In-network Insurances',
    initialValue: '',
  },
  npi: {
    type: 'textField',
    placeholder: 'npi',
    title: 'NPI',
    initialValue: '',
    keyboardType: 'number-pad',
  },
  description: {
    type: 'textField',
    placeholder: 'description',
    title: 'Describe your practice (optional)',
    initialValue: '',
    multiline: true,
  },
  tags: {
    type: 'tagsInputField',
    placeholder: 'add tags separated by commas...',
    title: 'Tags',
    initialValue: [],
  },
};

const schema = yup.object({
  //   firstName: yup.string().required(),
  practice_name: yup.string().required(),
  description: yup.string().required(),
  npi: yup.string().required(),
  insurances: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  // country_code: yup.number().required(),
  // password: yup.string().required(),
  // checkbox: yup.bool().oneOf([true], 'Field must be checked'),
});

const SaveAction = props => <TopNavigationAction {...props} />;

const PracticeForm = ({}: PracticeFormProps) => {
  const BackIcon = style => <Icon {...style} name="arrow-back" />;

  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  const renderRightControls = () => (
    <TouchableOpacity>
      <Text>Save</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <TopNavigation
        // leftControl={BackAction()}
        title="Practice Form"
        rightControls={renderRightControls()}
        style={{backgroundColor: '#9B59B6'}}
      /> */}
      <DynamicForm form={practice_form} schema={schema} />
    </SafeAreaView>
  );
};

export default PracticeForm;
