import React from 'react';
import {ButtonGroup, Button} from '@ui-kitten/components';
import styles from '../constants/styles';
import {View} from 'react-native';

const ButtonGroupField = ({
  value,
  setValue,
  title,
  placeholder,
  error,
  buttons,
  ...otherProps
}) => {
  function renderButtons() {
    if (buttons) {
      return buttons.map((btn, index) => {
        const {label, icon} = btn;
        const val = btn.value;
        const isLeftRight = index == 0 || index == buttons.length - 1;

        let extraStyles = {};
        if (!isLeftRight) {
          extraStyles = {
            borderLeftWidth: 0,
            borderRightWidth: 0,
          };
        } else if (index == 0) {
          extraStyles = {
            borderBottomLeftRadius: 4,
            borderTopLeftRadius: 4,
          };
        } else if (index == buttons.length - 1) {
          extraStyles = {
            borderBottomRightRadius: 4,
            borderTopRightRadius: 4,
          };
        }
        if (icon) {
          <Button
            appearance={val == value ? 'filled' : 'outline'}
            key={index}
            onPress={() => setValue(val)}
            style={[{borderRadius: 0}, extraStyles]}
            icon={icon}
          />;
        }
        return (
          <Button
            appearance={val == value ? 'filled' : 'outline'}
            key={index}
            onPress={() => setValue(val)}
            style={[{borderRadius: 0}, extraStyles]}>
            {label}
          </Button>
        );
      });
    }
  }

  return (
    <View style={styles.fieldContainer}>
      {/* <ButtonGroup
        // status={error ? 'danger' : value ? 'success' : 'basic'}
        {...otherProps}>
        {renderButtons()}
      </ButtonGroup> */}
      <View style={{flexDirection: 'row'}}>{renderButtons()}</View>
    </View>
  );
};

export default React.memo(ButtonGroupField);
