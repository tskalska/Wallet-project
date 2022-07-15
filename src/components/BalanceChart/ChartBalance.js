import { useSelector } from "react-redux";
import React from "react";

import "../../css/main.min.css";

function ChartBalance() {
  const transactions = useSelector((state) => state.transactions.data);

  if (!transactions || transactions.length === 0) {
    return (
      <p className="chartBalance">
        {"\u20B4"} {0}{" "}
      </p>
    );
  } else {
    const balance = transactions[0].currentBalance;
    return (
      <p className="chartBalance">
        {"\u20B4"} {balance}{" "}
      </p>
    );
  }
}

export default ChartBalance;
