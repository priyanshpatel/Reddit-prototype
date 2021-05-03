import React, { Component } from 'react'
import './Comment.css'
import moment from 'moment'
import { Button } from '@material-ui/core';
import avatar from '../../images/avatar.png';
import { Row, Col } from 'reactstrap';
import ModeCommentTwoToneIcon from '@material-ui/icons/ModeCommentTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import createCommentAction from '../../actions/comment/createCommentAction';
import { connect } from "react-redux";

class Comment extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        if (this.props.commentData.depth == 0) {
            this.state = {
                createdAt: this.props.commentData.createdAt,
                depth: this.props.commentData.depth,
                userName: this.props.commentData.user.name,
                avatar: this.props.commentData.user.avatar,
                depth: this.props.commentData.depth,
                commentText: this.props.commentData.description,
                replyClicked: false,
                parent_id: this.props.commentData._id,
                commentDescription: ""
            }
        }
        else {
            this.state = {
                createdAt: this.props.commentData.createdAt,
                depth: this.props.commentData.depth,
                userName: this.props.commentData.user.name,
                avatar: this.props.commentData.user.avatar,
                depth: this.props.commentData.depth,
                commentText: this.props.commentData.description,
                replyClicked: false,
                parent_id: this.props.commentData._id,
                commentDescription: ""
            }
        }

    }
    replyButtonClicked = (e) => {
        this.setState({ replyClicked: !this.state.replyClicked })
    }

    handleDescriptionChange = (e) => {
        this.setState(
            {
                commentDescription: e.target.value
            }
        )
    }
    replyClicked = (e) => {
        let obj = {
            "description": this.state.commentDescription,
            "post_id": this.props.post_id,
            "community_id": this.props.community_id,
            "parent_id": this.state.parent_id
        }
        console.log(obj)
        console.log(this.state)
        this.props.createCommentAction(obj).then(response => {
            console.log("over here")
            // this.props.refreshComments();
        })
    }
    render() {
        let comment = this.props.commentData;
        let replyActionsStyle = { backgroundColor: '#CCC', margin: "5px 0 0 5px", lineHeight: "1" };
        let margin = (this.state.depth + 1) * 10 + '%';
        let columns = (100 - (this.state.depth + 1) * 50)
        return (
            <div>
                <div className='single-comment' style={{ marginLeft: margin, padding: "10px" }}>

                    <div className="comment-header">
                        <Row style={{ marginLeft: "0.%" }}>
                            <img src={avatar} height="17px" style={{ borderRadius: "50px" }} width="17px" alt="" /> &nbsp;
                            <div style={{ fontSize: "12px" }}><strong>{this.state.userName}&nbsp;</strong></div><div style={{ fontSize: "12px" }}>{moment.utc(this.state.createdAt).local().startOf('seconds').fromNow()}</div>
                        </Row>

                    </div>
                    <div className="comment-content" style={{ fontSize: "14px", fontFamily: "Arial", color: "#1A1A1B" }}>

                        {this.state.commentText}

                    </div>
                    <Row style={{ marginLeft: "0.%" }}>
                        <ArrowUpwardTwoToneIcon style={{ fontSize: "14px", marginTop: "5px" }} />
                        <ArrowDownwardTwoToneIcon style={{ fontSize: "14px", marginTop: "5px" }} />

                        <Button
                            size="small"
                            onClick={this.replyButtonClicked}
                        >  <ModeCommentTwoToneIcon style={{ fontSize: "14px" }} />
                            <span style={{ fontSize: "12px", color: "#878a8c", paddingLeft: "5%", textTransform: "Capitalize" }}><strong>Reply</strong> </span></Button>
                    </Row>
                    <Row>
                        {this.state.replyClicked ?
                            <div className="reply-input">
                                <textarea style={{ marginLeft: "1%" }} id="w3review" value={this.state.communityName} placeholder="What are your thoughts?" name="communityName" onChange={this.handleDescriptionChange} rows="2" cols={columns} />
                                <div className="comment-action">
                                    <Button size="small" variant="contained" style={replyActionsStyle} onClick={this.replyClicked}>Submit</Button>
                                    <Button size="small" variant="contained" style={replyActionsStyle} onClick={this.replyButtonClicked}>Cancel</Button>
                                </div>
                            </div> :
                            ""}
                    </Row>

                </div>

            </div>
        )

    }
}
const matchStateToProps = (state) => {
    console.log("inside matchStatetoProps", state)
    return {
        // postData: state.createCommunityReducer.postData,
        // message: state.createCommunityReducer.message,
        // getPostData: state.getPostByIDReducer.getPostData,

    }

}

const matchDispatchToProps = (dispatch) => {
    return {
        createCommentAction: (data) => dispatch(createCommentAction(data)),

    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Comment)