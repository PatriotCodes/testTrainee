import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    TextInput
} from 'react-native';
import t from 'tcomb-form-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

const Form = t.form.Form;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailType = t.refinement(t.String, function (email) { return emailRegex.test(email); });
const passwordType = t.refinement(t.String, function (password) { return password.length >= 6; });
const User = t.struct({
    email: emailType,
    password: passwordType,
});

this.state = {
    val: ''
};

const options = {
    order: ['email', 'password'],
    fields: {
        email: {
            placeholder: 'E-Mail',
            error: 'enter a valid email',
            template: inputTemplate,
            config: {icon: 'ios-mail-outline'}
        },
        password: {
            placeholder: 'Password',
            error: 'minimum length is 6 characters!',
            template: inputTemplate,
            config: {icon: 'ios-lock-outline'},
            password: true,
            secureTextEntry: true
        },
    },
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
        fontSize: 16,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
});

function inputTemplate(locals) {

    const styles = StyleSheet.create({
        itemContainer: {
            flexDirection: 'row',
        },
        textInput: {
            borderBottomWidth: 1,
            borderColor: '#d1d1d1',
            fontSize: 18,
            flex: 1,
            marginLeft: 10
        },
        errorText: {
            fontSize: 18,
            color: '#AB433F'
        }
    });

    return (
        <View>
            {locals.error &&
                <Text style={styles.errorText}>{locals.error.toString()}</Text>
            }
            <View style={styles.itemContainer}>
                <Icon name={locals.config.icon} size={40}/>
                <TextInput underlineColorAndroid='transparent' style={styles.textInput}
                           placeholder={locals.placeholder}
                           secureTextEntry={locals.secureTextEntry}
                           onKeyPress={locals.onKeyPress}
                           onChangeText={value => locals.onChange(value)}
                           value={locals.value}/>
            </View>
        </View>
    );

}

type Props = {};
export default class Signin extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            signInError: false,
            value: {
                email: '',
                password: ''
            }
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
        const value = this.refs.form.getValue();
        if (value) {
            console.log(value.email);
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

    onChange(value) {
        console.log(value);
        this.setState({value: value});
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                <View style={styles.container}>
                    {this.state.signInError &&
                        <Text style={styles.signInError}>Email already registered!</Text>
                    }
                    <Form
                        ref="form"
                        type={User}
                        options={options}
                        value={this.state.value}
                        onChange={(e) => this.onChange(e)}
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

