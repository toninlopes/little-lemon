import React from 'react';
import { StyleSheet, Text, View, SwitchProps, Switch } from 'react-native';

const LLSwitcher: React.FC<{
  title: string;
} & SwitchProps> = ({
  title,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Switch
        {...rest}
        trackColor={{false: '#767577', true: '#495E57'}}
        thumbColor={'white'}
      />
      <Text style={styles.label}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    flex: 1,
    color: '#495E57',
    fontSize: 18,
    marginLeft: 20,
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

export default LLSwitcher;