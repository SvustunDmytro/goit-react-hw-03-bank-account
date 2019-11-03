import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => (
  <div className="TransactionHistoryWrapper">
    <table className={styles.table}>
      <thead>
        <tr>
          <td>TRANSACTION</td>
          <td>AMOUNT</td>
          <td>DATE</td>
        </tr>
      </thead>
      {items.length > 0 &&
        items.map(el => (
          <tr key={el.id}>
            <td>{el.type}</td>
            <td>{el.amount}</td>
            <td>{el.date}</td>
          </tr>
        ))}
    </table>
  </div>
);

TransactionHistory.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionHistory;
