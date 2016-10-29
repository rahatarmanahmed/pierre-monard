import React, { Component } from 'react'

const DiffChar = (({ch}) => <span className='bg-light-yellow'>{ch}</span>)

class Text extends Component {
  constructor (props) {
    super(props)
    this.state = {
      oldText: props.text,
      newText: props.text
    }
  }
  componentWillReceiveProps (newProps) {
    this.setState({
      oldText: this.props.text,
      newText: newProps.text
    })
  }

  shouldComponentUpdate (newProps) {
    return newProps.text !== this.state.oldText ||
      newProps.text !== this.state.newText
  }

  render () {
    const { oldText, newText } = this.state
    const diff = ['']
    let diffIndex = 0
    for (var i = 0; i < oldText.length; i++) {
      if (oldText[i] === newText[i]) {
        diff[diffIndex] += newText[i]
      } else {
        diff[diffIndex + 1] = <DiffChar ch={newText[i]} key={diffIndex + 1}/>
        diffIndex += 2
        diff[diffIndex] = ''
      }
    }
    return <span>{diff}</span>
  }
}

Text.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default Text
