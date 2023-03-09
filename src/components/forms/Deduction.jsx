import React, { useContext, useEffect, useRef} from "react";
import { DataContext } from "../../App";

export const Deduction = () => {
  // regex for validation
  const regex = /^[0-9\b]+$/;
  // context state 
  const state = useContext(DataContext);
  // refs for input field
  const EightyC = useRef();
  const EightyD = useRef();
  const EightyTta = useRef();
  const Rent = useRef();
  // input value
  useEffect(() => {
    if (EightyC.current.value === "") {
      EightyC.current.value = state.state.eightyC;
    }
    if (EightyD.current.value === "") {
      EightyD.current.value = state.state.eightyD;
    }
    if (EightyTta.current.value === "") {
      EightyTta.current.value = state.state.eightyTta;
    }
    if (Rent.current.value === "") {
      Rent.current.value = state.state.rent;
    }
  }, []);
  // validation
  const inputHandler = () => {
    if (!regex.test(EightyC.current.value)) {
      EightyC.current.value = "";
    } else if (!regex.test(EightyD.current.value)) {
      EightyD.current.value = "";
    } else if (!regex.test(EightyTta.current.value)) {
      EightyTta.current.value = "";
    } else if (!regex.test(Rent.current.value)) {
      Rent.current.value = "";
    }
  };
  let totalDeduction2;
  const metroHandler = (e) => {
    state.setState({
      ...state.state,
      metro: e.target.value,
    });
  };

  const CalculateHandler = () => {
    // validation
    if (
      EightyC.current.value === "" ||
      EightyD.current.value === "" ||
      EightyTta.current.value === "" ||
      Rent.current.value === "" ||
      state.state.metro === ""
    ) {
      state.setState({
        ...state.state,
        msg: "Please fill all the field and if not valid then write 0",
      });
    } else {
      // Changing tab value for navigating other page
      state.setTabValue("3");
      let salarybyMetro;
      // Checking that the user is living in metro city or not
      if (state.state.metro === "yes") {
        salarybyMetro = state.state.BasiceSalary * 0.5;
        state.setState({ ...state.state, metro: "yes" });
      } else if (state.state.metro === "no") {
        salarybyMetro = state.state.BasiceSalary * 0.4;
        state.setState({ ...state.state, metro: "no" });
      }
      let hraByRent =
          Rent.current.value - state.state.BasiceSalary * 0.1 > 0
            ? Rent.current.value - state.state.BasiceSalary * 0.1
            : 0,
        hraexmption1 =
          Math.min(
            parseInt(state.state.Hra),
            parseInt(hraByRent),
            parseInt(salarybyMetro)
          ) > 0
            ? Math.min(
                parseInt(state.state.Hra),
                parseInt(hraByRent),
                parseInt(salarybyMetro)
              )
            : 0;
      // validation for 80C,80D and for 80TTA
      let v1, v2, v3;
      v1 =
        EightyC.current.value > 150000
          ? 150000
          : parseInt(EightyC.current.value);
      v2 =
        EightyD.current.value > 12000 ? 12000 : parseInt(EightyD.current.value);
      v3 =
        EightyTta.current.value > 8000
          ? 8000
          : parseInt(EightyTta.current.value);
      totalDeduction2 =
        parseInt(state.state.standardDeduction) + v1 + v2 + v3 + hraexmption1;
      // calling existing tax
      existingTax();
      // calling new tax
      newTax();
      // setting all state data here..
      state.setState({
        ...state.state,
        rent: Rent.current.value,
        msg: "",
        eightyC: v1,
        eightyD: v2,
        eightyTta: v3,
        // Here i am calculating hra by rent
        HraByRent:
          Rent.current.value - state.state.BasiceSalary * 0.1 > 0
            ? Rent.current.value - state.state.BasiceSalary * 0.1
            : 0,
        // setting hra Exmption
        HraExmption: hraexmption1,
        totalDeduction: totalDeduction2,
        // calculating taxable amount
        taxableAmount:
          state.state.totalSalary - totalDeduction2 > 0
            ? state.state.totalSalary - totalDeduction2
            : 0,
        newTax: Newtax,
        oldTax: tax,
      });
    }
  };

  let tax, Newtax;
  // Calculaing taxable amount according to old tax regime
  const existingTax = () => {
    let taxamount =
      state.state.totalSalary - totalDeduction2 > 0
        ? state.state.totalSalary - totalDeduction2
        : 0;
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
    }
  };
  // Calculating taxable amount according to new tax regime
  const newTax = () => {
    let taxamount =
      state.state.totalSalary - totalDeduction2 > 0
        ? state.state.totalSalary - totalDeduction2
        : 0;
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
  // Back button handler
  const BackHandler = () => {
    state.setTabValue("1");
  };
  // close validation msg
  const CloseHandler = () => {
    state.setState({ msg: "" });
  };
  return (
    <div>
      {" "}
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
            ref={EightyC}
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
            ref={EightyD}
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
            ref={EightyTta}
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
              onChange={metroHandler}
              // checked
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
              onChange={metroHandler}
              // checked={state.state.checked}
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
    </div>
  );
};
