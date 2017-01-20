import React from 'react';

export default class Color extends React.Component {
  static propTypes =  {
    color: React.PropTypes.string.isRequired,
    isChosen: React.PropTypes.bool.isRequired,
    applyColor: React.PropTypes.func.isRequired,
  }

  render() {
    var highLigh = this.props.isChosen? '   chosenColor': '';
    return <div
      className={this.props.color + highLigh}
      onClick={this.applyColor.bind(this, this.props.color)}
      />
  }

  applyColor(color) {
    this.props.applyColor(color);
  }
}
