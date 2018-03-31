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

var _ = require('lodash');
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

const options = {
  order: ['email','password'],
  fields: {
    email: {
      placeholder: 'Email',
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
