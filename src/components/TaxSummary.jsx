import React, { useContext } from "react";
import { DataContext } from "../App";
import "../App.css";
export const TaxSummary = () => {
  const contextData = useContext(DataContext);
  // Back button handler
  const BackHandler = () => {
    contextData.setTabValue("2");
    // tracking data at back button
    contextData.setState({
      ...contextData.state,
      backButton: true,
    });
  };
  // reset button function
  const ResetHandler = () => {
    window.location.reload();
  };
  return (
    <div>
      <table class="table table-hover table-striped summary">
        <thead>
          <tr>
            <th scope="col" colspan="2">
              Nature
            </th>
            <th scope="col">Amount</th>
            <th scope="col">total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" colspan="2">
              Income From Salary
            </th>
            <td>{contextData.state.BasiceSalary}</td>
            <td>{contextData.state.BasiceSalary}</td>
          </tr>
          <tr>
            <th scope="row" colspan="2">
              Other Allowence
            </th>
            <td>{contextData.state.otherAllowence}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" colspan="2">
              Gross total income
            </th>
            <td></td>
            <td>{contextData.state.totalSalary}</td>
          </tr>
          <tr>
            <th scope="row" colspan="2">
              Deduction
            </th>
            <td></td>
            <td>{contextData.state.totalDeduction}</td>
          </tr>
          <tr>
            <th scope="row" colspan="2">
              80C
            </th>
            <td>{contextData.state.eightyC}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" colspan="2">
              80D
            </th>
            <td>{contextData.state.eightyD}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" colspan="2">
              80TTA
            </th>
            <td>{contextData.state.eightyTta}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Gross taxable income</th>
            <td colspan="2">{contextData.state.taxableAmount}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" colspan="2">
              New Tax
            </th>
            <td></td>

            <td>{contextData.state.newTax}</td>
          </tr>
          <tr>
            <th scope="row" colspan="2">
              Existing tax
            </th>
            <td></td>
            <td>{contextData.state.oldTax}</td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        class="btn btn-outline-success mt-3 button"
        style={{ float: "right" }}
        onClick={ResetHandler}
      >
        Reset
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
