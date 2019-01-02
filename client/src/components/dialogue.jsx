import React, { Component } from 'react';
import { TextField, Grid, Paper } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

export default class Dialogue extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.handleNewMessage();
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    const { messages, utilisateur } = this.props;
    console.log('messages ', messages);
    return (
      <Paper style={{ padding: '10px' }}>
        <Grid container>
          <Grid item xs={12} style={{ height: '150px', overflowY: 'scroll' }}>
            <ul>
              {messages.map((message, i) => (
                <li
                  style={{
                    listStyle: 'none',
                    textAlign: utilisateur === message.to ? 'left' : 'right'
                  }}
                  key={i}
                >
                  {message.message}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={11}>
            <TextField
              multiline
              label="Nouveau message"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={1}>
            <Add
              onClick={() => {
                this.setState({ value: '' });
                this.props.handleClick(this.state.value);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
