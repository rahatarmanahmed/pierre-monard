import React, { Component } from 'react'

class Chapter extends Component {
  render () {
    const { chapter, textRenderers } = this.props
    return (
      <article className='measure-wide'>
        {chapter.map((text, i) => {
          const TextRenderer = textRenderers[i]
          return <TextRenderer text={text} key={i}/>
        })}
      </article>
    )
  }
}

Chapter.propTypes = {
  chapter: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  textRenderers: React.PropTypes.arrayOf(React.PropTypes.func).isRequired
}

export default Chapter
