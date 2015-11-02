var moment = require('moment')
var React = require('react-native')
var {
  TouchableHighlight,
  StyleSheet,
  Image,
  PixelRatio,
} = React
var HTMLView = require('react-native-htmlview')

var View = require('./View')
var Text = require('./Text')
var colors = require('./colors')

var Comment = React.createClass({
  getInitialState() {
    return {
      open: true,
    }
  },
  handleDisclosureClick(e) {
    this.setState({open: !this.state.open})
  },
  renderBody(comment) {
    return (
      <View style={styles.commentBody}>
        <HTMLView value={'<div>' + comment.text + '</div>'} stylesheet={styles} />
        {comment.childItems ? <CommentList comments={comment.childItems} /> : null}
      </View>
    )
  },
  render() {
    var {comment} = this.props
    var {open} = this.state

    if (comment == null) return null

    return (
      <View style={styles.comment}>
        <TouchableHighlight onPress={this.handleDisclosureClick} underlayColor="white">
          <View style={[styles.disclosureRow, styles.inline]}>
            <Image
              source={open ? require('image!pixeldisclosure90') : require('image!pixeldisclosure')}
              style={[styles.disclosure, styles.muted]}
            />
            <Text style={styles.muted}>
              {' '}
              {moment(comment.time*1000).fromNow()} by {comment.by}
            </Text>
          </View>
        </TouchableHighlight>
        {open ? this.renderBody(comment) : null}
      </View>
    )
  }
})

var CommentList = React.createClass({
  renderComment(comment) {
    return <Comment key={comment.id} comment={comment} />
  },
  render() {
    return (
      <View>
        {this.props.comments.map(this.renderComment)}
      </View>
    )
  }
})

var styles = StyleSheet.create({
   div: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  figure: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  blockquote: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  caption: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  code: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  em: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  hr: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  dl: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  dt: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  dd: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  main: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  mark: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  ol: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  li: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  tr: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  th: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  tbody: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  table: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  ul: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  span: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  i: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  strong: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  h1: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  h2: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  h3: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  font: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  h4: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  h5: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  h6: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  p: {
    color: 'white',
    fontFamily: 'Visitor TT1 BRK',
  },
  a: {
    color: 'magenta',
    fontFamily: 'Visitor TT1 BRK',
  },
  body: {
    color: 'white',
  },
  html: {
    color: 'white',
  },
  inline: {
    flexDirection: 'row',
  },
  muted: {
    opacity: 0.3,
  },
  commentText: {
    color: 'white',
  },
  textMuted: {
    color: colors.grey
  },
  comment: {
    backgroundColor: 'black',
    margin: 0,
    padding: 4,
  },
  commentBody: {
    backgroundColor: 'black',
    paddingLeft: 10,
    borderLeftColor: colors.grey,
    borderLeftWidth: 1 / PixelRatio.get(),

  },
  disclosure: {
    width: 14,
    height: 14,
    marginLeft: 2,
    marginRight: 8,
        backgroundColor: 'black',
  },
  disclosureRow: {
    paddingLeft: 0,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: 'black',
  },
})

module.exports = Comment
