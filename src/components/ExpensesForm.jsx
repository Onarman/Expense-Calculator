import React from "react";
import { MdEdit, MdAddCircle } from "react-icons/md";
export default function ExpensesForm({
  handleSubmit,
  date,
  handleDate,
  charge,
  handleCharge,
  amount,
  handleAmount,
  edit,
  theme,
}) {
  return (
    <form onSubmit={handleSubmit} className={`form-group text-light${theme === "light" ? "bg-dark": "bg-light"} `}>
      <div className="card bg-primary">
        
          <label  htmlFor="">Date</label>
          <input className="form-group label" type="date" value={date} onChange={handleDate} />

          <label htmlFor="">Expense</label>
          <input type="text" value={charge} onChange={handleCharge}
          placeholder={"e.g. rent"}
           />

          <label htmlFor="">Amount</label>
          <input type="number"  min="0" value={amount} onChange={handleAmount}
          placeholder={"e.g. 1500"}
          />
        {edit ? (
          <button
            className="btn btn-dark" 
          ><MdEdit/>Edit
          </button>
        ) : (
          <button
            className="btn btn-warning"
            text="Add"
          ><MdAddCircle class="btn-icon" />Add</button>
        )}
      </div>
    </form>
  );
}
