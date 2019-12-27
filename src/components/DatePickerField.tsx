import React from 'react';
import {Datepicker, Icon} from '@ui-kitten/components';
import {View} from 'react-native';
import styles from '../constants/styles';

interface DatePickerFieldProps {
  value: Date;
  setValue: any;
  title: string;
}

const CalendarIcon = style => <Icon {...style} name="calendar" />;

const DatePickerField = ({
  value,
  setValue,
  title,
  ...otherProps
}: DatePickerFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <Datepicker
        placeholder="Pick Date"
        date={value}
        onSelect={setValue}
        // icon={CalendarIcon}
        {...otherProps}
      />
    </View>
  );
};

export default React.memo(DatePickerField);
