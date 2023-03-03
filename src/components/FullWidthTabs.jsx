import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Income } from "./forms/Income";
import { Deduction } from "./forms/Deduction";
import { TaxSummary } from "./TaxSummary";
import { DataContext } from "../App";
export default function FullWidthTabs() {
  const StateValue = useContext(DataContext);
  // const handleChange = (event, newValue) => {
  //   if (StateValue.tabValue === "1") {
  //     if (
  //       StateValue.state.BasiceSalary === "" ||
  //       StateValue.state.Hra === "" ||
  //       StateValue.state.otherAllowence === "" ||
  //       StateValue.state.lta === ""
  //     ) {
  //       alert("validate")
  //       StateValue.setState({
  //         msg: "Please fill all the field",
  //         BasiceSalary: StateValue.state.BasiceSalary,
  //         Hra: StateValue.state.Hra,
  //         otherAllowence: StateValue.state.otherAllowence,
  //         lta: StateValue.state.lta,
  //       });
  //     } else {
  //       alert("chnge");
  //       console.log(StateValue.state.BasiceSalary);
  //       console.log(StateValue.state);
  //       StateValue.setTabValue(newValue);
  //     }
  //   }
  // };
  const handleChange = () => {
    StateValue.setState({ msg: "Please click next to go next page" });
  };
  console.log(StateValue.state.msg);
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={StateValue.tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="INCOME" value="1" disabled/>
            <Tab label="DEDUCTION" value="2" disabled/>
            <Tab label="SUMMARY" value="3" disabled/>
          </TabList>
        </Box>
        <TabPanel value="1">{<Income />}</TabPanel>
        <TabPanel value="2">{<Deduction />}</TabPanel>
        <TabPanel value="3">{<TaxSummary />}</TabPanel>
      </TabContext>
    </Box>
  );
}
