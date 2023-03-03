import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";
export const Deduction = () => {
  // regex for validation
  const regex = /^[0-9\b]+$/;
  // context state
  const state = useContext(DataContext);
  // refs for input field
  const EightC = useRef();
  const EightD = useRef();
  const EightTta = useRef();
  const Rent = useRef();
  const yesInMetro = useRef();
  const NotInMetro = useRef();
  const [check, setCheck] = useState();
  // input value
  useEffect(() => {
    console.log(state.state);
    // if (state.state.backButton) {
    if (EightC.current.value === "") {
      EightC.current.value = state.state.eightyC;
    }
    if (EightD.current.value === "") {
      EightD.current.value = state.state.eightyD;
    }
    if (EightTta.current.value === "") {
      EightTta.current.value = state.state.eightyTta;
    }
    if (Rent.current.value === "") {
      Rent.current.value = state.state.rent;
    }
    // }
  }, []);
  // variables
  let hraEmption;
  let hrabyrent;
  let eightyC1;
  let eightyTta1;
  let eightyD1;
  let taxableAmount;
  let tax;
  let Newtax;
  // validation
  const eightyCHandler = () => {
    if (!regex.test(EightC.current.value)) {
      EightC.current.value = "";
    }
  };
  const eightyDHandler = () => {
    if (!regex.test(EightD.current.value)) {
      EightD.current.value = "";
    }
  };
  const eightyTtaHandler = () => {
    if (!regex.test(EightTta.current.value)) {
      EightTta.current.value = "";
    }
  };
  const rentHandler = () => {
    if (!regex.test(Rent.current.value)) {
      Rent.current.value = "";
    }
  };
  // calcuating Hra exemption
  const hraExamption = () => {
    const HraByEmp = state.state.Hra;
    hrabyrent =
      Rent.current.value - state.state.BasiceSalary * 0.1 > 0
        ? Rent.current.value - state.state.BasiceSalary * 0.1
        : 0;
    const halfOfSalary =
      yesInMetro.current.value === "yes"
        ? state.state.BasiceSalary * 0.5
        : NotInMetro.current.value === "no"
        ? state.state.BasiceSalary * 0.4
        : null;
    hraEmption =
      Math.min(HraByEmp, hrabyrent, halfOfSalary) > 0
        ? Math.min(HraByEmp, hrabyrent, halfOfSalary)
        : 0;
  };
  // Calculate handler
  const CalculateHandler = () => {
    if (
      EightC.current.value === "" ||
      EightD.current.value === "" ||
      EightTta.current.value === "" ||
      Rent.current.value === ""
    ) {
      state.setState({
        msg: "Please fill all the field and if not valid then write 0",
      });
    }
    state.setTabValue("3");
    eightyC1 = EightC.current.value > 150000 ? 150000 : EightC.current.value;
    eightyTta1 = EightTta.current.value > 8000 ? 8000 : EightTta.current.value;
    eightyD1 = EightD.current.value > 12000 ? 12000 : EightD.current.value;
    hraExamption();
    totalDeduction();
    taxableAmount =
      state.state.totalSalary - totalDeduction1 > 0
        ? state.state.totalSalary - totalDeduction1
        : 0;
    existingTax();
    newTax();
    state.setState({
      standardDeduction: 50000,
      eightyC: eightyC1,
      eightyTta: eightyTta1,
      eightyD: eightyD1,
      rent: Rent.current.value,
      BasiceSalary: state.state.BasiceSalary,
      Hra: state.state.Hra,
      otherAllowence: state.state.otherAllowence,
      lta: state.state.lta,
      HraByRent: hrabyrent,
      HraExmption: hraEmption,
      totalSalary: state.state.totalSalary,
      totalDeduction: totalDeduction1,
      taxableAmount: taxableAmount,
      newTax: Newtax,
      oldTax: tax,
    });
  };
  // Calculating total deduction
  let totalDeduction1;
  const totalDeduction = () => {
    totalDeduction1 =
      state.state.standardDeduction +
      parseInt(eightyC1) +
      parseInt(eightyD1) +
      parseInt(eightyTta1) +
      hraEmption;
  };
  // Calculaing taxable amount according to old tax regime
  const existingTax = () => {
    let taxableAmount1 = taxableAmount - 250000;
    if (taxableAmount1 <= 250000) {
      tax = 0;
    } else if (taxableAmount >= 250001 && taxableAmount1 <= 500000) {
      taxableAmount1 = taxableAmount1 - 250000;
      tax = taxableAmount1 * 0.05;
    } else if (taxableAmount >= 500001 && taxableAmount1 <= 1000000) {
      taxableAmount1 = taxableAmount1 - 500000;
      tax = taxableAmount1 * 0.2 + 12500;
    } else if (taxableAmount > 1000000) {
      taxableAmount1 = taxableAmount1 - 1000000;
      tax = taxableAmount1 * 0.3 + 112500;
    }
  };
  // Calculaing taxable amount according yo new tax regime
  const newTax = () => {
    let taxableAmount1 = taxableAmount - 250000;
    if (taxableAmount1 <= 250000) {
      Newtax = 0;
    } else if (taxableAmount1 >= 250001 && taxableAmount1 <= 500000) {
      taxableAmount1 = taxableAmount1 - 250000;
      Newtax = taxableAmount1 * 0.05;
    } else if (taxableAmount1 >= 500001 && taxableAmount1 <= 750000) {
      taxableAmount1 = taxableAmount1 - 500000;
      Newtax = taxableAmount1 * 0.1 + 12500;
    } else if (taxableAmount1 >= 750001 && taxableAmount1 <= 1000000) {
      taxableAmount1 = taxableAmount1 - 750000;
      Newtax = taxableAmount1 * 0.15 + 37500;
    } else if (taxableAmount1 >= 1000001 && taxableAmount1 <= 1250000) {
      taxableAmount1 = taxableAmount1 - 1000000;
      Newtax = taxableAmount1 * 0.2 + 75000;
    } else if (taxableAmount1 >= 1250001 && taxableAmount1 <= 1500000) {
      taxableAmount1 = taxableAmount1 - 1250000;
      Newtax = taxableAmount1 * 0.25 + 125000;
    } else if (taxableAmount1 > 1500000) {
      taxableAmount1 = taxableAmount1 - 1500000;
      Newtax = taxableAmount1 * 0.3 + 18500;
    }
  };
  // back handler
  const BackHandler = () => {
    eightyC1 = EightC.current.value > 150000 ? 150000 : EightC.current.value;
    eightyTta1 = EightTta.current.value > 8000 ? 8000 : EightTta.current.value;
    eightyD1 = EightD.current.value > 12000 ? 12000 : EightD.current.value;
    state.setTabValue("1");
    // tracking data at back button
    state.setState({
      backButton: true,
      standardDeduction: 50000,
      eightyC: eightyC1,
      eightyTta: eightyTta1,
      eightyD: eightyD1,
      rent: Rent.current.value,
      BasiceSalary: state.state.BasiceSalary,
      Hra: state.state.Hra,
      otherAllowence: state.state.otherAllowence,
      lta: state.state.lta,
      HraByRent: state.state.HraByRent,
      HraExmption: state.state.HraExmption,
      totalSalary: state.state.totalSalary,
      totalDeduction: state.state.totalDeduction,
      taxableAmount: state.state.taxableAmount,
      newTax: state.state.newTax,
      oldTax: state.state.oldTax,
      msg: "",
    });
  };
  return (
    <div>
      <div class="form-floating mt-4">
        <textarea
          class="form-control"
          style={{ resize: "none" }}
          placeholder="Standard deduction(50,000)"
          id="floatingTextarea"
          value={50000}
        ></textarea>
        <label for="floatingTextarea">Standard deduction(50,000)</label>
      </div>
      <div class="form-floating mt-4">
        <textarea
          class="form-control"
          style={{ resize: "none" }}
          placeholder="Enter 80C amount"
          id="floatingTextarea"
          ref={EightC}
          onChange={eightyCHandler}
        ></textarea>
        <label for="floatingTextarea">Enter 80C amount</label>
      </div>
      <div class="form-floating mt-4">
        <textarea
          class="form-control"
          style={{ resize: "none" }}
          placeholder="Enter 80D amount"
          id="floatingTextarea"
          ref={EightD}
          onChange={eightyDHandler}
        ></textarea>
        <label for="floatingTextarea">Enter 80D amount</label>{" "}
      </div>
      <div class="form-floating mt-4">
        <textarea
          class="form-control"
          style={{ resize: "none" }}
          placeholder="Enter 80TTA amount"
          id="floatingTextarea"
          ref={EightTta}
          onChange={eightyTtaHandler}
        ></textarea>
        <label for="floatingTextarea">Enter 80TTA amount</label>
      </div>
      <div class="form-floating mt-4">
        <textarea
          class="form-control"
          style={{ resize: "none" }}
          placeholder="Enter rent pay amount"
          id="floatingTextarea"
          ref={Rent}
          onChange={rentHandler}
        ></textarea>
        <label for="floatingTextarea">Enter rent pay amount</label>
      </div>
      {/* Radio button for metro area */}
      <div className="mt-5">
        <b className="mx-3">Do you live in metro?</b>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="yes"
            ref={yesInMetro}
          />
          <label class="form-check-label" for="inlineRadio1">
            Yes
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="no"
            ref={NotInMetro}
          />
          <label class="form-check-label" for="inlineRadio2">
            No
          </label>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-outline-success mt-3 button"
        style={{ float: "right" }}
        onClick={CalculateHandler}
      >
        Calculate
      </button>
      <button
        type="button"
        class="btn btn-outline-success mt-3 button"
        style={{ float: "left" }}
        onClick={BackHandler}
      >
        Back
      </button>
    </div>
  );
};
