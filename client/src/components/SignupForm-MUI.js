import React from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,

} from "@material-ui/core";
import "./Signup-MUI.css";

import { Redirect } from "react-router-dom";

class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      redirectTo: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //request to server to add a new username/password
    axios
      .post("/api/user/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");

          this.setState({
            //redirect to search page

            redirectTo: "/search",
          });
         
        } else {
          console.log("username already taken");
          this.setState({
            //redirect to login page
            redirectTo: "/login",
          });
        }
      })
      .catch((error) => {
        console.log("signup error: ");
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <Grid container spacing={0} justify="center" direction="colomn">
            <Grid item   lg={3}>
              <Grid
                container
                direction="column"
                justify="center"
                spacing={2}
                className="login-form"
              >
                <Paper elevation={5} className="login-background">
                  <Grid item >
                    <Typography className="typography" variant="h3">
                      Sign up
                    </Typography>
                  </Grid>
                  <Grid item>
                    <form>
                      <Grid container direction="column" spacing={2}>
                        <Grid  item>
                          <TextField
                            type="email"
                            placeholder="Email"
                            fullWidth
                            name="username"
                            // variant="outlined"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                            autoFocus
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            type="password"
                            placeholder="Password"
                            fullWidth
                            name="password"
                            // variant="outlined"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="button-block"
                            onClick={this.handleSubmit}
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                 
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}
export default SignupForm;
