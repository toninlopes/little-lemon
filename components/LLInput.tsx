import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

const LLInput: React.FC<TextInputProps> = ({
  ...rest
}) => {

    return (
      <TextInput
        style={styles.textInput}
        {...rest}
      />
    );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    width: '100%',
    marginVertical: 12,
    padding: 10,
  },
});

export default LLInput;