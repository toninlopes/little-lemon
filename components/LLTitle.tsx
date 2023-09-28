import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const LLTitle: React.FC<TextProps & {
  subtitle?: boolean;
}> = ({
  subtitle,
  children,
  style,
  ...rest
}) => {
    return (
      <Text style={[
        !subtitle && styles.title,
        subtitle && styles.subtitle,
        style && style,
      ]} {...rest} >{children}</Text>
    );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 8,
  },
});

export default LLTitle;