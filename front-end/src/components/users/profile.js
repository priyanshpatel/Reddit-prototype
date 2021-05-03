import React, { Component } from 'react'
import './profile.css'
import Select from 'react-select'
import { BACKEND_URL } from '../../config/config';
import { BACKEND_PORT } from '../../config/config';
import updateUserProfileAction from '../../actions/userUpdateAction';
import userGetByIDAction from '../../actions/getUserByIDReducer';
import { connect } from "react-redux";
import cookie from "react-cookies";
import Navbar from "../Navbar/navbar";

//author - Het 
//TODO : Topic Creation Left
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            gender: false,
            location: "",
            password: "",
            description: "",
            error: false,
            image: BACKEND_URL + ':' + BACKEND_PORT + '/avatar.jpeg',
            rawImagePath: "",
            wasImageUpdated: false,
        }
    }
    componentDidMount() {
        document.title = "Profile"
    }
    handleOtherChange = inp => {
        {
            this.setState({
                [inp.target.name]: inp.target.value
            })
        }

    }
    handleGenderChange = e => {
        this.setState({
            gender: e.value
        })
    }
    handleImageChange = e => {
        this.setState({
            image: e.target.files[0],
            wasImageUpdated: true
        })
    }
    async componentDidMount() {
        try {
            this.props.userGetByIDAction(cookie.load('id')).then(response => {
                console.log(this.props);
            })
        }
        catch (err) {
            console.log(err)
        }

    }
    handleOnSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        let formData = new FormData();

        // Append image if it was updated
        if (this.state.wasImageUpdated) {
            formData.append(
                "profileImage",
                this.state.image,
                this.state.image.name
            );
        } else {
            formData.append("image", this.state.rawImagePath);
        }

        // Append other data
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("gender", this.state.gender);
        formData.append("description", this.state.description);
        formData.append("location", this.state.location);

        this.props.updateUserProfile(formData)
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
    render() {
        let renderError = null;
        if (this.state.error) {
            renderError = <div style={{ 'color': 'red' }}>{this.state.errorMessage}</div>
        }
        const gender = [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
        ]

        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div class="container">
                    <div className="row" >
                        <i class="fa fa-cog fa-fw" style={{ padding: "5px" }}></i>
                        <div className="col-md-6" >User Settings</div>
                        <div className="col-md-1" >&nbsp;</div>
                    </div>
                    <br></br>
                    <div className="row" >
                        <ul >
                            <li><a href="/"><div style={{ color: "#7C7C7C" }}><strong>Account</strong></div></a></li>
                            <li><a href="/"><div style={{ color: "#7C7C7C", borderBottom: "2px solid #0079d3", borderBottomColor: "#0079d3" }}><strong>Profile</strong></div></a></li>
                            <li><a href="/"><div style={{ color: "#7C7C7C" }}><strong>Safety & Privacy</strong></div></a></li>
                            <li><a href="/"><div style={{ color: "#7C7C7C" }}><strong>Feed Settings</strong></div></a></li>
                            <li><a href="/"><div style={{ color: "#7C7C7C" }}><strong>Notifications</strong></div></a></li>
                            <li><a href="/"><div style={{ color: "#7C7C7C" }}><strong>Subscriptions</strong></div></a></li>
                            <li><a href="/"><div style={{ color: "#7C7C7C" }}><strong>Chats and Messages</strong></div></a></li>
                        </ul>
                    </div>
                    <br></br>
                    <div className="row" >
                        <h6 style={{ color: "black" }}>
                            Customize Profile
                        </h6>
                    </div>
                    <div className="row" >
                        <div className="col-10" >
                            <hr />
                        </div>
                    </div>
                    <form onSubmit={this.handleOnSubmit} method="post">
                        <div className="row">
                            <div className="col-2">
                                <img src={this.state.image} width="200" height="200" alt="" />

                                <div className="row"><p style={{ "margin-left": '20px' }}>Change your Avatar</p></div>
                                <div className="row">
                                    <input style={{ "marginLeft": '20px' }} accept="image/x-png,image/gif,image/jpeg" type="file" name="profileImage" onChange={this.handleImageChange} />
                                </div>
                            </div>
                            <div className="col-8" style={{ marginLeft: "15%" }}>
                                <div className="row" >
                                    <div className="col-4">
                                        <h6 style={{ color: "black", marginLeft: "1%" }}>
                                            Name
                                    </h6>

                                    </div>
                                    <div className="col-4">

                                        <h6 style={{ color: "black", marginLeft: "1%" }}>
                                            Change Password
                                    </h6>
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-4">
                                        <input type="text" style={{ width: "100%" }} name="name" placeholder="DISPLAY NAME" onChange={this.handleInputChange} required />

                                    </div>
                                    <div className="col-4">
                                        <input type="password" style={{ width: "100%" }} name="password" placeholder="PASSWORD" onChange={this.handleOtherChange} required />

                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "10%" }} >
                                    <div className="col-4">
                                        <h6 style={{ color: "black", marginLeft: "1%" }}>
                                            Gender
                                    </h6>

                                    </div>
                                    <div className="col-4">

                                        <h6 style={{ color: "black", marginLeft: "1%" }}>
                                            Location
                                    </h6>
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-4">
                                        <Select
                                            options={gender}
                                            onChange={this.handleGenderChange} />
                                    </div>
                                    <div className="col-4">
                                        <input type="text" style={{ width: "100%" }} name="location" placeholder="LOCATION" onChange={this.handleOtherChange} />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="row" >
                            <h6 style={{ color: "black", marginLeft: "1%" }}>
                                Description(Optional)
                        </h6>
                        </div>
                        <br></br>
                        <div className="row" >
                            <div className="col-7">
                                <textarea id="w3review" name="description" onChange={this.handleOtherChange} rows="4" cols="76">
                                </textarea>
                            </div>
                        </div>
                        <div style={{ marginLeft: "40%", marginTop: "2%" }}>
                            <button type="submit" className="btn btn-danger" style={{ backgroundColor: "#0079d3" }} onSubmit={this.handleOnSubmit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const matchStateToProps = (state) => {
    console.log("inside matchStatetoProps", state)
    return {
        user: state.userUpdateReducer.userData,
    }

}
const matchDispatchToProps = (dispatch) => {
    return {
        updateUserProfileAction: (data) => dispatch(updateUserProfileAction(data)),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Profile)
