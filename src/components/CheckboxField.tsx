import React from 'react';
import {
  Input,
  Select,
  Layout,
  Button,
  Text,
  CheckBox,
} from '@ui-kitten/components';

interface CheckboxFieldProps {
  checked: boolean;
  onCheckedChange: any;
}

const CheckboxField = ({checked, onCheckedChange}: CheckboxFieldProps) => {
  return (
    <CheckBox
      text={`Checked: ${checked}`}
      checked={checked}
      onChange={isChecked => {
        console.log('is chcked', isChecked);
        onCheckedChange(isChecked);
      }}
    />
  );
};

export default CheckboxField;
