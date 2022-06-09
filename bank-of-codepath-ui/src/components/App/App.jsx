import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionDetail from "../TransactionDetail/TransactionDetail";

export default function App() {

  const [isLoading, setIsLoading] = React.useState(false)
  const [transactions, setTransactions] = React.useState([])
  const [transfers, setTransfers] = React.useState([])
  const [error, setError] = React.useState(null)
  const [filterInputValue, setFilterInputValue] = React.useState(null)

 
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue} />
        <main>
          <Routes>
            <Route path="/" element={<Home 
                transactions={transactions}
                setTransactions={setTransactions}
                transfers={transfers}
                setTransfers={setTransfers}
                error={error}
                setError={setError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                filterInputValue={filterInputValue}
                
                />} />
            <Route path="/transactions/:transactionId " element={<TransactionDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
