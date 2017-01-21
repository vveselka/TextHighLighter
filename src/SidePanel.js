import React from 'react';

export default class SidePanel extends React.Component {
  static propTypes = {
    selectedItems: React.PropTypes.array,
  }

  render() {
    const selectedElements = [];
    this.props.selectedItems.forEach((element, index) => {
      var selectedElement =
      <li key={index}>
        <span className={element.color} >Selection {index + 1}: </span>
        <div className="selectedItem">
          {element.inputText}
        </div>
      </li>;
      selectedElements.push(selectedElement);
    });

    return <div className="sidePanel">
      <div className="sideBarTitle">
        My selections:
      </div>
      <ul>
        {selectedElements}
      </ul>
    </div>
  }

  removeSelection(start, end) {
      this.props.removeSelection(start, end);
  }
}
