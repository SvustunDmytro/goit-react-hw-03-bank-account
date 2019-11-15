import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ handleTotalAmount, balance }) => (
  <div className={styles.BalanceWrapper}>
    <div className={styles.clientBalance}>
      <div className={styles.clientBalance__col}>
        &#8593;{handleTotalAmount('deposit').toFixed(2)}&#36;
      </div>
      <div className={styles.clientBalance__col}>
        &#8595;{handleTotalAmount('withdrawal').toFixed(2)}&#36;
      </div>
      <div className={styles.clientBalance__col}>
        Balance: {balance.toFixed(2)}&#36;
      </div>
    </div>
  </div>
);

Balance.propTypes = {
  handleTotalAmount: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
};

Balance.defaultProps = {
  // bla: 'test',
};

export default Balance;
