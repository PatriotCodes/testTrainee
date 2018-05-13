import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    ActivityIndicator,
    CheckBox,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#e5e5e5',
    },
    newsItem: {
        alignSelf: 'stretch',
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 5,
        flexDirection: 'row',
    },
    newsTitle: {
        fontSize: 14,
        color: '#000000',
        marginTop: 6,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    checkBox: {
        marginLeft: 'auto'
    },
    newsHighlight: {
        alignSelf: 'stretch'
    }
});

export default class Home extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            news: null
        };
        this.loadNews().then(response => {
                this.setState({loading: false});
                this.setState({news: response});
            }
        );
    }

    loadNews = async () => {
        const response = await fetch('https://vast-falls-89340.herokuapp.com/news.php');
        return await response.json();
    };

    onPress = (id) => {
        Actions.newsItem({id: id});
    };

    render() {
        if (this.state.news) {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        {this.state.news.map((prop) => {
                            return (
                                <TouchableHighlight style={styles.newsHighlight} key={prop.id}
                                                    underlayColor='black' onPress={() => this.onPress(prop.id)}>
                                    <View style={styles.newsItem}>
                                        <Text style={styles.newsTitle}>{prop.title}</Text>
                                        <CheckBox style={styles.checkBox}/>
                                    </View>
                                </TouchableHighlight>
                            );
                        })
                        }
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Modal
                        transparent={true}
                        animationType={'none'}
                        visible={this.state.loading}
                        onRequestClose={() => {
                            console.log('close modal')
                        }}>
                        <View style={styles.modalBackground}>
                            <View style={styles.activityIndicatorWrapper}>
                                <ActivityIndicator
                                    animating={this.state.loading}/>
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        }
    }
}
