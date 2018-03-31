import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import t from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';

const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  password: t.String,
});
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
    },
  },
  controlLabel: {
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
  },
};
const options = {
  order: ['email','password'],
  fields: {
    email: {
      placeholder: 'email@mail.com',
      error: 'enter a valid email',
    },
    password: {
      placeholder: '******',
      error: 'enter a valid password',
    },
  },
  stylesheet: formStyles,
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
    borderRadius:30,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

type Props = {};
export default class Signin extends Component<Props> {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ',value);
    Actions.gray()
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#ffffff'}}>
        <View style={styles.container}>
          <Form 
            ref={c => this._form = c}
            type={User}
            options={options}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.bottomButton} onPress={this.handleSubmit}>
            <Text style={{color:'white',fontSize:17,paddingHorizontal:80}}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
