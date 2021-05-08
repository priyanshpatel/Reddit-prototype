import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, FormGroup } from 'reactstrap';
import classnames from 'classnames';
import './communityModUsersList.css';

class CommunityModUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
        }
    }
    setActiveTab = (tab) => {
        this.setState({
            activeTab: tab
        })
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) this.setActiveTab(tab)
        if (tab === '1') {
            //text
            this.setState({
                type: "text",
                pictures: [],
                link: ""
            })
        }
        else if (tab === '2') {
            //image
            this.setState({
                type: "image",
                description: ""
            })
        } else {
            //link
            this.setState({
                type: "link",
                pictures: [],
                description: ""
            })
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: "rgb(218,224,230)", height: "1000px" }}>
                <span onClick={this.props.closePopUp} style={{float:"right", marginRight:"1%", marginTop:"1%"}}><i class="fas fa-times closeButtonIcon"></i></span>
                <div className="post-tabs-container">
                    <div class="create-post-header">
                        Community Users
                    </div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggleTab('1'); }}
                            >
                                Join Requests
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggleTab('2'); }}
                            >
                                Members
                                </NavLink>
                        </NavItem>
                        
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="6">
                                    <Card body>
                                        <img src="/logo192.png" alt="Avatar" class="com-avatar" /> <span class="com-name">RandomUser</span>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="6">
                                    <Card body>
                                        <img src="/logo192.png" alt="Avatar" class="com-avatar" /> <span class="com-name">RandomUser</span>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        )
    }
}

export default CommunityModUsersList