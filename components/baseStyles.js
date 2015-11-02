var React = require('react-native')
var {StyleSheet} = React

var colors = require('./colors')

var baseStyles = StyleSheet.create({
  white: {
    backgroundColor: 'black',
  },
  blueText: {
    color: colors.blue,
  },
})

module.exports = baseStyles

