// Created by Priyansh Patel
import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  FormGroup,
  CardBody,
} from "reactstrap";
import classnames from "classnames";
import "./communityModUsersList.css";
import { connect } from "react-redux";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

import ReactPaginate from "react-paginate";
import getMyCommunityModCommunityAction from '../../actions/community/getMyCommuityModCommunityAction';

let checkedUserList = [];

class CommunityModCommunityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testFlag: true,
      communityData: {},
    };
  }
  componentDidMount() {
    console.log("CommunityModCommunityList Component Mounted")
    console.log("this.state", this.state)
    console.log("this,props", this.props)
    //call action here
    this.props.getMyCommunityModCommunityAction(this.state).then((response) => {
      console.log("community list response >>>>>>>>>>>>>", this.props);
      // users array: this.props.userReqData.users
      if (this.props.communityError) {
        this.setState({
          communityError: true,
          communityMessage: this.props.communityMessage,
        });
      } else {
        this.setState({
          communityData: this.props.communityData
        });
      }
    });
  }

  handlePageClickMembers = (e) => {
    this.setState({
      memberPageNumber: Number(e.selected) + 1,
    });

    // make request data object and call action
  };

  handleUserReqSearch = (e) => {
    e.preventDefault();
    this.setState({
      userReqPageNumber: 1,
      userReqSearchKeyword: e.target.value,
    });

    // create req object
    // call action
  };

  handleMemberPageSizeChange = (e) => {
    e.preventDefault();
    this.setState({
      memberPageSize: e.target.value,
      memberPageNumber: 1,
    });

    // create req object

    // call action
  };

  handleUserReqPageSizeChange = (e) => {
    e.preventDefault();
    this.setState({
      userReqPageSize: e.target.value,
      userReqPageNumber: 1,
    });

    // create req object 

    // call action
  };

  render() {
    return (
      <div style={{ backgroundColor: "rgb(218,224,230)", height: "1000px" }}>
        <span
          onClick={this.props.closePopUp}
          style={{ float: "right", marginRight: "1%", marginTop: "1%" }}
        >
          <i class="fas fa-times closeButtonIcon"></i>
        </span>
        <div className="post-tabs-container">
          <div class="create-post-header">Your Communities</div>

          </div>
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  console.log("inside matchStatetoProps", state);
  return {
    communityData: state.getCommunityModCommunityListReducer.communityData,
    communityError: state.getCommunityModCommunityListReducer.error,
    communityMessage: state.getCommunityModCommunityListReducer.message,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    getMyCommunityModCommunityAction: (data) =>
      dispatch(getMyCommunityModCommunityAction(data)),
  };
};

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(CommunityModCommunityList);

// export default CommunityModCommunityList;
