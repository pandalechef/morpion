import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class Plateau extends Component {
  render() {
    return (
      <Button style={{ border: '1px solid' }} onClick={this.props.onClick}>
        {this.props.valeur || ''}
      </Button>
    );
  }
}
