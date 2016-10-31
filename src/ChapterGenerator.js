import React, { Component } from 'react'
import Rx from 'rxjs'
import Solver from 'genetic-phrase-solver'
import Chapter from './Chapter'

class ChapterGenerator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chapter: Array(props.chapter.length).fill().map(() => [])
    }
  }

  componentDidMount () {
    this.subscription = Rx.Observable.from(this.props.chapter)
      .map(line => line.split(/(?=[.,;])/))
      .concatMap((paragraph, index) =>
        Rx.Observable.from(paragraph)
        .concatMap((line, subIndex) =>
          Rx.Observable.from(Solver(line), Rx.Scheduler.async)
          .map(text => ({ text, index, subIndex }))
        )
      )
      .scan((chapter, { text, index, subIndex }) => {
        chapter[index][subIndex] = text
        return chapter
      }, this.state.chapter)
      .subscribe(
        chapter => this.setState({ chapter }),
        null,
        _ => this.setState({})
      )
  }

  componentWillUnmount () {
    this.subscription.unsubscribe()
  }

  render () {
    const { chapter } = this.state
    const { textRenderers } = this.props
    return <Chapter chapter={chapter.map(lines => lines.join(''))} textRenderers={textRenderers}/>
  }
}

ChapterGenerator.propTypes = {
  chapter: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  textRenderers: React.PropTypes.arrayOf(React.PropTypes.func).isRequired
}

export default ChapterGenerator
