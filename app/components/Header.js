import React, { PropTypes, Component } from 'react';
import RouteTextInput from './RouteTextInput';

export default class Header extends Component {

  static propTypes = {
    setRoute: PropTypes.func.isRequired
  };

  render() {
    return (
      <header>
        <h1>Routes</h1>
        <RouteTextInput
          onSave={this.props.setRoute}
        />
      </header>
    );
  }
}
