import React from 'react';
import Color from './Color';

export default class Palette extends React.Component {
  static propTypes = {
    applyColor: React.PropTypes.func.isRequired,
    currentColor: React.PropTypes.string.isRequired,
    removeAllSelections: React.PropTypes.func.isRequired,
  }

  render() {
    let colors = ['green', 'blue', 'grey'];
    colors = colors.map((color, i) =>  {
      return <Color
        key={i}
        color={color}
        isChosen={this.props.currentColor === color}
        applyColor={this.props.applyColor}
      />
    });
    return <div className="palette">
      {colors}
      <div
        className="removeSelections"
        onClick={() => this.removeAllSelections()}>
        Clear Selections
      </div>
    </div>
  }

  removeAllSelections() {
    this.props.removeAllSelections();
  }
}
