import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native';
import t from 'tcomb-form-native';
import {Actions} from 'react-native-router-flux';

const Form = t.form.Form;
const User = t.struct({
    email: t.String,
    password: t.String,
});
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;
stylesheet.textboxView.normal.borderColor = '#d1d1d1';

const options = {
    auto: 'none',
    order: ['email', 'password'],
    fields: {
        email: {
            placeholder: 'E-Mail',
            error: 'enter a valid email',
        },
        password: {
            placeholder: 'Password',
            error: 'enter a valid password',
        },
    },
    stylesheet: stylesheet,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    bottomButton: {
        position: 'absolute',
        bottom: 55,
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
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
    signInError: {
        color: '#AB433F',
        fontSize: 17,
    }
});

type Props = {};
export default class Signin extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            signInError: false
        };
    }

    signIn = async val => {
        const response = await fetch('https://vast-falls-89340.herokuapp.com/sign_in.php', {
            method: 'POST',
            body: JSON.stringify({
                email: val.email,
                password: val.password,
            })
        });
        return await response.text();
    };

    handleSubmit = async () => {
        this.setState({signInError: false});
        this.setState({loading: true});
        const value = this._form.getValue();
        if (value) {
            const response = await this.signIn(value);
            this.setState({loading: false});
            if (response === 'success') {
                Actions.home();
            } else {
                this.setState({signInError: true});
            }
        }
        this.setState({loading: false});
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                <View style={styles.container}>
                    { this.state.signInError &&
                        <Text style={styles.signInError}>Email already registered!</Text>
                    }
                    <Form
                        ref={c => this._form = c}
                        type={User}
                        options={options}
                    />
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.bottomButton} onPress={this.handleSubmit}>
                        <Text style={{color: 'white', fontSize: 17, paddingHorizontal: 80}}>Sign in</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={this.state.loading}
                    onRequestClose={() => {console.log('close modal')}}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator
                                animating={this.state.loading} />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

