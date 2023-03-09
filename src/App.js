import { createContext, useState } from "react";
import "./App.css";
import FullWidthTabs from "./components/FullWidthTabs";
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
    metro: "",
    cheked:false,
    // backButton: false,
    otherIncome:""
  });
  return (
    <div className="App">
      <h2 className="App__head">Tax calculator</h2>
      <DataContext.Provider value={{ tabValue, setTabValue, state, setState }}>
        <div className="Landing">
          <FullWidthTabs />
        </div>
      </DataContext.Provider>
    </div>
  );
}

export default App;
