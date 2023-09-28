import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const LLToggle: React.FC<TouchableOpacityProps & {
  title?: string;
  isToggle?: boolean;
}> = ({
  title,
  isToggle,
  children,
  style,
  ...rest
}) => {

  return (
    <TouchableOpacity style={[styles.toggle, isToggle && styles.toggled, style]} {...rest}>
      {children && children}
      {!children && title && (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggle: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 20,
    backgroundColor: 'lightgray',
  },
  toggled: {
    backgroundColor: '#F4CE15',
  },
  text: {
    color: '#495E57',
    fontWeight: '500',
  },
});

export default LLToggle;