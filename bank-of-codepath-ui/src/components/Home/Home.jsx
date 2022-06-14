import * as React from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import axios from "axios";

export default function Home({
  transactions,
  transfers,
  setTransactions,
  setTransfers,
  error,
  setError,
  isLoading,
  setIsLoading,
  filterInputValue,
  isCreating,
  setIsCreating,
  newTransactionForm,
  setNewTransactionForm,
}) {
  
  const filteredTransactions = transactions?.filter((trans) =>
    filterInputValue.length
      ? trans.description
          ?.toLowerCase()
          .includes(filterInputValue?.toLowerCase())
      : transactions
  );

  const filteredTransfers = transfers?.filter((trans) =>
    filterInputValue.length
      ? trans.description
          ?.toLowerCase()
          .includes(filterInputValue?.toLowerCase())
      : transfers
  );

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/bank/transactions"
      );
      console.log('transactions', response.data.transactions)
      setTransactions(response.data.transactions);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  const getTransfers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/bank/transfers");
      setTransfers(response.data.transfers);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleOnCreateTransaction = async () => {
    
    setIsCreating(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/bank/transactions",
        {
          transaction: {
            ...newTransactionForm,
          },
        }
      );
      
      await setTransactions([...transactions, {...response.data.transaction}]);
      
      
      
    } catch (err) {
      setError(err.message);
      setIsCreating(false);
    }
    
    setNewTransactionForm({ category: "", description: "", amount: 0 });
    setIsCreating(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      getTransactions();
      getTransfers();
    };

    fetchData();
  }, []);

  // console.log("filteredTransactions", filteredTransactions);

  return (
    <div className="home">
      <AddTransaction
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        form={newTransactionForm}
        setForm={setNewTransactionForm}
        handleOnSubmit={handleOnCreateTransaction}
      />

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <BankActivity
          transactions={filteredTransactions}
          transfers={filteredTransfers}
        />
      )}
      <h2 className="error">{error}</h2>
    </div>
  );
}
