/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
} = React;

var InspireScreen = require('./InspireScreen');

var jiyi = React.createClass({
    render: function() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: InspireScreen,
                    title: 'Choose Topic'
                }}
                style={styles.container}
            />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

AppRegistry.registerComponent('jiyi', () => jiyi);

module.exports = jiyi;
