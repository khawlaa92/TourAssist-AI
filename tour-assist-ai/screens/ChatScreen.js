import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ThemeContext } from '../src/context/ThemeContext';
import { Header } from '../src/components/Header';
import { MessageCard } from '../src/components/MessageCard';
import { spacings, fontSizes, borderRadius } from '../constants/theme';

const AI_RESPONSES = [
  'That sounds interesting! Tell me more about your travel plans.',
  'I can help you with that! What specific information do you need?',
  'Great question! In Tunisia, you can find amazing historical sites and beautiful beaches.',
  'The Medina of Tunis is a must-visit destination with traditional markets and architecture.',
  'I recommend visiting Djerba island for its unique culture and beautiful landscapes.',
  'The Sahara desert is incredible - camel trekking and desert camping are popular activities.',
  'For food lovers, you must try traditional couscous and brik!',
  'Carthage has incredible Roman ruins that are absolutely worth exploring.',
  'The blue and white architecture of Sidi Bou Said is stunning and perfect for photos.',
  'I can translate that for you! What language would you like?',
];

export const ChatScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! 👋 Welcome to TourAssist AI. How can I help you explore Tunisia today?',
      isUserMessage: false,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      // Add user message
      const newUserMessage = {
        id: messages.length + 1,
        text: inputText,
        isUserMessage: true,
      };
      setMessages([...messages, newUserMessage]);
      setInputText('');

      // Simulate AI response
      setTimeout(() => {
        const randomResponse =
          AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
        const newBotMessage = {
          id: messages.length + 2,
          text: randomResponse,
          isUserMessage: false,
        };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      }, 800);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Header
        title="Chat Assistant"
        onPressBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message.text}
              isUserMessage={message.isUserMessage}
            />
          ))}
        </ScrollView>

        {/* Input Section */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.secondary,
              borderTopColor: theme.border,
            },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Type a message..."
            placeholderTextColor={theme.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
            style={[
              styles.sendButton,
              {
                backgroundColor: theme.primary,
              },
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            activeOpacity={0.7}
          >
            <Text style={styles.sendButtonText}>📤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: spacings.lg,
    paddingHorizontal: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacings.lg,
    paddingVertical: spacings.md,
    borderTopWidth: 1,
    gap: spacings.md,
  },
  input: {
    flex: 1,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacings.md,
    paddingVertical: spacings.md,
    fontSize: fontSizes.md,
    maxHeight: 100,
    borderWidth: 1,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: fontSizes.xl,
  },
});
