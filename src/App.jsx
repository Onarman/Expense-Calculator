import "./App.css";
import ExpensesCalc from "./ExpensesCalc";
import { ThemeContextProvider } from "./context/ThemeContext";


function App() {
  return (
   <ThemeContextProvider>
      <ExpensesCalc />
   </ThemeContextProvider>
        
    

    
  );
}

export default App;

