// Mock expo-router
global.jest = require('jest');

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock react-native-deck-swiper
jest.mock('react-native-deck-swiper', () => {
  const React = require('react');
  const MockSwiper = React.forwardRef((props, ref) => {
    const { View } = require('react-native');
    React.useImperativeHandle(ref, () => ({
      swipeLeft: jest.fn(),
      swipeRight: jest.fn(),
    }));
    return React.createElement(View, { testID: 'swiper', ...props });
  });
  MockSwiper.displayName = 'MockSwiper';
  return MockSwiper;
});

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: 'Image',
}));

// Mock vector icons
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

// Global test environment setup
global.__DEV__ = true;
