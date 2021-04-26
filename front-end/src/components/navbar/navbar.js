import React, { Component } from 'react'
import { withRouter } from "react-router"
import './navbar.css'
import { Row, Col } from 'reactstrap';
import home_page from '../../images/home-page.png'
import reddit_logo from '../../images/reddit-logo-vector.svg'
import Modal from 'react-bootstrap/Modal'
import loginAction from '../../actions/loginAction'
import signUpAction from '../../actions/signupAction'
import { connect } from "react-redux";
import cookie from "react-cookies";
import { Link } from 'react-router-dom';
import login from '../../images/login.png'



class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginemail: "",
            loginpassword: "",
            loginButton: false,
            signupname: "",
            error: false,
            signupemail: "",
            signuppassword: "",
            signupButton: false,
            signUpBackendError: false,
            loginBackendError: false
        }
    }

    handleOtherChange = inp => {
        this.setState({
            error: false,
            [inp.target.name]: inp.target.value,
        })
    }

    handleEmailChange = inp => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inp.target.value)) {
            this.setState({
                error: false,
                [inp.target.name]: inp.target.value,
                errorMessage: " "
            })
        } else {
            this.setState({
                error: true,
                errorMessage: "Please correct email",
                [inp.target.name]: ""
            })
        }
    }
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        if (/[~`!#$@%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(inp.target.value)) {
            this.setState({
                error: true,
                errorMessage: "Special characters not allowed",
                [inp.target.name]: ""
            })
        } else {
            this.setState({
                error: false,
                [inp.target.name]: inp.target.value,
                errorMessage: " "

            })
        }
    }
    loginButtonClick = (e) => {
        this.setState({
            loginButton: !this.state.loginButton
        })
    }

    mutualButtonCLick = (e) => {
        this.setState({
            loginButton: !this.state.loginButton,
            signupButton: !this.state.signupButton

        })
    }

    handleSignUpSubmit = (e) => {


        let signUpObject = {
            name: this.state.signupname,
            email: this.state.signupemail,
            password: this.state.signuppassword
        }
        e.preventDefault();
        if (!this.state.error) {
            this.props.signUpAction(signUpObject).then(response => {
                if (this.props.signUpError) {
                    this.setState({
                        signUpBackendError: true
                    })
                }
            })
        };
    }



    handleLoginSubmit = (e) => {

        let loginObject = {
            email: this.state.loginemail,
            password: this.state.loginpassword,
        }
        if (!this.state.error) {
            this.props.loginAction(loginObject).then(response => {
                if (this.props.loginError) {
                    this.setState({
                        loginBackendError: true
                    })
                }
            })
        };


    }


    signupButtonClick = (e) => {
        this.setState({
            signupButton: !this.state.signupButton

        })
    }
    render() {
        let invalidLoginError = null
        let invalidSignUpError = null

        if (this.state.loginBackendError) {
            invalidLoginError = <div style={{ 'color': 'red' }}>{this.props.loginMessage}</div>
        }
        if (this.state.signUpBackendError) {
            invalidSignUpError = <div style={{ 'color': 'red' }}>{this.props.signUpMessage}</div>
        }
        if (!cookie.load('token')) {
            console.log("token found")
            return(
                <div className="manual-container">
                        <div class="row">

                        </div>
                        <div className="row" >
                            <div className="col-2">
                                <Link to="/"><img src={reddit_logo} className="logo-image" alt="reddit-logo" /></Link>
                            </div>
                            <div className="col-2 nav-icon-div">
                                <Link to="/"><i class="fas fa-chart-line nav-icon-button" style={{marginRight:"10px"}} ></i></Link>
                                <Link to="/"><i class="fas fa-chart-bar nav-icon-button"></i></Link>
                            </div>
                            <div className="col-4">
                                <div className="form-group has-search">
                                    <span class="form-control-feedback">
                                        <svg viewBox="-1 0 15 15" fill="none" className="navbar-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M14.5 14.5l-4-4m-4 2a6 6 0 110-12 6 6 0 010 12z" stroke="#6a6b6a"></path></svg>
                                    </span>
                                    <input type="text" style={{ backgroundColor: "#eaeef3", border: "none" }} class="form-control" placeholder="Search">
                                    </input>
                                </div>
                            </div>
                            < div className="col-2 nav-icon-div" style={{paddingRight:"0px"}}>
                                <Link to="/"><i class="fas fa-comment-dots nav-icon-button" style={{marginRight:"10px"}} ></i></Link>
                                <Link to="/"><i class="fas fa-bell nav-icon-button" style={{marginRight:"10px"}} ></i></Link>
                            </div>
                                {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}> */}
                                <div className="col-2" style={{textAlign:"right"}} style={{paddingLeft:"0px"}}>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle navbar-dropdown-button" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="/logo192.png" alt="Avatar" class="nav-avatar"/>  <span class="nav-username">Username</span>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button className="dropdown-item" type="button" onClick={ this.dropDownClick } value="home"><i class="fas fa-home dd-icon"></i><span className="dd-item">Home</span></button>
                                        <button className="dropdown-item" type="button" onClick={ this.dropDownClick } value="mycommunities"><i class="fas fa-users dd-icon"></i><span className="dd-item">My Communities</span></button>
                                        <button className="dropdown-item" type="button" onClick={ this.dropDownClick } value="profile"><i class="fas fa-id-badge dd-icon"/><span className="dd-item">Profile</span></button>
                                        <button className="dropdown-item" type="button" onClick={ this.dropDownClick } value="logout"><i class="fas fa-sign-out-alt dd-icon"></i><span className="dd-item">Logout</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        } else {
            console.log("token not found")
            return (
                <div >
                    <div className="manual-container">
                        <div class="row">

                        </div>
                        <div className="row">
                            <div className="col-3">
                                <Link to="/"><img src={reddit_logo} className="logo-image" alt="reddit-logo" /></Link>
                            </div>
                            <div className="col-6">
                                <div className="form-group has-search">
                                    <span class="form-control-feedback">
                                        <svg viewBox="-1 0 15 15" fill="none" className="navbar-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M14.5 14.5l-4-4m-4 2a6 6 0 110-12 6 6 0 010 12z" stroke="#6a6b6a"></path></svg>
                                    </span>
                                    <input type="text" style={{ backgroundColor: "#eaeef3", border: "none" }} class="form-control" placeholder="Search">
                                    </input>
                                </div>
                            </div>

                            <div className="col-2" style={{ marginLeft: "6%" }}>
                                <button type="button" id="login-button" style={{ borderColor: "#0079d3", color: "#0079d3", borderRadius: "60px" }} class="btn btn-outline-primary" onClick={this.loginButtonClick}><span style={{ fontSize: "16px", fontWeight: "300px" }}><strong>Log In</strong></span></button>
                                <button type="button" style={{ borderColor: "#0079d3", color: "white", borderRadius: "60px", marginLeft: "10%" }} class="btn btn-primary" onClick={this.signupButtonClick}><span style={{ fontSize: "16px", fontWeight: "300px" }}><strong>Sign Up</strong></span></button>

                            </div>
                        </div>
                    </div>

                    {/* LOGIN MODAL */}
                    <Modal
                        size="lg"
                        show={this.state.loginButton}
                        onHide={this.loginButtonClick}
                        dialogClassName="modal-1000w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body className="show-grid" style={{ height: "600px" }}>
                            <Row>
                                <Col lg="3" style={{ marginTop: "-9%", marginLeft: "-2%", height: "100%" }}>
                                    <img src={login} height="660px" alt="reddit-logo" />

                                </Col>
                                <Col>

                                    <Row>
                                        <div style={{ fontFamily: "IBMPlexSans", fontSize: "18px" }}>
                                            <strong>Login</strong>
                                        </div>
                                    </Row>
                                    <Row>
                                        <span></span>
                                    </Row>
                                    <Row>
                                        <div style={{ fontSize: "12px", fontFamily: "sans-serif", marginTop: "2%" }}>
                                            By continuing , you agree to our{' '}
                                            <a target="_blank" href="https://www.redditinc.com/policies/user-agreement">User Agreement{' '}</a>
                                        and{' '}
                                            <a target="_blank" href="https://www.redditinc.com/policies/user-agreement">Privacy Policy.{' '}</a>
                                        </div>

                                    </Row>
                                    <div style={{ width: "40%", marginTop: "10%" }}>
                                        <Row>
                                            <button type="button" class="btn btn-outline-primary" style={{ width: "100%" }}>
                                                <div style={{ marginLeft: "-20%" }}>
                                                    <img width="20px" alt="Google sign-in" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"} />
                                                    <span style={{ marginLeft: "6%", fontSize: "12px" }}><strong>CONTINUE WITH GOOGLE</strong></span>

                                                </div>

                                            </button>

                                        </Row>

                                        <Row style={{ marginTop: "10%" }}>
                                            <button type="button" class="btn btn-outline-primary" style={{ width: "100%" }}>
                                                <div style={{ marginLeft: "-20%" }}>
                                                    <img width="20px" alt="Google sign-in" src={"data:image/png;base64,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"} />
                                                    <span style={{ marginLeft: "6%", fontSize: "12px" }}><strong>CONTINUE WITH APPLE</strong></span>

                                                </div>

                                            </button>
                                        </Row>

                                        <Row style={{ marginTop: "10%" }}>
                                            <button type="button" class="btn btn-outline-primary" style={{ width: "100%" }}>
                                                <div style={{ marginLeft: "-20%" }}>
                                                    <img width="20px" alt="Google sign-in" src={"data:image/jpeg;base64,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"} />
                                                    <span style={{ marginLeft: "6%", fontSize: "12px" }}><strong>CONTINUE WITH GMAIL</strong></span>

                                                </div>

                                            </button>
                                        </Row>

                                        <div className="Sso__divider m-small-margin">
                                            <div className="Sso__dividerLine">

                                            </div>
                                            <div className="Sso__dividerText">
                                                or
                                        </div>
                                            <div className="Sso__dividerLine">

                                            </div>
                                        </div>
                                        <Row>
                                            <input type="text" style={{ width: "100%" }} name="loginemail" onChange={this.handleEmailChange} placeholder="EMAIL" autoFocus required />

                                            <input type="text" style={{ width: "100%", marginTop: "10%" }} name="loginpassword" placeholder="PASSWORD" onChange={this.handleOtherChange} required />
                                            <button type="button" id="login-button" style={{ backgroundColor: "#0079d3", color: "white", borderRadius: "60px", width: "100%", marginTop: "10%" }} class="btn btn-outline-primary" onClick={this.handleLoginSubmit}><span style={{ fontSize: "16px", fontWeight: "300px" }}><strong>Log In</strong></span></button>
                                            <div style={{ marginTop: "3%", fontSize: "12px" }}>
                                                Forgot your <a target="_blank" href="/">username</a> or <a target="_blank" href="/">password</a>?
                                        </div>
                                            <div style={{ marginTop: "3%", fontSize: "12px" }}>
                                                New to Reddit? <strong><span ><button style={{ color: "#0079d3", fontWeight: "700", textTransform: "uppercase", border: "none", backgroundColor: "white" }} onClick={this.mutualButtonCLick}><bold>Sign Up</bold></button ></span></strong>
                                            </div>
                                            {invalidLoginError}
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>





                    {/* SIGN UP MODAL */}
                    <Modal
                        size="lg"
                        show={this.state.signupButton}
                        onHide={this.signupButtonClick}
                        dialogClassName="modal-1000w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body className="show-grid" style={{ height: "600px" }}>
                            <Row>
                                <Col lg="3" style={{ marginTop: "-9%", marginLeft: "-2%", height: "100%" }}>
                                    <img src={login} height="660px" alt="reddit-logo" />

                                </Col>
                                <Col>

                                    <Row>
                                        <div style={{ fontFamily: "IBMPlexSans", fontSize: "18px" }}>
                                            <strong>Sign Up</strong>
                                        </div>
                                    </Row>
                                    <Row>
                                        <span></span>
                                    </Row>
                                    <Row>
                                        <div style={{ fontSize: "12px", fontFamily: "sans-serif", marginTop: "2%" }}>
                                            By continuing , you agree to our{' '}
                                            <a target="_blank" href="https://www.redditinc.com/policies/user-agreement">User Agreement{' '}</a>
                                        and{' '}
                                            <a target="_blank" href="https://www.redditinc.com/policies/user-agreement">Privacy Policy.{' '}</a>
                                        </div>

                                    </Row>
                                    <div style={{ width: "40%", marginTop: "10%" }}>
                                        <Row>
                                            <button type="button" class="btn btn-outline-primary" style={{ width: "100%" }}>
                                                <div style={{ marginLeft: "-20%" }}>
                                                    <img width="20px" alt="Google sign-in" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"} />
                                                    <span style={{ marginLeft: "6%", fontSize: "12px" }}><strong>CONTINUE WITH GOOGLE</strong></span>

                                                </div>

                                            </button>

                                        </Row>

                                        <Row style={{ marginTop: "10%" }}>
                                            <button type="button" class="btn btn-outline-primary" style={{ width: "100%" }}>
                                                <div style={{ marginLeft: "-20%" }}>
                                                    <img width="20px" alt="Google sign-in" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAAD1CAMAAAAvfDqYAAAAgVBMVEUAAAD////m5ub4+PjOzs7g4ODExMTW1taMjIyPj497e3tLS0ucnJz6+vrp6emhoaHHx8evr68sLCxubm5eXl7x8fE/Pz9YWFi3t7fY2NhpaWlISEi+vr4lJSWnp6caGhoQEBCDg4M1NTV2dnY4ODgLCwsfHx9bW1tSUlJkZGRCQkJAhmzRAAAI1UlEQVR4nN2d6WKyOhCGg6KidautVVtrQW2r5/4v8FRxAZLMTAImme/9b5JHQpbZEFGAWi377x9iavFL0fhYairu70WuZ4tfh4Uz3Ym7NhYNBITTSkRJQ4s2gsGJD6KivkUrgeCsZ1UYxjjdTxmG7WTr/KeC4boUDNQwPBfqrg5GcNxGX/Q0YmXRnlecTgrQiLlFiz5xlhCMsBqZR5wMpnmyadMfzhGmEZlNo95wpDNNVWubVn3hfGA0YmzTrCecBUrzZdWuHxxou6nz6vjB6eM0IrZq2QfOmkBjOS4POC0KzcCubQ84XxQcmwNb5AOHsAwIMbNs3DkO6cWxuuuc5BqnTaKxHpVrnHcSjY2Z4CzHOPFjH45rnB8SzcS6fbc4GxJNat+BWxzaVOvW6KC5seIakmgONXpwikN7ODYmj1sPjY0VF+3NsTF+3uQSJ330VHOKMyU9nHatPhzivFJo7G5tN7nDIZ3WbHw6RbnDeSbQvNbtxB0OalgTYlu7E2c4hLn2XW8ZOMkZDuDIucrKUFiWMxzEwP6nVgO9OMNRuKbL6jTRiyuckRMaZzi9x783J7nCgXedWf01LZcrnASi+W2sG1c4kAWn7smmIFc4gHuq5qmzJFc4WhPO66jJblzh6GisPKBAN802p+9HqazxbppuUNePQu8NbTbFbhpvUdOPpEETZzSpmwe0qeynrO2m0RXg3s1DWpX1VmB5mjziwZzlCie3e8x+s+feI7upgTNv9abd7nTV3AvdXi37u8P27Dz9fDtmk/XK8DBng9OON9mh6LBNF8m6LtRq8672ARu1bYozXw+UYbWndffZFqkzwYJaXpY0y7URTmu4h3v9SczfjBi/dp81GxJueHSc9mZL6nZgcqSMd3iDBaIJ9oyoOB1SOMBFCe2m3AEvQWod4cdPw4mfDHvF/8f5BDWGqLWHnHMUnN4b3omsw1LfYvsZD8/Ta6aPsMZxxngonU4vyj9ytLRv8aIP3WxGcSzmd4loXT6ctZe/dVnOyqxwiGENoBab63/ZmdSZYxUpF1AYx2gZhbRIJkMs0thUqgcE4cAx9f41k1dPAIfmaPYqacLpcUz2TW+qxr3pcEZWe417VUyOGpx56nucVGUEHFIwbSAaoDicaMrPR4XDi6YUzafAmfsenrG6AM4o9T06c7X0OMj9OUilWhwWu6ekVw0Og5ONUrESp+N7WHbaXq8gFZzU98CsdA+KL+OwfHE+CzftEg4tvDEw7YoEJRzfI7NR2V5UxNFWDghYFZNOAYfhqiYFvxRwGrSyOJKcZX7HoWVxhSRFKM8dJ/U9OlOpApNuOJS44KCkjO6/4fgenaneVDQ3HG4PJ1XHJVxxSKm2AUkTmXDBIUQ5ByVdoNUFx9S75lnaBPMch5nt5lNHc8Gp6ZNyLb0nOcfxPT4zZVqaHKcJH5tD6WlynMacbE4EeMRzHN8DNJJ+Hbjg8JprYArzCYcY4xOGwIdzxtFFdAUpuGyG4OYxAGlOOEjVt7CUoTisDDhIaJkgZKUFJHghOOEQS72EISzVR6BZaUEJq9UkeHl0EJo/HE4rwRHH0RToDVJo4QzB6vyJRmkLVgsbmiUjOPkN8PJGgpPHbYHjcDJ/ZjgOrVBSGMIrgwlONinISnDB4eR7x8uhC1IxnkCEJwcJTtZpPI9GcIr3wvMzBSe7B55bJ1LfYzQQAefb9xgNRJhsnITXDfY9QiPhOY+sJhthG+WEg9dBFpw88HjlYMHJaIhXRBdM8nTOwotsito5nC6F4zSdL/hQocUYBCs3L7rxsLqN4rdrVrYCvG4oK0sOweTOyc5GcIisfI/QSNi5QPDyW2Mf4+DlQUBvcCJKPQ/QTIhzVETNVHdwJgyHVUQO9pEEwS2C+gPB4RX+hWw9glmEEeKzEsyMOQJ+PILyhbywpE6muOFQPioXlACvleCYVgXijH2Pzlg7CIfdWgCYQ084rKwfuXQ2kBMOqxCwXLoP+Z5wWAXoXZTocRi+PLrV+ozDbSM9S+mVP+NMfA/NSiq3/BmHUxBYQYqLNsfsqptknhyHU2BOUdJ8y3H4HdsuqtrgcxxWAaElPatwuKXBFpSpcBiec676aMs4/C4JBcUSTkSrNR2oBhIOz4PBVd/TCg7r2fan33EJJ+IUX6BU1i7iMF7brsrmdxxuxlCldncjD6cIZJ2Odxxu5T5UWhdMcL7H0oCKJbNYxX8o9VLEYVa/RKG4VG6O77E613e5eh7bS9xFw3+gtmFB4woOq+gpSYuogsP3jn1St4rDKmFZUiThcF6rJzIO54PbSIHDK7qtqCxS4PDdSudKHI6uq5NeIiUOw9qtZ7U0ODwfz7XMhBxywPLt0RQ/j3j6rm41QBQBIQzDDIDPOjC0IN6DWlThOsyiQ697jg5n5Ht4hioEIyuDqZhFu0YIDi/3yBLF4XQS3UcoDqd7XIeAw8cKUs4l1eGwsVhXnoIGh8vZoJKSoMXhsflUC7bpg3hZTLdqSTAgJplBgqyU/QKl9wSf+/8uDRn8fKrv4WKShwwmXwVus1ZEg8K5ZEHbQVRZfTBOyDZ4Zd4LkukXcCaZ8qvtWFJ2sMk96gxFNMc8UDtVph4tihPmYWevGS1eDSTIq5zyxSHhhGg50Nb8IOCEdzXVl/yg4IS2m8pHNTOcUVCH0S0wUhJOWLF7UO0fGk5IyxtYT4KIE86nSOFCRlScUL5lofukmClOGNsPViSYjhMCD1ry2ADHf7wbXOfDFMfWq/1zTDbdXms8n49bve4m+U3t2sELHpvhWIQgLYaxYp+YT/vGJ40Ur9lqihO1TVIVPvvQ/znqGhnyDuhHAyxw6I7TryHh34zJRHgNTTsc2oa6I8zzXEvKRz9meGFtWxzc2rvHq6sW1ULj0dFPh9xkgxOtgPf4u0/9JwvqvgMwfdJbk8sK52/SH5Q9fyXkSVbRaK1+5jOzJ22J8zdF+tVL0OuGspQC6mwqD+ljaPqkrXH+NF4mx30qvj8PL8N1TZSr5r3lJBnsBslkbTFpo/8BKMt5HZoF/NQAAAAASUVORK5CYII="} />
                                                    <span style={{ marginLeft: "6%", fontSize: "12px" }}><strong>CONTINUE WITH APPLE</strong></span>

                                                </div>

                                            </button>
                                        </Row>
                                        <div className="Sso__divider m-small-margin">
                                            <div className="Sso__dividerLine">

                                            </div>
                                            <div className="Sso__dividerText">
                                                or
                                        </div>
                                            <div className="Sso__dividerLine">

                                            </div>
                                        </div>
                                        <Row>
                                            <input type="text" style={{ width: "100%" }} name="signupname" onChange={this.handleInputChange} placeholder="USERNAME" autoFocus required />
                                            <input type="text" style={{ width: "100%", marginTop: "10%" }} name="signupemail" onChange={this.handleEmailChange} placeholder="EMAIL" autoFocus required />

                                            <input type="text" style={{ width: "100%", marginTop: "10%" }} name="signuppassword" placeholder="PASSWORD" onChange={this.handleOtherChange} required />
                                            <button type="button" id="login-button" style={{ backgroundColor: "#0079d3", color: "white", borderRadius: "60px", width: "100%", marginTop: "10%" }} class="btn btn-outline-primary" onClick={this.handleSignUpSubmit}><span style={{ fontSize: "16px", fontWeight: "300px" }}><strong>Continue</strong></span></button>

                                            <div style={{ marginTop: "3%", fontSize: "12px" }}>
                                                Already a redditor? <strong><span ><button style={{ color: "#0079d3", textTransform: "uppercase", border: "none", fontWeight: "700", backgroundColor: "white" }} onClick={this.mutualButtonCLick}><bold>Log In</bold></button ></span></strong>
                                            </div>
                                            {invalidSignUpError}

                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>

                    <img src={home_page} height="100%" width="100%" alt="reddit-logo" />

                </div>
            )
        }
    }
}
const matchStateToProps = (state) => {
    console.log("inside matchStatetoProps", state)
    return {
        loginError: state.loginReducer.loginError,
        loginMessage: state.loginReducer.loginMessage,
        signUpError: state.SignUpReducer.signUpError,
        signUpMessage: state.SignUpReducer.signUpMessage
    }

}

const matchDispatchToProps = (dispatch) => {
    return {
        loginAction: (data) => dispatch(loginAction(data)),
        signUpAction: (data) => dispatch(signUpAction(data)),

    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Navbar)