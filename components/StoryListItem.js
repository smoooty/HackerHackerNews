var moment = require('moment')
var React = require('react-native')
var {
  Image,
  PixelRatio,
  StyleSheet,
  TouchableHighlight
} = React

var View = require('./View')
var Text = require('./Text')
var Badge = require('./Badge')

var StoryListItem = React.createClass({
  handleSelectArticle() {
    this.props.onSelectArticle(this.props.story)
  },
  handleSelectComments() {
    this.props.onSelectComments(this.props.story)
  },
  renderTitle(story) {
    return (
      <Text style={[styles.storyTitle, styles.storyNumber]} numberOfLines={2}>
        {story.position}. <Text style={styles.storyTitle}>{story.title}</Text>
      </Text>
    )
  },
  renderByline(story) {
    return (
      <View>
      <View style={[styles.row, styles.byline]}>
        <Text style={{color: 'pink'}}>{story.score} points</Text>
      </View>
      <View style={[styles.row, styles.byline]}>
        
        <View>
          <Text style={styles.storyTime} numberOfLines={1}>
           
            submitted {moment(story.time*1000).fromNow()} by {story.by}
          </Text>
        </View>
      </View></View>
    )
  },
  renderArticleButton() {
    var {story} = this.props

    return (
      <View style={styles.textContainer}>
        <TouchableHighlight onPress={this.handleSelectArticle}>
          <View style={styles.storyCell}>
            {this.renderTitle(story)}
            {this.renderByline(story)}
          </View>
        </TouchableHighlight>
      </View>
    )
  },
  renderCommentsButton() {
    var {story} = this.props

    return (
      <TouchableHighlight onPress={this.handleSelectComments}>
        <View style={styles.commentsCell}>
          <Image
            style={styles.icon}
            source={require('image!pixelcomment')}
          />
          <Text style={styles.commentsText} numberOfLines={1}>{story.descendants}</Text>
        </View>
      </TouchableHighlight>
    )
  },

  renderSpacing(){
    return (
      <View style={{height: 5, backgroundColor: 'black'}}>
      </View>
    )
  },

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

<View>{this.renderSpacing()}
      <View style={{borderColor: randomColor(), borderRadius: 0, borderWidth: 4 / PixelRatio.get(), backgroundColor: 'black'}}>
        <View style={[styles.row, styles.itemRow]}>
          {this.renderArticleButton()}
          {this.renderCommentsButton()}
        </View>
        
      </View>
      {this.renderSpacing()}
      </View>
    )} 
    
})

var cellPadding = 8
var randomColor = function() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };
var styles = StyleSheet.create({
  white: {
    backgroundColor: 'black',
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  icon: {
    width: 32,
    height: 32,
  },
  storyCell: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: cellPadding,
  },
  storyTitle: {
    height: 44,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    color: 'white',
  },
  storyNumber: {
    color: 'red',
  },
  storyTime: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  itemRow: {
    height: 90,
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  byline: {
    padding: 0,
  },
  commentsCell: {
    marginLeft: 4,
    padding: cellPadding,
    width: 84,
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 25,
  },
  commentsText: {
    fontSize: 14,
    textAlign: 'center',
  },
  cellBorder: {
    backgroundColor: randomColor(),
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
})



module.exports = StoryListItem
