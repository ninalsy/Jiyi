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
  Image,
  TabBarIOS,
  NavigatorIOS,
} = React;

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
var TagView = require('./TagView');

var InspireScreen = React.createClass({
    getInitialState: function() {
        return {
            selectedTab: 'blueTab',
            notifCount: 0,
            presses: 0,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    _renderContent: function(color: string, pageText: string, num?: number) {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
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

    // renderProductView: function() {
    //     return (
    //         <NavigatorIOS
    //             style={styles.container}
    //             tintColor='#D6573D'
    //             barTintColor='#FFFFFD'
    //             titleTextColor='#D6573D'
    //             ref='productRef'
    //             initialRoute={{
    //                 title: 'Product Kitty'
    //                 //component: Products
    //         }} />
    //     )
    // },

    // renderCollectionView: function() {
    //     return (
    //         <NavigatorIOS
    //             style={styles.container}
    //             tintColor='#D6573D'
    //             barTintColor='#FFFFFD'
    //             titleTextColor='#D6573D'
    //             ref='collectionRef'
    //             initialRoute={{
    //                 title: 'Collections',
    //                 //component: Collections,
    //                 passProps: {
    //                 accessToken: this.state.accessToken
    //             }
    //         }} />
    //     )
    // },

    render: function() {
        return (
            <View style={styles.container}>
                <TabBarIOS
                    tintColor="white"
                    barTintColor="50D2C2">
                    <TabBarIOS.Item
                      title="Blue Tab"
                      icon={{uri: base64Icon, scale: 3}}
                      selected={this.state.selectedTab === 'blueTab'}
                      onPress={() => {
                        this.setState({
                          selectedTab: 'blueTab',
                        });
                      }}>
                      {this._renderContent('#414A8C', 'Blue Tab')}
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                      systemIcon="history"
                      badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                      selected={this.state.selectedTab === 'redTab'}
                      onPress={() => {
                        this.setState({
                          selectedTab: 'redTab',
                          notifCount: this.state.notifCount + 1,
                        });
                      }}>
                      {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                      icon={require('./heart.png')}
                      title="More"
                      selected={this.state.selectedTab === 'greenTab'}
                      onPress={() => {
                        this.setState({
                          selectedTab: 'greenTab',
                          presses: this.state.presses + 1
                        });
                      }}>
                      {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
                    </TabBarIOS.Item>
                  </TabBarIOS>
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