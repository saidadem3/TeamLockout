import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";

import avatar from "assets/img/faces/marc.jpg";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class LogoutDashboard extends React.Component {
  state = {
    value: 0,
    loggedIn: 0
  };
  handleLogoutClick = (event, value) => {
    console.log("logout");

    localStorage.removeItem("user");
    //ADD DATABASE FUNCTION TO SET DATA CHANGED IN USER JSON!!! &&&&*****
    this.setState({ value: 1 });
    console.log("Logged out rerender sidebar " + value);
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: "Signed out",
        level: 0
      })
    );
    window.location.reload();
  };

  handleChange = (event, value) => {
    console.log("handlechange: " + event.target.value);
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
    console.log("handlechangeindex: " + index);
  };

  render() {
    const { classes } = this.props;
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.level != 0)
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={10}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Logout User</h4>
                  <p className={classes.cardCategoryWhite}>
                    Logout of your account don't forget to do this!
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText={"UserName: " + user.username}
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                          disabled: true,
                          onChange: event => this.handleChange(event),
                          type: "text"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText={"Email Address: " + user.emailAddress}
                        id="emailAddress"
                        formControlProps={{
                          fullWidth: true,
                          disabled: true,

                          onChange: event => this.handleChange(event),
                          type: "text"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText={"User Id: " + user.userId}
                        id="userId"
                        formControlProps={{
                          fullWidth: true,
                          disabled: true,
                          onChange: event => this.handleChange(event),
                          type: "text"
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText={"First name: " + user.firstName}
                        id="firstName"
                        formControlProps={{
                          fullWidth: true,
                          disabled: true,
                          onChange: event => this.handleChange(event),
                          type: "text"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText={"Last name: " + user.lastName}
                        id="lastName"
                        formControlProps={{
                          fullWidth: true,
                          disabled: true,
                          onChange: event => this.handleChange(event),
                          type: "text"
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  {/*}  <Button color="primary" onClick={this.myClick}>Login</Button>*/}
                  <Button
                    color="primary"
                    handleLogoutClick={event =>
                      this.handleLogoutClick(event, !this.value)
                    }
                  >
                    Click to Logout
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      );
    else return <div>You are not logged in: {user.username}</div>;
  }
}

LogoutDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(LogoutDashboard);
