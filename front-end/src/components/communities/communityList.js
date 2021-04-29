import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, CardBody } from 'reactstrap';
import './myCommunities.css';

class communityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            communityAvatar: this.props.communityAvatar,
            communityId: this.props._id,
            communityName: this.communityName,
        }
    }

    componentDidMount() {
        console.log("----------inside list component-------------", this.props.myCommunitiesData.data);
    }

    render() {
        return (
            <Card>
                <CardBody class="com-card">
                    <img src={this.state.communityAvatar[0]} alt="Avatar" class="com-avatar" /> <span class="com-name">r/{this.state.communityName}</span>
                </CardBody>
            </Card>
        )
    }
}
export default communityList;