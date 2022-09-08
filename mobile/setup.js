global.window = {}
global.window = global

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
//     default: () => ({getInitialState: {then: jest.fn()}}),
//     __esModule: true,
// }));