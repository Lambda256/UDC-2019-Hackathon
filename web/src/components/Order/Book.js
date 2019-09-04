import React from "react";

function Order(props) {
  const { price, amount, total, maxValue, type } = props;
  return (
    <div className={`row-align-center row-space-between order-item ${type}`}>
      <div
        className="fill-background"
        style={{ width: `${(total / maxValue) * 100}%` }}
      />
      <div className={`price ${type}`}>{price}</div>
      <div className="amount">{amount}</div>
      <div className="total">{total}</div>
    </div>
  );
}

function Book(props) {
  const { data, maxValue, type } = props;
  return data.map((item, index) => {
    return <Order type={type} {...item} maxValue={maxValue} />;
  });
}

Book.propTypes = {};

Book.defaultProps = {};

export default Book;
