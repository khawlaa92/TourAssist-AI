import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { spacings, borderRadius, fontSizes } from '../../constants/theme';

export const MessageCard = ({ message, isUserMessage = false }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.messageContainer,
        isUserMessage ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: isUserMessage ? theme.primary : theme.secondary,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            {
              color: isUserMessage ? '#FFFFFF' : theme.text,
              fontSize: fontSizes.md,
            },
          ]}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: spacings.sm,
    marginHorizontal: spacings.md,
    flexDirection: 'row',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: spacings.md,
    paddingVertical: spacings.sm,
    borderRadius: borderRadius.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    lineHeight: 22,
  },
});
