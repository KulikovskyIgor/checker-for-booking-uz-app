import React, { PureComponent, PropTypes } from 'react';

import style from './RouteTextInput.css';

export default class RouteTextInput extends PureComponent {

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleSubmit = (evt) => {
    const text = evt.target.value.trim();
    if (evt.which === 13) {
      this.save(text);
      this.setState({ text: '' });
    }
  };

  handleChange = (evt) => {
    this.setState({ text: evt.target.value });
  };

  handleBlur = (evt) => {
    this.save(evt.target.value);
  };

  save = text => {
    text && this.props.onSave(text);
  };

  render() {
    return (
      <input
        className={style.new}
        type="text"
        placeholder={"Put booking.uz's url here"}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}
