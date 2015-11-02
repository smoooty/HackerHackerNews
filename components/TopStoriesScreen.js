var _ = require('underscore')
var React = require('react-native')
var {
  ScrollView,
  ListView,
  StyleSheet,
} = React
var RefreshableListView = require('react-native-refreshable-listview')

var Routes = require('../Routes')
var TopStory = require('../stores/TopStory')
var View = require('./View')
var Text = require('./Text')
var StoreWatchMixin = require('./StoreWatchMixin')
var StoryListItem = require('./StoryListItem')
var Loading = require('./Loading')
var Refreshing = require('./Refreshing')


var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})



var TopStoriesScreen = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],
  getInitialState() {
    return {
      dataSource: baseDataSource.cloneWithRows(this.getTopStories()),
    }
  },
  componentDidMount() {
    var topStories = this.getTopStories()
    if (!(topStories && topStories.length)) this.loadTopStories()
  },
  getStoreWatches() {
    this.watchStore(TopStory, _.debounce(() => {
      if (this.isMounted()) {
        this.setState({dataSource: baseDataSource.cloneWithRows(this.getTopStories())})
      }
    }, 100))
  },
  loadTopStories() {
    return TopStory.fetch()
  },
  getTopStories() {
    return TopStory.ordered()
  },
  gotoComments(story) {
    this.props.route.push(Routes.Comments(story))
  },
  gotoArticle(story) {
    this.props.route.push(Routes.Article(story))
  },
  renderStory(story) {
    return (
      <StoryListItem
        story={story}
        onSelectComments={this.gotoComments}
        onSelectArticle={this.gotoArticle}
      />
    )
  },
  renderHeaderWrapper(Refreshing) {
    return (
      <View>
      {Refreshing}
      <View style={{backgroundColor: 'black', height: 14}}>
       
        {/*  you MUST render the refreshingIndicator (which is passed in as the first argument) */}
        </View>
      </View>
    )
  },
  renderStoriesListView() {
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
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <Loading>top stories</Loading>
      )
    } else {
      return (
        
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderStory}
          loadData={this.loadTopStories}
          renderHeaderWrapper={this.renderHeaderWrapper}
          style={{backgroundColor: randomColor()}}
          refreshDescription="Refreshing top stories"
          refreshingIndictatorComponent={<Refreshing />}  
          
        />
      )
    }
  },
  render() {
    return this.renderStoriesListView()
  }
})

var indicatorStylesheet = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: 60,
    marginTop: 0,
  },
})

module.exports = TopStoriesScreen
