/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

export default class Controls extends Component {
  state = {
    amount: 0,
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: Number(e.target.value),
    });
  };

  handleSubmitAdd = event => {
    event.preventDefault();
    this.props.onAddTransaction({ ...this.state }, event);
    this.setState({ amount: 0 });
  };

  render() {
    return (
      <form className={styles.form}>
        <input type="number" name="amount" onInput={this.handleChange} />
        <button
          className={styles.controls}
          type="submit"
          name="deposit"
          onClick={this.handleSubmitAdd}
        >
          Deposit
        </button>
        <button
          className={styles.controls}
          type="submit"
          name="withdrawal"
          onClick={this.handleSubmitAdd}
        >
          Withdraw
        </button>
      </form>
    );
  }
}

Controls.propTypes = {
  onAddTransaction: PropTypes.func.isRequired,
};
