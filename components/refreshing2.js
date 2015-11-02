var React = require('react-native')
var {
  StyleSheet,
} = React

var View = require('./View')
var Text = require('./Text')

var Refreshing2 = React.createClass({
  render() {
    var randomColor = function(iDarkLuma, iLightLuma) 
{       
  for (var i=0;i<20;i++)
  {
    var sColour =  '#'+ ('ffffff' + Math.floor(Math.random() * 0xFFFFFF).toString(16)).substr(-6);

    var rgb = parseInt(sColour, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var iLuma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709


    if (iLuma > iDarkLuma && iLuma < iLightLuma) return sColour;
  }
  return sColour;
}; 

    return (
      <View style={{backgroundColor: randomColor(), height: 100, alignItems: 'center', marginTop:-10}}>
        <Text style={{marginTop: 50}}>{this.props.description}</Text>
      </View>
    )
  },
})

var styles = StyleSheet.create({
  wrapper: {
    height: 60,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loading: {
    height: 60,

  },
})

module.exports = Refreshing2
