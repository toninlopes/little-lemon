
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';

const AVATAR_SIZE = 80;

const LLAvatar: React.FC<TouchableHighlightProps & {
  initials?: string;
  image?: string;
  small?: boolean;
}> = ({
  initials,
  image,
  small,
  ...rest
}) => {
  return (
    <TouchableHighlight
      style={[styles.container, small ? styles.smallAvatar : styles.avatar]}
      {...rest}
    >
      <>
        {image && <Image
          style={small ? styles.smallAvatar : styles.avatar}
          source={{uri: image}}/>
        }
        {!image && initials &&
          <Text style={[styles.initialText, small && styles.smallInitialText]}>
            {initials}
          </Text>
        }
      </>
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: 'lightgray',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  smallAvatar: {
    borderRadius: (AVATAR_SIZE * 0.65) / 2,
    backgroundColor: 'lightgray',
    width: (AVATAR_SIZE * 0.65),
    height: (AVATAR_SIZE * 0.65),
  },
  initialText: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  smallInitialText: {
    fontSize: 18,
  }
});

export default LLAvatar;