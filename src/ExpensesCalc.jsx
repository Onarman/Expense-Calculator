import React, { useState, useRef, useEffect } from "react";
import ExpensesForm from "./components/ExpensesForm";
import ExpensesList from "./components/ExpensesList";
import Alert from "./components/Alert";
import { BudgetStyle } from "./components/styles/Budget.style";
import { v4 as uuidV4 } from "uuid";
import { useThemeChange } from "./context/ThemeContext";
const initialExpense = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

export default function ExpensesCalc({children}) {
  // state values
  // All expenses
  const [expenses, setExpense] = useState(initialExpense);
  // Single Expense
  const [date, setDate] = useState("");
  // Single Amount
  const [amount, setAmount] = useState("");
  // Single Charge
  const [charge, setCharge] = useState("");
  // Budget
  const [budget, setBudget] = useState("");
  // Id's
  const [id, setId] = useState(0);
  // Edit?
  const [edit, setEdit] = useState(false);
  // Alert
  const [alert, setAlert] = useState({ show: false });
  // Handlers

  // handle Budget
  const changeBudget = (e) => {
    // setBudget(e.target.value);
    setBudget(inputBudget.current.value);
  };
  // handle Charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // handle Date
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  // handle Amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  // handle Alert

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  //   Handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date !== "" && charge !== "" && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map((item) => {
          return item.id === id ? { ...item, date, charge, amount } : item;
        });
        setExpense(tempExpense);
        setEdit(false);
        // todo: Alert
        handleAlert({ type: "success", text: "Expense Edited" });
      } else {
        const singleExpense = { id: uuidV4(), date, charge, amount };
        setExpense([...expenses, singleExpense]);
        // todo: Alert
        handleAlert({ type: "success", text: "Expense added" });
      }
      setCharge("");
      setAmount("");
    } else {
      // todo: Alert
      handleAlert({
        type: "danger",
        text: "Please complete all fields ",
      });
    }
    // Set Expense
  };
  let inputBudget = useRef(null);
  useEffect(() => {
    inputBudget.current.value === "" && inputBudget.current.focus();
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Handle Clear all Expense
  const clearAllExpenses = () => {
    setExpense([]);
    // todo: Alert

    handleAlert({ type: "danger", text: "All expenses deleted" });
  };
  // Handler Delete one expense

  const handleDelete = (id) => {
    if (window.confirm("Delete expense?")) {
      let filteredExpense = expenses.filter((expense) => expense.id !== id);
      setExpense(filteredExpense);
      // todo: Alert
      handleAlert({ type: "danger", text: "Expense deleted" });
    }
  };

  const handleEdit = (id) => {
    let editedExpense = expenses.find((expense) => expense.id === id);
    let { charge, amount } = editedExpense;
    setCharge(charge);
    setAmount(amount);
    setId(id);
    setEdit(true);
  };

  const {theme,toggleTheme}  = useThemeChange();

  const handleTheme =()=>{
    toggleTheme();
  }
  return (
    <main className={`container`}>
      <div className="head">
      <h1 className="title">Expenses Calculator</h1>
      <button className="btn-theme" onClick={handleTheme}>{theme === "light" ? "Dark Mode" : "Light Mode"}</button>
      </div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      
      <section
      
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "25px ",
          margin: "1rem",
        }}
      >
        <aside className={`neresi`}>
          <ExpensesForm
            date={date}
            handleDate={handleDate}
            charge={charge}
            handleCharge={handleCharge}
            amount={amount}
            handleAmount={handleAmount}
            handleSubmit={handleSubmit}
            edit={edit}
          />

          <section className={`card mt-2  text-light text-right`}>
            <div className={`card-body ${theme === "light" ? "bg-dark": "bg-light"}`}>
              <BudgetStyle>
                <h3>Budget : $</h3>
                <input
                className="budgetInput"
                  type="number"
                  value={budget}
                  onChange={changeBudget}
                  ref={inputBudget}
                />
              </BudgetStyle>
              <div className="economy">
              <h3 className="mb-1">
                Total expenses: ${" "}
                {expenses.reduce((total, expense) => {
                  return (total += parseInt(expense.amount, 10));
                }, 0)}
              </h3>
              {/* Calc economies */}
              <h3>Economies: $ {calcEconomies(budget, expenses)}</h3>
              </div>
              
            </div>
          </section>
        </aside>
        <section>
          <ExpensesList
            expenses={expenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleClearAllExpenses={clearAllExpenses}
          />
        </section>
      </section>
    </main>
  );
}
function calcEconomies(budget, expenses) {
  return (
    budget -
    expenses.reduce((total, expense) => {
      return (total += parseInt(expense.amount, 10));
    }, 0)
  );
}
