/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableElement,
  Image
} = React;

var TagView = React.createClass({
    render: function() {
        return (
            <View>
                
                <View style={styles.row}>
                    <Image
                        source={{uri: this.props.tag.images[0]}}
                        style={styles.cellImage}
                    />
                    <Text style={styles.text}>
                        {this.props.tag.name}
                    </Text>
                </View>
    
            </View>
        );
    }
});

var styles = StyleSheet.create({
    cellImage: {
        height: 300,
        width: 500
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 5,
    },
    text: {
        fontSize: 25,
        color: '#333333'
    }
});


module.exports = TagView;