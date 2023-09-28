import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const LLButton: React.FC<TouchableOpacityProps & {
  title: string;
  secondary?: boolean
  warning?: boolean;
}> = ({
  title,
  secondary,
  warning,
  style,
  children,
  ...rest
}) => {

  return (
    <TouchableOpacity
      style={[
        styles.button,
        !secondary && !warning && styles.primaryButton,
        secondary && !warning && styles.secondaryButton,
        warning && !secondary && styles.warningButton,
        style && style,
      ]}
      {...rest}
    >
      {children && children}
      {!children && title && (
        <Text style={[
          !secondary && !warning && styles.primaryTextButton,
          secondary && !warning && styles.secondaryTextButton,
          warning && !secondary && styles.warningTextButton,
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 20,
  },
  primaryButton: {
    backgroundColor: '#495E57',
  },
  secondaryButton: {
    padding: 4,
    borderWidth: 1,
  },
  warningButton: {
    backgroundColor: '#F4CE15',
  },
  primaryTextButton: {
    color: 'white',
  },
  secondaryTextButton: {
    color: '#495E57',
  },
  warningTextButton: {
    fontWeight: '600',
  }
});

export default LLButton;