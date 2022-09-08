module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', ['@babel/preset-react', { runtime: 'automatic' }], '@babel/typescript', 'module:metro-react-native-babel-preset'],
        plugins: [
            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
            ["@babel/plugin-proposal-private-methods", {"loose": true}]
        ]
    };
};
