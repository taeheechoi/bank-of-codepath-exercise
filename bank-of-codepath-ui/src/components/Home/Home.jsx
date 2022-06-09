import * as React from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import axios from "axios";

export default function Home({
  transactions,
  setTransactions,
  transfers,
  setTransfers,
  error,
  setError,
  isLoading,
  setIsLoading,
  filterInputValue,
}) {
  

  const filteredTransactions = transactions?.filter(trans =>
    filterInputValue ? trans.description.toLowerCase().includes(filterInputValue): transactions
  );

  console.log(filteredTransactions)
  
  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/bank/transactions"
      );
      setTransactions(response.data.transactions);
    } catch (err) {
      setError(err);
    }
  };
  const getTransfers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bank/transfers");
      setTransfers(response.data.transfers);
    } catch (err) {
      setError(err);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      getTransactions();
      getTransfers();

      setIsLoading(false);
    };



    fetchData();
  }, []);
  
  return (
    <div className="home">
      
      <AddTransaction />
      
      {isLoading ? <h1>Loading...</h1> : <BankActivity filteredTransactions={filteredTransactions} />}
      {error && <h2 className="error">{error.message}</h2>}

    </div>
  );
}
