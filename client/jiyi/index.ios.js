/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Navigator,
    View,
    NavigatorIOS
} = React;

var InspireScreen = require('./InspireScreen');

var jiyi = React.createClass({
    // renderScene: function(route, navigator) {
    //     var Component = route.component;
    //     return (
    //         <View style={styles.container}>
    //             <Component
    //                 route={route}
    //                 navigator={navigator}
    //                 topNavigator={navigator} />
    //         </View>
    //     )
    // },

    render: function() {
        return (
            <NavigatorIOS
                //renderScene={this.renderScene}
                initialRoute={{
                    component: InspireScreen,
                    title: 'Choose Tag'
                }}
                style={styles.container}
            />
        );
    }

    // render: function() {
    //     return (
    //         <Navigator
    //             //ref={(navigator) => { this.navigator = navigator; }}
    //             renderScene={this.renderScene}
    //             tintColor='#D6573D'
    //             barTintColor='#FFFFFD'
    //             titleTextColor='#D6573D'
    //             navigationBarHidden={false}
    //             initialRoute={{
    //                 component: InspireScreen,
    //                 title: 'Choose Tag'
    //             }}
    //             sceneStyle={styles.container}
    //         />
    //     );
    // }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

AppRegistry.registerComponent('jiyi', () => jiyi);

module.exports = jiyi;
