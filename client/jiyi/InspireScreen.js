/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text
} = React;


var InspireScreen = React.createClass({

    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                  Find Photographers
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});


module.exports = InspireScreen;