import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';

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
    },
    newsTitle: {
        fontSize: 20,
        color: '#000000',
    },
    newsText: {
        fontSize: 16,
        color: '#000000',
        marginTop: 10,
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
    }
});

export default class NewsItem extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            news: null,
            id: props.id
        };
        this.loadNews().then(response => {
                this.setState({loading: false});
                this.setState({news: response});
                console.log(response);
                console.log(this.state.id);
            }
        );
    }

    loadNews = async () => {
        const response = await fetch('https://vast-falls-89340.herokuapp.com/news.php', {
            method: 'POST',
            body: JSON.stringify({
                id: this.state.id,
            })
        });
        return await response.json();
    };

    render() {
        if (this.state.news)
        {
            return (
                <View style={styles.container}>
                    <View style={styles.newsItem}>
                        <Text style={styles.newsTitle}>{this.state.news.title}</Text>
                        <Text style={styles.newsText}>{this.state.news.text}</Text>
                    </View>
                </View>
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