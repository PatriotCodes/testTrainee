/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';
import {AppRegistry} from 'react-native';

import Signin from './src/screens/Signin';
import Home from './src/screens/Home';
import NewsItem from './src/screens/NewsItem';

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <Router>
                <Scene key="root"
                       titleStyle={{alignSelf: 'center'}}>
                    <Scene key="signin"
                           component={Signin}
                           title="Signup"
                           renderBackButton={() => (null)}
                           initial
                    />
                    <Scene key="home"
                           component={Home}
                           title="Home"
                           rightTitle=" Sign Out"
                           tintColor='black'
                           renderBackButton={() => (null)}
                           onRight={() => Actions.signin()}
                    />
                    <Scene key="newsItem"
                           rightTitle=" "
                           onRight={() => (null)}
                           component={NewsItem}
                           title="NewsItem"
                    />
                </Scene>
            </Router>
        );
    }

}

AppRegistry.registerComponent(App, () => App);