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
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitAdd = event => {
    event.preventDefault();

    this.props.onAddTransaction({ ...this.state });
  };

  handleSubmitWith = event => {
    event.preventDefault();

    this.props.onWithdrawTransaction({ ...this.state });
  };

  render() {
    return (
      <form className={styles.form}>
        <input type="number" name="amount" onChange={this.handleChange} />
        <button
          className={styles.controls}
          type="submit"
          onClick={this.handleSubmitAdd}
        >
          Deposit
        </button>
        <button
          className={styles.controls}
          type="submit"
          onClick={this.handleSubmitWith}
        >
          Withdraw
        </button>
      </form>
    );
  }
}

Controls.propTypes = {
  onAddTransaction: PropTypes.func.isRequired,
  onWithdrawTransaction: PropTypes.func.isRequired,
};
