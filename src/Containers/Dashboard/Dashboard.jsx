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

  onDeposit = trans => {
    const transaction = {
      ...trans,
      id: uuidv4(),
      type: 'Deposit',
      date: new Date().toLocaleDateString(),
    };
    if (Number(trans.amount) <= 0) {
      this.notifyNoInputValue();
      return;
    }
    this.setState(state => ({
      transactions: [...state.transactions, transaction],
      balance: Number(state.balance) + Number(trans.amount),
    }));
  };

  onWithdraw = trans => {
    const transaction = {
      ...trans,
      id: uuidv4(),
      type: 'Withdrawal',
      date: new Date().toLocaleDateString(),
    };
    if (Number(trans.amount) <= 0) {
      this.notifyNoInputValue();
      return;
    }

    if (this.state.balance < trans.amount) {
      this.notifyNoCost();
      return;
    }
    this.setState(state => ({
      transactions: [...state.transactions, transaction],
      balance: Number(state.balance) - Number(trans.amount),
    }));
  };

  income = () => {
    const incomeTrans = this.state.transactions.filter(
      el => el.type === 'Deposit',
    );
    return incomeTrans.map(el => Number(el.amount)).reduce((a, b) => a + b, 0);
  };

  expenses = () => {
    const expensesTrans = this.state.transactions.filter(
      el => el.type === 'Withdrawal',
    );
    return expensesTrans
      .map(el => Number(el.amount))
      .reduce((a, b) => a + b, 0);
  };

  render() {
    const { transactions, balance } = this.state;
    return (
      <div className={styles.DashboardWrapper}>
        <Controls
          onAddTransaction={this.onDeposit}
          onWithdrawTransaction={this.onWithdraw}
        />
        <Balance
          income={this.income}
          expenses={this.expenses}
          balance={balance}
        />
        <TransactionHistory items={transactions} />
        <ToastContainer />
      </div>
    );
  }
}
