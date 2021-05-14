import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Navbar from "../navbar/navbar";
import { Row, Col, CardTitle } from 'reactstrap';
//TODO : Add all the other use Data in the profile
export class UserProfile extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state.userData)
        this.state = {
            _id: this.props.location.state.userData._id,
            profilePicture: this.props.location.state.userData.avatar,
            email: this.props.location.state.userData.email,
            name: this.props.location.state.userData.name,
            location : this.props.location.state.userData.location
            // post_id: this.props.data._id,
        }
    };
    render() {
        console.log(this.state)
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div class="container">
                    <div className="row" style={{ paddingTop: "7%" }} >
                        <h6 style={{ color: "black" }}>
                            {this.state.name} Profile Page
                        </h6>

                    </div>
                    <div className="row" >
                        <div className="col-12" >
                            <hr />

                        </div>
                    </div>

                <div className="row">
                    <div className="col-2">
                        {/* <img src={this.state.image} width="200" height="200" alt="" /> */}
                        {this.state.profilePicture != null ?
                            this.state.profilePicture != "" ?
                                <img src={this.state.profilePicture} width="200" height="200" alt="" />
                                : <img src={this.state.image} width="200" height="200" alt="" />
                            : <img src={this.state.image} width="200" height="200" alt="" />}

                        <div className="row"><p style={{ "margin-left": '20px' }}>{this.state.name}'s  Avatar</p></div>
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
                                    Location Preferences
                                    </h6>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-4">
                                <input type="text" style={{ width: "100%" }} name="name" placeholder="DISPLAY NAME"  value={this.state.name} required />

                            </div>
                            <div className="col-4">
                                <input type="text" style={{ width: "100%" }} name="password" placeholder="LOCATION"  value = {this.state.location} />

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
                                <input type="text" style={{ width: "100%" }} name="name"   value={this.state.name} />

                            </div>
                            <div className="col-4">
                                <input type="text" style={{ width: "100%" }} name="password" placeholder="LOCATION"  value = {this.state.location} />

                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
            </div>
            </div>




        )
    }
}

export default UserProfile
