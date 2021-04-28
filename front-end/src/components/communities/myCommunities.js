import React, { Component } from 'react'
import Navbar from '../navbar/navbar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './myCommunities.css';
import { connect } from "react-redux";
import { Card, Button, CardTitle, CardText, CardBody } from 'reactstrap';

class MyCommunities extends Component {

    render() {
        let redirectVar = null;
        if (!cookie.load('token')) {
            // redirectVar = <Redirect to="/" />
        };
        return (
            <div>
                {redirectVar}
                <div><Navbar /></div>
                <div class="com-header">
                    My Communities
                </div>
                <div class="com-content">
                    <div class="row">
                        <div class="col-2" style={{ marginLeft: "95px", paddingLeft: "20px", paddingRight: "24px", paddingTop: "20px" }}>
                            <Card>
                                <CardBody class="sort-header">
                                    <div class="row">
                                        <span style={{ paddingLeft: "20px" }}>Created</span>
                                    </div>
                                    <div class="input-group mb-3" style={{ paddingLeft: "5px" }}>
                                        <select class="form-select" style={{ fontWeight: "bold", width:"350px" }} aria-label="user select">
                                            <option selected value="1">Most Recent</option>
                                            <option value="2">Oldest</option>
                                        </select>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <span style={{ paddingLeft: "20px" }}>Number of posts</span>
                                    </div>
                                    <div class="input-group mb-3" style={{ paddingLeft: "5px" }}>
                                        <select class="form-select" style={{ fontWeight: "bold", width:"350px" }} aria-label="user select">
                                            <option selected value="1">Highest</option>
                                            <option value="2">Lowest</option>
                                        </select>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <span style={{ paddingLeft: "20px" }}>Number of users</span>
                                    </div>
                                    <div class="input-group mb-3" style={{ paddingLeft: "5px" }}>
                                        <select class="form-select" style={{ fontWeight: "bold", width:"350px" }} aria-label="user select" onChange={this.handlePageSizeChange}>
                                            <option selected value="1">Highest</option>
                                            <option value="2">Lowest</option>
                                        </select>
                                    </div>
                                    <hr />

                                </CardBody>
                                {/* <CardBody class="com-card">
                                    <img src="/logo192.png" alt="Avatar" class="com-avatar"/> <span class="com-name">r/CrytoCurrency</span>
                                </CardBody> */}
                            </Card>
                        </div>
                        <div class="col-6" style={{ paddingLeft: "0", paddingRight: "24px", paddingTop: "20px" }}>
                            <Card>
                                <CardBody class="com-card">
                                    <img src="/logo192.png" alt="Avatar" class="com-avatar" /> <span class="com-name">r/CrytoCurrency</span>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody class="com-card">
                                    <img src="/logo192.png" alt="Avatar" class="com-avatar" /> <span class="com-name">r/coolGuides</span>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody class="com-card">
                                    <img src="/logo192.png" alt="Avatar" class="com-avatar" /> <span class="com-name">r/Cars</span>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody class="com-card">
                                    <img src="/logo192.png" alt="Avatar" class="com-avatar" /> <span class="com-name">r/gadgets</span>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody class="com-card">
                                    <img src="/logo192.png" alt="Avatar" class="com-avatar" /> <span class="com-name">r/formula1</span>
                                </CardBody>
                            </Card>
                        </div>
                        <div class="col-2" style={{ paddingLeft: "0", paddingTop: "20px", marginRight: "65px" }}>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default MyCommunities;