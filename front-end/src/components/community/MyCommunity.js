//author-Het 
import React, { Component } from 'react'
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { Row, Col, CardTitle } from 'reactstrap';
import avatar from '../../images/avatar.png';
import post from '../../images/post-image.png';
import houseicon from '../../images/house-icon.png';
import cakeicon from '../../images/cake-icon.png';
import { Accordion } from "react-bootstrap";
import { Button } from '@material-ui/core';
import ReactPaginate from 'react-paginate';
import './Pagination.css'
import linkicon from '../../images/link.png';
import {
    Card, CardText, CardBody,
} from 'reactstrap';
import './MyCommunity.css'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import getPostsByIDAction from '../../actions/posts/getPostAction';
import Post from './Post';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import { relativeTimeThreshold } from 'moment';
class MyCommunity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            communityList: [
                {

                },
                {

                },
                {

                }
            ],
            postFlag: false,
            communityID: "608bcd1a6589fd7200e3e27f",
            description: "This subreddit is for anyone who wants to learn JavaScript or help others do so. Questions and posts about frontend development in general are welcome, as are all posts pertaining to JavaScript on the backend",
            communityName: "Learn JavaScript",
            totalUsers: [],
            communityNameWithoutSpaces: "",
            rules: [
                {
                    title: 'Title1',
                    description: "Description1"
                },
                {
                    title: 'Title2',
                    description: "Description2"
                },
                {
                    title: 'Title3',
                    description: "Description3"
                },
                {
                    title: 'Title4',
                    description: "Description4"
                }
            ],
            members: "161K",
            totalPosts: "",
            totalModerators: [],
            posts: [],
            hasNextPage: false,
            hasPrevPage: true,
            nextPage: "",
            pageNumber: 1,
            pageSize: 2,
            prevPage: "",
            totalPages: "",
            popularity: 0,
            sorting: 1
        }
    }
    handlePageClick = (e) => {
        let obj = {
            sorting: this.state.sorting,
            popularity: this.state.popularity,
            pageNumber: Number(e.selected) + 1,
            pageSize: this.state.pageSize
        }
        this.props.getPostsByIDAction(obj).then(response => {
            this.setState(
                {
                    posts: this.props.postData.posts,
                    hasNextPage: this.props.postData.hasNextPage,
                    hasPrevPage: this.props.postData.hasPrevPage,
                    nextPage: this.props.postData.nextPage,
                    pageNumber: this.props.postData.pageNumber,
                    pageSize: this.props.postData.pageSize,
                    prevPage: this.props.postData.prevPage,
                    totalPages: this.props.postData.totalPages,
                }
            )
        })

    };
    postClick = e => {
        this.setState({ postFlag: true });

    }
    refreshCommentsAfterAdd = () => {
        console.log("In My community refresh comments after add", this.state);
        this.props.getPostsByIDAction(this.state).then(response => {
            this.setState(
                {
                    posts: this.props.postData.posts,
                    hasNextPage: this.props.postData.hasNextPage,
                    hasPrevPage: this.props.postData.hasPrevPage,
                    nextPage: this.props.postData.nextPage,
                    pageNumber: this.props.postData.pageNumber,
                    pageSize: this.props.postData.pageSize,
                    prevPage: this.props.postData.prevPage,
                    totalPages: this.props.postData.totalPages,
                }
            )
        })
    }
    handlePaginationDropdown = (e) => {
        e.preventDefault()
        alert(e.target.value)
        this.setState(
            {
                pageSize: e.target.value
            }
        )

        //TODO : ADD community_id
        let obj = {
            popularity: this.state.popularity,
            sorting: this.state.sorting,
            pageNumber: this.state.pageNumber,
            pageSize: e.target.value
        }
        this.props.getPostsByIDAction(obj).then(response => {
            this.setState(
                {
                    posts: this.props.postData.posts,
                    hasNextPage: this.props.postData.hasNextPage,
                    hasPrevPage: this.props.postData.hasPrevPage,
                    nextPage: this.props.postData.nextPage,
                    pageNumber: this.props.postData.pageNumber,
                    pageSize: this.props.postData.pageSize,
                    prevPage: this.props.postData.prevPage,
                    totalPages: this.props.postData.totalPages,
                }
            )
        })
    }
    handlePopularityChange = (e) => {
        e.preventDefault()
        this.setState(
            {
                popularity: e.target.value
            }
        )

        //TODO : ADD community_id
        let obj = {
            popularity: e.target.value,
            sorting: this.state.sorting,
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        this.props.getPostsByIDAction(obj).then(response => {
            this.setState(
                {
                    posts: this.props.postData.posts,
                    hasNextPage: this.props.postData.hasNextPage,
                    hasPrevPage: this.props.postData.hasPrevPage,
                    nextPage: this.props.postData.nextPage,
                    pageNumber: this.props.postData.pageNumber,
                    pageSize: this.props.postData.pageSize,
                    prevPage: this.props.postData.prevPage,
                    totalPages: this.props.postData.totalPages,
                }
            )
        })
    }
    handleSortChange = (e) => {
        e.preventDefault()

        this.setState(
            {
                sorting: e.target.value
            }
        )
        //TODO : ADD COMMUNITYid 
        let obj = {
            popularity: this.state.popularity,
            sorting: e.target.value,
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        this.props.getPostsByIDAction(obj).then(response => {
            this.setState(
                {
                    posts: this.props.postData.posts,
                    hasNextPage: this.props.postData.hasNextPage,
                    hasPrevPage: this.props.postData.hasPrevPage,
                    nextPage: this.props.postData.nextPage,
                    pageNumber: this.props.postData.pageNumber,
                    pageSize: this.props.postData.pageSize,
                    prevPage: this.props.postData.prevPage,
                    totalPages: this.props.postData.totalPages,
                    totalPosts: this.props.postData.totalPosts
                }
            )
        })
    }
    componentDidMount() {
        document.title = this.state.communityName
        var str = this.state.communityName;
        str = str.replace(/\s+/g, '').toLowerCase();
        this.setState(
            {
                communityNameWithoutSpaces: str
            }
        )
        this.props.getPostsByIDAction(this.state).then(response => {
            this.setState(
                {
                    posts: this.props.postData.posts,
                    hasNextPage: this.props.postData.hasNextPage,
                    hasPrevPage: this.props.postData.hasPrevPage,
                    nextPage: this.props.postData.nextPage,
                    pageNumber: this.props.postData.pageNumber,
                    pageSize: this.props.postData.pageSize,
                    prevPage: this.props.postData.prevPage,
                    totalPages: this.props.postData.totalPages,
                    totalPosts: this.props.postData.totalPosts

                }
            )
        })
    }
    render() {
        console.log(this.state)
        let renderPost = null;
        let postComponent = this.props.postData.posts.map((postData, index) => (
            <div>
                <Post
                    data={postData}
                    key={postData._id}
                    refreshComments={this.refreshCommentsAfterAdd}

                />
            </div>
        ))
        let rulesAccordion = this.state.rules.map((rule, index) => {
            return (
                <div>
                    <Accordion style={{ width: "323px" }}>
                        <Card style={{ marginTop: "15px", border: "1px" }}>
                            < Accordion.Toggle as={Card.Header} style={{ backgroundColor: "white", border: "none" }} eventKey={index + 1}>

                                <div style={{ textAlign: "left" }}>
                                    {index + 1}.&nbsp;{rule.title}
                                </div>
                            </Accordion.Toggle>
                        </Card>
                        <Accordion.Collapse eventKey={index + 1}>
                            <CardBody style={{ border: "1px" }}>
                                {rule.description}
                            </CardBody>
                        </Accordion.Collapse>
                    </Accordion>
                </div>
            );
        }
        )
        if (this.state.postFlag) {
            renderPost = window.location.assign('/submit/' + this.state.communityID)
        }
        return (
            <div>
                {renderPost}
                <div>
                    <Navbar />
                </div>
                <Row style={{ height: "80px" }}>
                    <Col style={{ backgroundColor: "#0079d3" }}>
                        <h1></h1>

                    </Col>
                </Row>
                <Row style={{ height: "70px" }}>
                    <Col >

                    </Col>
                    <Col style={{ backgroundColor: "white" }}>
                        {/* TODO: CHANGE THIS TO THIS.STATE.IMAGE */}
                        <Col style={{ width: "700px", marginLeft: "8%", position: "relative", zIndex: "10" }}>
                            <img src={avatar} style={{ borderRadius: "50%", border: "4px solid white" }} height="80px" width="80px" alt="reddit-logo" />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {/* TODO : CHANGE THIS TO THIS.STATE.NAME */}
                            <span className="heading" style={{ fontSize: "25px", fontSize: "1.5vw", color: "#1C1C1C", fontWeight: "700", lineHeight: "32px", overflow: "scroll" }}>{this.state.communityName}   </span>
                        </Col>
                    </Col>
                    <Col style={{ backgroundColor: "white" }}>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row style={{ backgroundColor: "#DAE0E6", marginTop: "2%" }}>
                    <Col xs="2" style={{ paddingTop: "2.5%", paddingLeft: "2.5%", marginLeft: "1%" }}>
                        <Card>
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
                            {/* <CardBody class="com-card">
                                    <img src="/logo192.png" alt="Avatar" class="com-avatar"/> <span class="com-name">r/CrytoCurrency</span>
                                </CardBody> */}
                        </Card>
                    </Col>
                    <Col xs="5" style={{ paddingTop: "40px", marginLeft: "5%" }}>
                        <div className="post" style={{ height: "50px", backgroundColor: "white" }}>
                            <img src={post} height="30px" width="30px" alt="reddit-logo" />
                            <input type="text" style={{ width: "100%", marginLeft: "2%" }} onClick={this.postClick} placeholder="Create Post" />
                            <img src={houseicon} height="30px" width="40px" alt="reddit-logo" />
                            <img src={linkicon} height="30px" width="40px" alt="reddit-logo" />
                        </div>
                        <div style={{ paddingTop: "3%", marginLeft: "3%" }}>
                            {postComponent}
                        </div>
                    </Col>
                    <Col xs="3" style={{ paddingTop: "40px", marginLeft: "6%" }}>
                        <Row>
                            <Card >
                                <CardBody>
                                    <div className="row" style={{ marginLeft: "-3%", backgroundColor: "#0079d3", height: "40px" }}>
                                        <div style={{ fontSize: "16px", padding: "10px", fontFamily: "arial", color: "#1A1A1B", fontWeight: "700", color: "white" }}>About Community</div>
                                    </div>
                                    <br></br>
                                    <br></br>

                                    {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
                                    <CardText style={{ fontSize: "14px", fontFamily: "sans-serif", color: "#1C1C1C" }}>{this.state.description}                                </CardText>
                                    <Row>
                                        <h1></h1>
                                    </Row>
                                    <Row>
                                        <h1></h1>
                                    </Row>
                                    <Row >
                                        <Col>
                                            <div className="about-community-member">
                                                {this.state.members}</div>
                                        </Col>
                                        <Col>
                                            <div className="about-community-member">
                                                {this.state.totalPosts}</div>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col>
                                            <div className="about-community-text">
                                                Members</div>
                                        </Col>
                                        <Col>
                                            <div className="about-community-text">
                                                Total Posts</div>
                                        </Col>
                                    </Row>
                                    {/* TODO : Change this with moment */}

                                    <hr></hr>
                                    <Row >
                                        <Col>
                                            <img src={cakeicon} height="30px" width="40px" style={{ marginBottom: "1%" }} alt="reddit-logo" />
                                            <span style={{ fontSize: "14px", marginTop: "2%", fontFamily: "sans-serif", color: "#1C1C1C" }}>Created at
                                            4 April 2012
                                        {/* {moment(group.createdat).tz(cookie.load("timezone")).format("MMM")} */}
                                            </span>
                                            <button type="button" id="login-button" style={{ backgroundColor: "#0079d3", color: "white", borderRadius: "60px", width: "100%", marginTop: "10%" }} class="btn btn-outline-primary" onClick={this.postClick}><span style={{ fontSize: "16px", fontWeight: "300px" }}><strong>Create Post</strong></span></button>
                                        </Col>
                                    </Row>
                                    <br></br>
                                </CardBody>
                            </Card>
                        </Row>

                        <Row style={{ paddingTop: "10%" }}>
                            <Card >
                                <CardBody>
                                    <div className="row" style={{ marginLeft: "-3%", backgroundColor: "#0079d3", height: "40px" }}>
                                        <div style={{ fontSize: "16px", padding: "10px", fontFamily: "arial", color: "#1A1A1B", fontWeight: "700", color: "white" }}>r/{this.state.communityNameWithoutSpaces} Rules</div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <CardText style={{ fontSize: "14px", fontFamily: "sans-serif", color: "#1C1C1C" }}></CardText>
                                    {rulesAccordion}
                                </CardBody>
                            </Card>
                        </Row>
                    </Col>
                    <Col className="pagination-class">
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.props.postData.totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </Col>
                </Row>

            </div>
        )
    }
}
const matchStateToProps = (state) => {
    console.log("inside matchStatetoProps", state)
    return {
        postData: state.getPostByIDReducer.getPostData,
        message: state.getPostByIDReducer.message,
    }

}

const matchDispatchToProps = (dispatch) => {
    return {
        getPostsByIDAction: (data) => dispatch(getPostsByIDAction(data)),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(MyCommunity)