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
      <tbody>
        {items.length > 0 &&
          items.map(el => (
            <tr key={el.id}>
              <td>{el.type}</td>
              <td>{Number(el.amount).toFixed(2)}&#36;</td>
              <td>{el.date}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

TransactionHistory.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionHistory;
