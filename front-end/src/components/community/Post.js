// author : Het Brahmbhatt
import React, { Component } from 'react'
import {
    Card, CardText, CardBody,
} from 'reactstrap';
import { connect } from "react-redux";
import './Post.css'
import { Row, Col, CardTitle } from 'reactstrap';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import moment from 'moment'
import Comment from './Comment'
import { Button } from '@material-ui/core';
import createCommentAction from '../../actions/comment/createCommentAction';
import getPostAction from '../../actions/posts/getPostAction';
import { Accordion } from "react-bootstrap";
import ModeCommentTwoToneIcon from '@material-ui/icons/ModeCommentTwoTone';
class Post extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.data);
        console.log(this.props)
        this.state = {
            post_id: this.props.data._id,
            community_id: this.props.data.community,
            createdAt: this.props.data.createdAt,
            createdBy: this.props.data.user.name,
            images: this.props.data.images,
            numberOfComments: this.props.data.numberOfComments,
            updatedAt: this.props.data.updatedAt,
            voteStatus: this.props.data.voteStatus,
            votes: this.props.data.votes,
            title: this.props.data.title,
            type: this.props.data.type,
            score: 0,
            vote: 0,
            description: this.props.data.description,
            comments: this.props.data.comments,
            firstCommentDescription: "",
            commentFlag: false
        }
    };
    handleDescriptionChange = (e) => {
        this.setState(
            {
                firstCommentDescription: e.target.value
            }
        )
    }
    vote(type) {
        this.setState(state => ({
            vote: state.vote === type ? 0 : type
        }));
    }

    refreshComments = () => {

    }
    handleFirstCommentSubmit = (e) => {
        e.preventDefault();
        let obj = {
            "description": this.state.firstCommentDescription,
            "post_id": this.state.post_id,
            "community_id": this.state.community_id
        }
        this.props.createCommentAction(obj).then(response => {
            this.props.refreshComments();
        })
    }
    commentsClicked = inp => {
        this.setState({
            commentFlag: !this.state.commentFlag
        })
    }
    displayComments = (allComments) => {
        let comments = []
        console.log("here")
        for (let comment of Object.values(allComments)) {
            comments.push(<Comment
                commentData={comment}
                key={comment._id}
                community_id={this.state.community_id}
                post_id={this.state.post_id}
                addComment={this.addComment}
            />)
            if (comment.children && Object.keys(comment.children).length > 0) {
                let replies = this.displayComments(comment.children)
                comments = comments.concat(replies)
            }
        }
        return comments
    }
    render() {
        console.log(this.state)
        let comments = this.displayComments(this.state.comments)
        let replyActionsStyle = { backgroundColor: '#CCC', margin: "5px 0 0 5px", lineHeight: "1" };

        const vote = this.state.vote;
        const score = this.state.score;
        let postDivision = null;
        let avatarImageDivision = this.state.images.map((data, index) => (
            <div style={{ marginBottom: "5px" }}>
                <CarouselProvider
                    naturalSlideWidth={200}
                    naturalSlideHeight={200}
                    totalSlides={this.state.images.length}
                >
                    <ButtonBack style={{ border: "none", backgroundColor: "white", fontSize: "40px", float: "left", marginTop: "30%" }}>&#60;</ButtonBack>
                    <ButtonNext style={{ border: "none", backgroundColor: "white", float: "right", marginTop: "30%", fontSize: "40px", }}>&#62;</ButtonNext>
                    <Slider>
                        <Slide index={index}>
                            <img src={data} height="100%" width="100%" style={{ position: "absolute" }} alt="" />

                        </Slide>
                    </Slider>
                </CarouselProvider>
            </div>
        ))
        if (this.state.type == "image") {
            postDivision =
                <div>
                    <Card >
                        <Row>
                            <Col xs="1" style={{ backgroundColor: "#F5F5F5" }}>Hi</Col>
                            <Col style={{ paddingLeft: "0px" }}>
                                <span style={{ color: "#787C7E", fontSize: "12px", marginLeft: "7%" }}>Posted by u/ {this.state.createdBy} {moment.utc(this.state.createdAt).local().startOf('seconds').fromNow()}

                                </span>

                                <CardTitle tag="h5" style={{ marginLeft: "7%", marginTop: "5px" }}>{this.state.title}</CardTitle>
                                {avatarImageDivision}
                            </Col>
                        </Row>
                        <Row style={{ backgroundColor: "#F5F5F5", height: "30px", width: "103%", paddingLeft: "10%" }}>
                            <Button
                                size="small"
                                onClick={this.commentsClicked}
                            >
                                <ModeCommentTwoToneIcon style={{ fontSize: "18px" }} />
                                <span style={{ fontSize: "12px", fontWeight: "300px", textTransform: "capitalize" }}>
                                    {this.state.numberOfComments} Comments
                            </span>
                            </Button>
                        </Row>
                    </Card>
                </div>
        }
        else if (this.state.type == "text") {
            postDivision = <Card >
                <Row>
                    <Col xs="1" style={{ paddingLeft: "1%", backgroundColor: "#F5F5F5" }}>
                        <button
                            style={{ border: "none" }}
                            onClick={() => this.vote(1)}>
                        </button>
                        {/* <div class="arrow-up"></div> */}

                        <div id="upvote" className={vote === 1 ? "active" : undefined}>
                            <i id="icon" class="fal fa-arrow-alt-up" ></i>
                        </div>

                        <span style={{ fontSize: "16px", maxWidth: "10px", fontWeight: "300px" }}>{score + vote}</span>
                        <button
                            id="downvote"
                            className={vote === -1 ? "active" : undefined}
                            onClick={() => this.vote(-1)}
                        />
                    </Col>

                    <Col>
                        <span style={{ color: "#787C7E", fontSize: "12px", marginLeft: "3%" }}>Posted by u/ {this.state.createdBy} {moment.utc(this.state.createdAt).local().startOf('seconds').fromNow()}</span>
                        <CardBody>
                            <CardTitle tag="h5">{this.state.title}</CardTitle>
                            <CardText>{this.state.description}</CardText>
                        </CardBody>     </Col>
                </Row>
                <Row style={{ backgroundColor: "#F5F5F5", height: "30px", width: "103%", paddingLeft: "10%" }}>
                    <Button
                        size="small"
                        onClick={this.commentsClicked}
                    >
                        <ModeCommentTwoToneIcon style={{ fontSize: "18px" }} />
                        <span style={{ fontSize: "12px", fontWeight: "300px", textTransform: "capitalize" }}>
                            {this.state.numberOfComments} Comments
                            </span>
                    </Button>
                </Row>
            </Card>
        }
        else if (this.state.type == "link") {
            postDivision = <Card>
                <Row>
                    <Col xs="1" style={{ backgroundColor: "#F5F5F5" }}>{this.state.title}</Col>

                    <Col>
                        <span style={{ color: "#787C7E", fontSize: "12px", marginLeft: "3%" }}>Posted by u/{this.state.createdBy} {moment.utc(this.state.createdAt).local().startOf('seconds').fromNow()}</span>
                        <CardBody>
                            <CardTitle tag="h5">{this.state.title}</CardTitle>
                            <CardText>
                                <a href={this.state.description}></a>
                            </CardText>
                        </CardBody>
                    </Col>
                </Row>
                <Row style={{ backgroundColor: "#F5F5F5", height: "30px", padding: "10px", width: "103%", paddingLeft: "10%" }}>
                    <ModeCommentTwoToneIcon style={{ fontSize: "18px" }} />
                    <span style={{ fontSize: "14px", fontWeight: "300px", marginBottom: "14px", paddingLeft: "8px" }}>
                        {this.state.numberOfComments} Comments

                            </span>
                </Row>
            </Card>
        }
        return (
            <div style={{ marginTop: "10%" }}>
                {postDivision}
                {this.state.commentFlag ?
                    <div className="comment" style={{ backgroundColor: "white" }}>
                        <textarea style={{ marginLeft: "12%", marginTop: "5%" }} id="w3review" placeholder="What are your thoughts?" name="description" onChange={this.handleDescriptionChange} rows="2" cols="30" />
                        <div style={{ marginLeft: "12%" }} className="comment-action">
                            <Button size="small" variant="contained" style={replyActionsStyle} onClick={this.handleFirstCommentSubmit}>Submit</Button>
                            <Button size="small" variant="contained" style={replyActionsStyle} onClick={this.replyButtonClicked}>Cancel</Button>
                        </div>
                        {comments}
                    </div> : ""
                }


            </div>
        )
    }
}
const matchStateToProps = (state) => {
    console.log("inside matchStatetoProps", state)
    return {
        postData: state.createCommunityReducer.postData,
        message: state.createCommunityReducer.message,
        getPostData: state.getPostByIDReducer.getPostData,

    }

}

const matchDispatchToProps = (dispatch) => {
    return {
        createCommentAction: (data) => dispatch(createCommentAction(data)),
        getPostAction: (data) => dispatch(getPostAction(data)),

    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Post)