// jest.config.js
const {defaults: tsjPreset} = require('ts-jest/presets')

console.log(__dirname)
module.exports = {
    ...tsjPreset,
    preset: 'jest-expo',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json',
            babelConfig: true,
        },
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "<rootDir>//node_modules/(?!(@react-native|react-native)).*/",
        '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ["<rootDir>/setup.js"],
    // moduleNameMapper: {
    //     "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js",
    //     "\\.(css|less)$": "<rootDir>/assetsTransformer.js"
    // },
}