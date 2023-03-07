import React, { useContext, useEffect, useRef } from "react";
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
  // input value
  useEffect(() => {
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
  }, []);

  // validation
  const inputHandler = () => {
    if (!regex.test(EightC.current.value)) {
      EightC.current.value = "";
    } else if (!regex.test(EightD.current.value)) {
      EightD.current.value = "";
    } else if (!regex.test(EightTta.current.value)) {
      EightTta.current.value = "";
    } else if (!regex.test(Rent.current.value)) {
      Rent.current.value = "";
    }
  };

  const yesHandler = (e) => {
    state.setState({ ...state.state, metro: e.target.value });
  };
  // variables
  let hraEmption;
  let hrabyrent;
  let eightyC1;
  let eightyTta1;
  let eightyD1;
  let taxableAmount1;
  let tax;
  let Newtax;
  // calculating Hra exemption
  const hraExamption = () => {
    const HraByEmp = state.state.Hra;
    hrabyrent =
      Rent.current.value - state.state.BasiceSalary * 0.1 > 0
        ? Rent.current.value - state.state.BasiceSalary * 0.1
        : 0;
    let halfOfSalary;
    if (state.state.metro === "yes") {
      halfOfSalary = state.state.BasiceSalary * 0.5;
    } else if (state.state.metro === "no") {
      halfOfSalary = state.state.BasiceSalary * 0.4;
    }
    hraEmption =
      Math.min(HraByEmp, hrabyrent, halfOfSalary) > 0
        ? Math.min(HraByEmp, hrabyrent, halfOfSalary)
        : 0;
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
    // state.setState({ ...state.state, totalDeduction: totalDeduction1 });
    console.log(totalDeduction1);
  };
  // Calculate handler
  const CalculateHandler = () => {
    if (
      EightC.current.value === "" ||
      EightD.current.value === "" ||
      EightTta.current.value === "" ||
      Rent.current.value === "" ||
      state.state.metro === ""
    ) {
      state.setState({
        ...state.state,
        msg: "Please fill all the field and if not valid then write 0",
      });
    } else {
      state.setTabValue("3");
      eightyC1 = EightC.current.value > 150000 ? 150000 : EightC.current.value;
      eightyTta1 =
        EightTta.current.value > 8000 ? 8000 : EightTta.current.value;
      eightyD1 = EightD.current.value > 12000 ? 12000 : EightD.current.value;
      hraExamption();
      totalDeduction();
      console.log(state.state.totalSalary - state.state.totalDeduction);
      taxableAmount1 =
        state.state.totalSalary - state.state.totalDeduction > 0
          ? state.state.totalSalary - state.state.totalDeduction
          : 0;
      console.log(taxableAmount1);
      // state.setState({...state.state, })
      existingTax();
      newTax();
      state.setState({
        ...state.state,
        standardDeduction: 50000,
        eightyC: eightyC1,
        eightyTta: eightyTta1,
        eightyD: eightyD1,
        rent: Rent.current.value,
        taxableAmount: taxableAmount1,
        HraByRent: hrabyrent,
        HraExmption: hraEmption,
        totalDeduction: totalDeduction1,
        newTax: Newtax,
        oldTax: tax,
      });
    }
  };
  console.log(state.state);

  // Calculaing taxable amount according to old tax regime
  const existingTax = () => {
    let taxamount = taxableAmount1;
    if (taxamount <= 250000) {
      tax = 0;
    } else if (taxamount >= 250001 && taxamount <= 500000) {
      taxamount = taxamount - 250000;
      tax = taxamount * 0.05;
    } else if (taxamount >= 500001 && taxamount <= 1000000) {
      taxamount = taxamount - 500000;
      tax = taxamount * 0.2 + 12500;
    } else if (taxamount > 1000000) {
      taxamount = taxamount - 1000000;
      tax = taxamount * 0.3 + 112500;
      console.log(taxamount);
    }
  };
  // Calculating taxable amount according to new tax regime
  const newTax = () => {
    let taxamount = taxableAmount1;
    if (taxamount <= 250000) {
      Newtax = 0;
    } else if (taxamount >= 250001 && taxamount <= 500000) {
      taxamount = taxamount - 250000;
      Newtax = taxamount * 0.05;
    } else if (taxamount >= 500001 && taxamount <= 750000) {
      taxamount = taxamount - 500000;
      Newtax = taxamount * 0.1 + 12500;
    } else if (taxamount >= 750001 && taxamount <= 1000000) {
      taxamount = taxamount - 750000;
      Newtax = taxamount * 0.15 + 37500;
    } else if (taxamount >= 1000001 && taxamount <= 1250000) {
      taxamount = taxamount - 1000000;
      Newtax = taxamount * 0.2 + 75000;
    } else if (taxamount >= 1250001 && taxamount <= 1500000) {
      taxamount = taxamount - 1250000;
      Newtax = taxamount * 0.25 + 125000;
    } else if (taxamount > 1500000) {
      taxamount = taxamount - 1500000;
      Newtax = taxamount * 0.3 + 187500;
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
      ...state.state,
      backButton: true,
      standardDeduction: 50000,
      eightyC: eightyC1,
      eightyTta: eightyTta1,
      eightyD: eightyD1,
      rent: Rent.current.value,
    });
  };
  // close validation msg
  const CloseHandler = () => {
    state.setState({ msg: "" });
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
          onChange={inputHandler}
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
          onChange={inputHandler}
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
          onChange={inputHandler}
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
          onChange={inputHandler}
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
            onChange={yesHandler}
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
            id="inlineRadio1"
            value="no"
            onChange={yesHandler}
          />
          <label class="form-check-label" for="inlineRadio2">
            No
          </label>
        </div>
      </div>
      {state.state.msg === "" ? (
        ""
      ) : (
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>{state.state.msg}</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={CloseHandler}
          ></button>
        </div>
      )}
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
