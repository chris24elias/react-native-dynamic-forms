import React from 'react';
import {Datepicker, Icon, Text} from '@ui-kitten/components';
import {View} from 'react-native';
import styles from '../constants/styles';
import {FieldComponentProps} from '../constants/interfaces';

interface DatePickerFieldProps extends FieldComponentProps {
  value: Date;
  setValue: any;
  title: string;
  titleStyle: any;
}

const CalendarIcon = style => <Icon {...style} name="calendar" />;

const DatePickerField = ({
  value,
  setValue,
  title,
  titleStyle,
  error,
  ...otherProps
}: DatePickerFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <Text category="c2" style={[{marginBottom: 5}, titleStyle]}>
        {title}
      </Text>
      <Datepicker
        placeholder="Pick Date"
        date={value}
        onSelect={setValue}
        // icon={CalendarIcon}
        status={error ? 'danger' : value ? 'success' : 'basic'}
        {...otherProps}
      />
    </View>
  );
};

export default React.memo(DatePickerField);
