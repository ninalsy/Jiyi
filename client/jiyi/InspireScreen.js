/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  ListView,
  StyleSheet,
  View,
  Text,
  Image
} = React;

var TagView = require('./TagView');

var InspireScreen = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
    },

    componentDidMount: function() {
        this.getInspirationContent();
    },

    getInspirationContent: function() {
        // mock data for the time being
        var tags = [
            {
                name: 'Children',
                images: ['https://farm6.staticflickr.com/5577/14869969397_3aa527678c_z_d.jpg',
                    'https://farm5.staticflickr.com/4013/4259234912_53c8ac3e98_z_d.jpg']
            },
            {
                name: 'Romance',
                images: ['https://farm8.staticflickr.com/7464/16092115386_fb487a20b3_z_d.jpg', 
                    'https://farm3.staticflickr.com/2836/9439667389_8f349a811c_z_d.jpg']
            }
        ];

        this.setState({
            dataSource: this.getDataSource(tags)
        });
    },

    getDataSource: function(tags: Array<any>): ListView.DataSource {
        return this.state.dataSource.cloneWithRows(tags);
    },

    renderRow: function(
        tag: Object,
        sectionID: number | string,
        rowID: number | string,
        highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
    ) {
        return (
            <TagView
                key={tag.name.toLowerCase()}
                tag={tag}
            />
        );
    },

    render: function() {
        return (
            <View style={styles.container}>
                <ListView
                    ref="listview"
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    automaticallyAdjustContentInsets={true}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={true}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    separator: {
        height: 1,
        backgroundColor: '#eeeeee',
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    }
})


module.exports = InspireScreen;