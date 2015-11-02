class Routes {
  static register(name, handler) {
    if (this.handlers == null) this.handlers = {}
    this.handlers[name] = handler
  }
  static get(name, params) {
    if (this.handlers[name] == null) throw new Error('unknown route')
    return this.handlers[name](params)
  }
  static TopStories() {
    return {
      component: require('./components/TopStoriesScreen'),
      

    }
  }
  static Article(story) {
    return {
      component: require('./components/ArticleScreen'),
      
      passProps: {url: story.url}
    }
  }
  static Link(url) {
    return {
      component: require('./components/ArticleScreen'),
      
      passProps: {url: url}
    }
  }
  static Comments(story) {
    if (story == null) throw new Error('missing argument: story')

    var route = {
      component: require('./components/CommentsScreen'),
      
    }

    // TODO: get title from store?
    route.passProps = {storyId: story.id}

    return route
  }
}

module.exports = Routes
