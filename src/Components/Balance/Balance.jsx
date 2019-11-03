import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ income, expenses, balance }) => (
  <div className={styles.BalanceWrapper}>
    <div className={styles.clientBalance}>
      <div className={styles.clientBalance__col}>&#8593;{income()}</div>
      <div className={styles.clientBalance__col}>&#8595;{expenses()}</div>
      <div className={styles.clientBalance__col}>Balance: {balance}</div>
    </div>
  </div>
);

Balance.propTypes = {
  income: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
};

Balance.defaultProps = {
  // bla: 'test',
};

export default Balance;
