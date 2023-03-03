import { createContext, useState } from "react";
import "./App.css";
import { Landing } from "./components/Landing";
export const DataContext = createContext();
function App() {
  const [tabValue, setTabValue] = useState("1");
  const [state, setState] = useState({
    BasiceSalary: "",
    Hra: "",
    standardDeduction: 50000,
    otherAllowence: "",
    lta: "",
    eightyC: "",
    eightyTta: "",
    eightyD: "",
    rent: "",
    HraByRent: "",
    HraExmption: "",
    totalSalary: "",
    totalDeduction: "",
    taxableAmount: "",
    newTax: "",
    oldTax: "",
    msg: "",
    backButton: false,
  });
  return (
    <div className="App">
      <h2 className="App__head">Tax calculator</h2>
      <DataContext.Provider value={{ tabValue, setTabValue, state, setState }}>
        <Landing />
      </DataContext.Provider>
    </div>
  );
}

export default App;
