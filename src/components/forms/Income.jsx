import React, { useContext, useEffect, useRef } from "react";
import { DataContext } from "../../App";
export const Income = () => {
  // refs for input field
  const basicSalary = useRef();
  const hra = useRef();
  const otherAllowence = useRef();
  const lta = useRef();
  const state = useContext(DataContext);
  // regex for validation
  const regex = /^[0-9\b]+$/;
  useEffect(() => {
    if (basicSalary.current.value === "") {
      basicSalary.current.value = state.state.BasiceSalary;
    }
    if (hra.current.value === "") {
      hra.current.value = state.state.Hra;
    }
    if (otherAllowence.current.value === "") {
      otherAllowence.current.value = state.state.otherAllowence;
    }
    if (lta.current.value === "") {
      lta.current.value = state.state.lta;
    }
  }, []);
  // input field validation
  const inputHandler = () => {
    if (!regex.test(basicSalary.current.value)) {
      basicSalary.current.value = "";
    } else if (!regex.test(hra.current.value)) {
      hra.current.value = "";
    } else if (!regex.test(otherAllowence.current.value)) {
      otherAllowence.current.value = "";
    } else if (!regex.test(lta.current.value)) {
      lta.current.value = "";
    }
  };
  // calculating total salary
  let totalSalary;
  let otherIncome;
  const totalIncome = () => {
    otherIncome =
      parseInt(hra.current.value) +
      parseInt(lta.current.value) +
      parseInt(otherAllowence.current.value);
    totalSalary =
      parseInt(basicSalary.current.value) +
      parseInt(hra.current.value) +
      parseInt(lta.current.value) +
      parseInt(otherAllowence.current.value);
  };
  console.log("Income", state.state);
  // next button handler
  const NextHandler = () => {
    if (
      basicSalary.current.value === "" ||
      hra.current.value === "" ||
      otherAllowence.current.value === "" ||
      lta.current.value === ""
    ) {
      state.setState({
        ...state.state,
        msg: "Please fill all the field and if not valid then write 0",
      });
    } else {
      state.setTabValue("2");
      totalIncome();
      state.setState({
        ...state.state,
        BasiceSalary: basicSalary.current.value,
        Hra: hra.current.value,
        otherAllowence: otherAllowence.current.value,
        lta: lta.current.value,
        standardDeduction: 50000,
        totalSalary: totalSalary,
        msg: "",
        otherIncome: otherIncome,
      });
    }
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
          placeholder="Enter your basic salary"
          id="floatingTextarea"
          ref={basicSalary}
          onChange={inputHandler}
        ></textarea>
        <label for="floatingTextarea">Enter your basic salary</label>
      </div>
      <div class="form-floating mt-4">
        <textarea
          class="form-control"
          style={{ resize: "none" }}
          placeholder="HRA"
          id="floatingTextarea"
          ref={hra}
          onChange={inputHandler}
        ></textarea>
        <label for="floatingTextarea">HRA</label>
      </div>
      <div class="form-floating mt-4">
        <textarea
          class="form-control"
          style={{ resize: "none" }}
          placeholder="Any other allowence"
          id="floatingTextarea"
          ref={otherAllowence}
          onChange={inputHandler}
        ></textarea>
        <label for="floatingTextarea">Any other allowence</label>{" "}
      </div>
      <div class="form-floating mt-4 mb-4">
        <textarea
          style={{ resize: "none" }}
          class="form-control"
          placeholder="LTA"
          id="floatingTextarea"
          ref={lta}
          onChange={inputHandler}
        ></textarea>
        <label for="floatingTextarea">LTA</label>
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
        onClick={NextHandler}
      >
        Next
      </button>
    </div>
  );
};
