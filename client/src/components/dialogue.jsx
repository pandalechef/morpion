import React, { Component } from 'react';

export default class Dialogue extends Component {
  render() {
    const messages = [];
    return (
      <ul>
        {messages.map(message => (
          <li key={message.date}>=>{message.text}</li>
        ))}
      </ul>
    );
  }
}
