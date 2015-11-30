import React from 'react';
import './style.css';

function getRange(el) {
    var cuRange, tbRange, headRange, range, dupRange, ret = {};
    if(el.setSelectionRange){
        // standard
        ret.begin = el.selectionStart;
        ret.end = el.selectionEnd;
        ret.result = el.value.substring(ret.begin, ret.end);
    }else if(document.selection){
        // ie
        if(el.tagName.toLowerCase() === 'input'){
            cuRange = document.selection.createRange();
            tbRange = el.createTextRange();
            tbRange.collapse(true);
            tbRange.select();
            headRange = document.selection.createRange();
            headRange.setEndPoint('EndToEnd', cuRange);
            ret.begin = headRange.text.length - cuRange.text.length;
            ret.end = headRange.text.length;
            ret.result = cuRange.text;
            cuRange.select();
        }else if(el.tagName.toLowerCase() === 'textarea'){
            range = document.selection.createRange();
            dupRange = range.duplicate();
            dupRange.moveToElementText(el);
            dupRange.setEndPoint('EndToEnd', range);
            ret.begin = dupRange.text.length - range.text.length;
            ret.end = dupRange.text.length;
            ret.result = range.text;
        }
    }
    el.focus();
    return ret;
}

class IPut extends React.Component {
  static defaultProps = {
    className: '',
    defaultValue: '...',
    isError: () => false,
    onChange: new Function()
  }
  state = {
    value: []
  }
  constructor() {
    super();
  }
  componentDidMount() {
    this.setState({
      value: this.props.defaultValue.split('.')
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue.split('.')
    });
  }
  handleChange(e, i) {
    let val = parseInt( e.target.value );
    if( isNaN(e.target.value) ) { return e.preventDefault(); }
    if( val !== '' && (val > 255 || val < 0) ) { val = 255; }

    let value = this.state.value;
    value[i] = val;
    this.setState({value}, () => this.onPropsChange());

    if( !isNaN(val) && String(val).length === 3 && i < 3 ) { this[`_input-${i + 1}`].focus(); }
  }
  handleKeyDown(e, i) {
    /* 37 = ←, 39 = →, 8 = backspace */
    let domId = i;
    if( (e.keyCode === 37 || e.keyCode === 8) && getRange(e.target).end === 0 && i > 0 ) { domId = i - 1; }
    if( e.keyCode === 39 && getRange(e.target).end === e.target.value.length && i < 3 ) { domId = i + 1; }
    this[`_input-${domId}`].focus();
  }

  handlePaste(e, i) {
    let value = e.clipboardData.getData('text/plain').split('.').map(val => parseInt(val));
    if( value.length === 4 - i && value.every(val => !isNaN(val) && val > 0 && val < 255) ) {
      let oldValue = this.state.value;
      value.forEach( (val, j) => oldValue[i+j] = val );
      this.setState({value: oldValue}, () => this.onPropsChange());
      return e.preventDefault();
    }
  }

  onPropsChange() {
    this.props.onChange( this.state.value.join('.') );
  }

  render() {
    let className = [
      'react-ip-input',
      this.props.className,
      this.props.isError() ? 'has-error' : ''
    ].join(' ');

    return (
      <div className={className}>
        {this.state.value.map( (val, i) =>
          <div className="react-ip-input__item" key={i}>
            <input
                ref={(el) => this[`_input-${i}`] = el}
                type="text"
                defaultValue={isNaN(val) ? '' : val}
                value={isNaN(val) ? '' : val}
                onChange={(e) => this.handleChange(e, i)}
                onKeyDown={(e) => this.handleKeyDown(e, i)}
                onPaste={(e) => this.handlePaste(e, i)}
            />
            {i !== 3 ? <i>.</i> : false}
          </div>
        )}
      </div>
    );
  }
}
export default IPut;
