import React from 'react';
import ReactDOM from 'react-dom';
import Palette from './Palette.js';
import Text from './Text.js';
import SidePanel from './SidePanel.js';

class Highlighter {

  constructor(node) {
    this._node = node;
    this._cloneNode = node.cloneNode(true);
    this.attachEvents(this._node);
  }

  setColor(color) {
    this._color = color;
    return this;
  }

  onSelectedText(callback) {
    this._onSelectedText = callback;
    return this;
  }

  attachEvents(node) {
    node.addEventListener('mouseup', () => this.addSelectedText());
  }

  clear() {
    const parent = this._node.parentNode;
    parent.replaceChild(this._cloneNode, this._node);
    this._node = this._cloneNode;
    this._cloneNode = this._cloneNode.cloneNode(true);
    this.attachEvents(this._node);
  }

  addSelectedText() {
    console.log('add selection');
    var el = document.getElementById('text');
    var sel = window.getSelection();
    if(sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        if(range.toString() === '') return;
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(el);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        var start = preCaretRange.toString().length;
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        var end = preCaretRange.toString().length;
        var selectedText = this.highLightSelection(start, end, this.getAllTextNodes(el, []), this._color);
        this._onSelectedText(selectedText);
        sel.empty();
    }
    window.getSelection().empty();
  }

  getAllTextNodes(rootElement, result) {
    for(var i = 0; i < rootElement.childNodes.length; i++) {
      if(rootElement.childNodes[i].childNodes.length === 0) {
        result.push(rootElement.childNodes[i]);
      } else this.getAllTextNodes(rootElement.childNodes[i], result);
    }
    return result;
  }

  highLightSelection(start, end, textNodes, colorForSelection) {
    var offset = 0;
    var selectedText = '';
    for(var i = 0; i < textNodes.length; i++) {
      if(textNodes[i].length + offset >= start) {
        this.highLightTextDom(start - offset, end - offset, textNodes[i], colorForSelection);
        selectedText += textNodes[i].data.substring(start - offset, end - offset);
        offset += textNodes[i].length;
        while(offset < end) {
          i++;
          this.highLightTextDom(start - offset, end - offset, textNodes[i], colorForSelection);
          selectedText += textNodes[i].data.substring(start - offset, end - offset);
          offset += textNodes[i].length;
        }
        break;
      }
      offset += textNodes[i].length;
    }
    return selectedText;
  }


  highLightTextDom(start, end, textElement, colorForSelection) {
    var textData = textElement.data;
    if(end > textData.length) end = textData.length;
    var leftText = textData.substring(0, start) === ''
      ? null : document.createTextNode(textData.substring(0, start));
    var rightText = textData.substring(end, textData.length) === ''
      ? null: document.createTextNode(textData.substring(end, textData.length));
    var span = document.createElement('span');
    if(textElement.parentNode.nodeName ==='SPAN'
      && textElement.parentNode.className.includes('selectedByUser')) {
        span.className = 'highlightRed selectedByUser';
    } else {
      span.className = colorForSelection + ' selectedByUser';
    }
    span.appendChild(document.createTextNode(textData.substring(start, end)));
    var parent = textElement.parentNode;
    if(leftText != null) parent.insertBefore(leftText, textElement);
    parent.insertBefore(span, textElement);
    if(rightText != null) parent.insertBefore(rightText, textElement);
    parent.removeChild(textElement);
  }
}

export default class App extends React.Component {
  _highlighter;

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      currentColor: 'green',
    };
  }

  componentDidMount() {
    const textNode = document.getElementById('text');
    this._highlighter = new Highlighter(textNode)
      .onSelectedText((selectedText) => this.addSelectedItems(selectedText))
      .setColor(this.state.currentColor);
  }

  render() {
    console.log(this.state);
/* <Text
  addSetectedText={(selectedText) => this.addSelectedItems(selectedText)}
  colorForSelection={this.state.currentColor}
/> */
    return <div>
        <Palette
          applyColor={(color) => this.applyColor(color)}
          currentColor={this.state.currentColor}
          removeAllSelections={() => this.removeAllSelections()}
        />
        <div className="text" id='text'>
            <h3>Google Pixel phones to be unveiled October 4</h3>
            <p>The firm may also launch its voice-activated AI home audio speaker, a VR headset and a 4K Chromecast</p>
            <p>Google will unveil its latest Pixel smartphones on October 4, the firm has suggested through a teaser website.</p>
            <p>It is believed the Nexus brand name will be dropped in favour of two new models: the Pixel and the Pixel XL.</p>
            <p>Current rumours around the devices &ndash; which have been codenamed Sailfish and Marlin &ndash; say the devices will be 5-inch and 5.5-inch phones. At Google's developer conference in May CEO Sundar Pichai hinted that the new line would includes additional Google features built on top of the Android operating system. As such, Pixel is expected to become a premium brand.</p>
            <p>The teaser website shows a search bar that morphs into the outline of a phone, before flashing with various images. The event will take place in San Francisco at 9AM PST (5PM BST), and be streamed on YouTube.</p>
            <p>Leaked images of the Pixel phones</p>
            <p> Leaked images of the Pixel phones</p>
            <p>Android Police</p>
            <p>At present the company controls the design and marketing of its Nexus products, with the manufacturing of the devices outsourced to third parties. This, according to Pichai earlier this year, will not change.</p>
            <p>But there could also be more to come from the event. A previous report from Android Police has said the event will be packed with Google's latest products.</p>
            <p>Rumoured to be launching that day will be a Google virtual reality headset, under the guise of the Google Daydream project; a 4K Chromecast, and its highly anticipated AI personal assistant device.</p>
            <p>At its developer conference, Google announced a new voice-controlled, artificial intelligence Home speaker that will connect to devices around a building and be able to control them. The artificial intelligence based Google Home speaker The artificial intelligence based Google Home speaker Google</p>
            <p>The device will use a Google Assistant, which is being built into a new Google messages app called Allo &ndash; which is rumoured to be launching before the October event. &quot;With a simple voice command, you can ask Google Home to play a song, set a timer for the oven, check your flight, or turn on your lights,&quot; the firm said at the time.</p>
            <p>Any home device would be a rival to Amazon's Echo, which launched in the UK on September 16. The Echo uses Amazon's own personal assistant, Alexa, to control internet of things devices as well as provide news, weather, and travel updates.</p>
            <p>Although the teaser website doesn't reference any of these products, Google previously said its Home device would launch before the end of 2016.</p>
        </div>
        <SidePanel selectedItems={this.state.selectedItems} />
    </div>
  }

  addSelectedItems(selectedText) {
    var newSelections = this.state.selectedItems.slice()
    newSelections.push({color: this.state.currentColor, inputText: selectedText});
    this.setState({
      selectedItems: newSelections,
    })
  }

  applyColor(color) {
    this._highlighter.setColor(color);
    this.setState({
      currentColor: color,
    });
  }

  removeAllSelections() {
    this._highlighter.clear();
    this.setState({
      selectedItems: [],
    })
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
