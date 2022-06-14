import * as React from "react";
import { formatAmount, formatDate } from "../../utils/format";
import "./TransactionDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = React.useState(false);
  const [transaction, setTransaction] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  let { transactionId } = useParams();

  const fetchTransactionById = async () => {
    setIsLoading(true)
    setHasFetched(false)

    try {
      const response = await axios.get(`http://localhost:3001/bank/transactions/${transactionId}`);
      await setTransaction(response.data.transaction);
      

    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false)
    setHasFetched(true)
  };

  React.useEffect(() => {

    fetchTransactionById()

  }, [transactionId]);

  // console.log(transaction, transaction.id, transaction.length, isLoading, hasFetched)

  return (
    <div className="transaction-detail">
      {transaction?.id  ?
      <TransactionCard
        transaction={transaction}
        transactionId={transactionId}
      /> : (!isLoading && hasFetched &&

        <div className="card-header">
          <h1>Not Found</h1>
      </div>
      )
      }
    </div>
  );
}

export function TransactionCard({ transaction = {}, transactionId = null }) {
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <p className="category">{transaction.category}</p>
      </div>
      
      <div className="card-content">
        <p className="description">{transaction.description}</p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>
          {formatAmount(transaction.amount)}
        </p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
  );
}
