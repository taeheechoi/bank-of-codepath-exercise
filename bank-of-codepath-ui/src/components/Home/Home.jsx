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
  isCreating,
  setIsCreating,
  newTransactionForm,
  setNewTransactionForm,
}) {
  const filteredTransactions = transactions?.filter((trans) =>
    filterInputValue
      ? trans.description.toLowerCase().includes(filterInputValue.toLowerCase())
      : transactions
  );

  const filteredTransfers = transfers?.filter((trans) =>
    filterInputValue
      ? trans.description.toLowerCase().includes(filterInputValue.toLowerCase())
      : transfers
  );

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/bank/transactions"
      );

      setTransactions(response.data.transactions);
    } catch (err) {
      setError(err.message);
    }
  };
  const getTransfers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bank/transfers");
      setTransfers(response.data.transfers);
    } catch (err) {
      setError(err.message);
    }
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

      await setTransactions([...transactions, response.data.transaction]);

      setNewTransactionForm({'category': "", "description": "", "amount": 0});
      setIsCreating(false);
    } catch (err) {
      setError(err.message);
      setIsCreating(false);
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

  console.log("filteredTransactions", filteredTransactions);

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
        <BankActivity transactions={filteredTransactions} transfers={filteredTransfers} />
      )}
      <h2 className="error">{error}</h2>
    </div>
  );
}
