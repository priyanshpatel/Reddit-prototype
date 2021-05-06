import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Navbar from "../Navbar/Navbar";
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { BACKEND_URL } from '../../config/config';
import { BACKEND_PORT } from '../../config/config';
import {
    Card, CardText, CardBody,
} from 'reactstrap';
//Author : Het Brahmbhatt
import cookie from "react-cookies";

export class CommunitySearch extends Component {
    componentDidMount() {
        axios.defaults.headers.common["authorization"] = cookie.load('token')
        axios.defaults.withCredentials = true;
        return axios
            .get("http://localhost:3001/community/search?searchKeyword=Last").then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    // dispatch(success(response, data));

                }
            }).catch((err) => {
                // dispatch(error(err, data))
            });
    }
    render() {



        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <Row style={{ height: "95vh", backgroundColor: "#DAE0E6" }}>
                    <Col xs="1" style={{ marginLeft: "-6%" }}>
                    </Col>
                    <Col xs="3">
                        <Card style={{ marginTop: "22%", marginLeft: "15%", marginLeft: "1%", width: "80%" }}>
                            <CardBody class="sort-header">
                                <div class="row">
                                    <span style={{ paddingLeft: "20px" }}>Popularity(Votes)</span>
                                </div>
                                <div class="input-group mb-3" style={{ paddingLeft: "5px" }}>
                                    <select class="form-select" style={{ fontWeight: "bold", width: "350px" }} aria-label="user select" onChange={this.handlePopularityChange}>
                                        <option selected value="1">Most Popular</option>
                                        <option value="2">Unpopular</option>
                                    </select>
                                </div>
                                <hr />
                                <div class="row">
                                    <span style={{ paddingLeft: "20px" }}>Created at</span>
                                </div>
                                <div class="input-group mb-3" style={{ paddingLeft: "5px" }}>
                                    <select class="form-select" style={{ fontWeight: "bold", width: "350px" }} aria-label="user select" onChange={this.handleSortChange}>
                                        <option selected value="1">Most recent</option>
                                        <option value="2">Least recent</option>
                                    </select>
                                </div>
                                <hr />
                                <div class="row">
                                    <span style={{ paddingLeft: "20px" }}>Pagination Size</span>
                                </div>
                                <div class="input-group mb-3" style={{ paddingLeft: "5px" }}>
                                    <select class="form-select" style={{ fontWeight: "bold", width: "350px" }} aria-label="user select" onChange={this.handlePaginationDropdown}>
                                        <option selected value="2">2</option>
                                        <option value="5">5</option>
                                        <option value="5">10</option>
                                    </select>
                                </div>
                                <hr />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" style={{ marginTop: "5%" }}>
                        <div className="post" style={{ height: "50px", paddingLeft: "5%", paddingRight: "5%", backgroundColor: "white" }}>
                            <div class="input-group mb-3" >
                                <input type="text" style={{ backgroundColor: "#eaeef3", border: "none" }} class="form-control" placeholder="Search">
                                </input>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default CommunitySearch
