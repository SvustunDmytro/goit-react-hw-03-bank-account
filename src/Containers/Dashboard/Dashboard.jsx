/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Controls from '../../Components/Controls/Controls';
import Balance from '../../Components/Balance/Balance';
import TransactionHistory from '../../Components/TransactionHistory/TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.css';

const uuidv4 = require('uuid/v4');

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const prevTransactions = localStorage.getItem('transactions');
    const prevBalance = localStorage.getItem('balance');

    if (prevTransactions) {
      const transactions = JSON.parse(prevTransactions);

      this.setState({ transactions });
    }
    if (prevBalance) {
      const balance = JSON.parse(prevBalance);

      this.setState({ balance });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;

    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    if (prevState.balance !== balance) {
      localStorage.setItem('balance', JSON.stringify(balance));
    }
  }

  notifyNoInputValue = () => toast('Введите сумму для проведения операции!');

  notifyNoCost = () =>
    toast('На счету недостаточно средств для проведения операции!');

  addDateTransaction = () => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  onAddTransaction = (trans, event) => {
    const { name } = event;
    const transaction = {
      amount: trans.amount,
      id: uuidv4(),
      type: event.target.name,
      date: this.addDateTransaction(),
    };
    if (trans.amount <= 0) {
      this.notifyNoInputValue();
      return;
    }
    if (this.state.balance < trans.amount) {
      this.notifyNoCost();
      return;
    }
    this.setState(state => ({
      transactions: [...state.transactions, transaction],
      balance:
        name === 'withdrawal'
          ? state.balance - trans.amount
          : state.balance + trans.amount,
    }));
    event.target.parentNode.reset();
  };

  handleTotalAmount = type => {
    const { transactions } = this.state;
    const amount = transactions
      .filter(transaction => transaction.type === type)
      .reduce((acc, transaction) => {
        return transaction.amount + acc;
      }, 0);

    return amount;
  };

  render() {
    const { transactions, balance } = this.state;
    return (
      <div className={styles.DashboardWrapper}>
        <Controls onAddTransaction={this.onAddTransaction} />
        <Balance handleTotalAmount={this.handleTotalAmount} balance={balance} />
        <TransactionHistory items={transactions} />
        <ToastContainer />
      </div>
    );
  }
}
