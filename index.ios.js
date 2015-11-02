'use strict'

var React = require('react-native')
var Router = require('react-native-custom-navigation')

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  Image,
  View,
} = React

var Routes = require('./Routes')

var BackButton = React.createClass({
  render() {
    return (
      <Image
            style={styles.icon}
            source={require('image!pixelbackarrow')}
          />)
  }
});

var ReactNativeHackerNews = React.createClass({
  
  render: function() {
    return (
      <Router
        style={styles.container}
        backButtonComponent={BackButton}
        initialRoute={Routes.TopStories()}
           
      />
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    
  },
  icon: {
    width: 32,
    height: 32,
    marginLeft:4,
  },
})

AppRegistry.registerComponent('ReactNativeHackerNews', () => ReactNativeHackerNews)
