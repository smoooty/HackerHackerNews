var _ = require('underscore')
var moment = require('moment')
var React = require('react-native')
var {
  ListView,
  StyleSheet,
} = React
var RefreshableListView = require('react-native-refreshable-listview')

var Story = require('../stores/Story')
var Routes = require('../Routes')
var StoreWatchMixin = require('./StoreWatchMixin')
var View = require('./View')
var Text = require('./Text')
var Badge = require('./Badge')
var Loading = require('./Loading')
var Refreshing2 = require('./refreshing2')
var Comment = require('./Comment')

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

var CommentsScreen = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],
  getInitialState() {
    return {
      dataSource: baseDataSource.cloneWithRows(this.getComments() || []),
    }
  },
  componentDidMount() {
    if (!this.getStory()) this.loadStory()
  },
  getStoreWatches() {
    this.watchStore(Story, _.debounce(() => {
      if (this.isMounted()) {
        this.setState({
          dataSource: baseDataSource.cloneWithRows(this.getComments() || []),
        })
      }
    }, 100))
  },
  loadStory(callback) {
    Story.fetch(this.props.storyId).then(callback)
  },
  getStory() {
    return Story.get(this.props.storyId)
  },
  getTitle() {
        var story = this.getStory()

    return story && story.title || null
  },
 renderHeaderWrapper(Refreshing2) {
    return (
      <View>
      {Refreshing2}
      <View style={{backgroundColor: 'black', paddingTop: 60}}>
        <Text style={{backgroundColor: 'black', fontSize: 20, textAlign: 'center', marginLeft: 2, marginRight: 2}}>{this.getTitle()}</Text>
        {/*  you MUST render the refreshingIndicator (which is passed in as the first argument) */}
        </View>
      </View>
    )
  },
  getComments() {
    var story = this.getStory()
    return story && story.childItems || null
  },
  isLoaded() {
    return this.getComments() != null
  },
  renderComment(comment) {
    return <Comment comment={comment} />
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

    if (!this.isLoaded()) {
      return <Loading>comments</Loading>
    } else {
      return (
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderComment}
          loadData={this.loadStory}
          renderHeaderWrapper={this.renderHeaderWrapper}
          style={{backgroundColor: 'black'}}
          refreshDescription="Fetching comments"
          refreshingIndictatorComponent={<Refreshing2 />}
        />
      )
    }
  }
})

var styles = StyleSheet.create({
})

module.exports = CommentsScreen
