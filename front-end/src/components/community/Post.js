// author : Het Brahmbhatt
import React, { Component } from 'react'
import Navbar from '../Navbar/navbar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {
    Card, CardText, CardBody,
} from 'reactstrap';
import avatar from '../../images/avatar.png';
import './Post.css'
import { Row, Col, CardTitle } from 'reactstrap';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
class Post extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.data);
        this.state = {
            _id: this.props.data._id,
            community_id: this.props.data.community,
            createdAt: this.props.data.createdAt,
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

        }
    };

    vote(type) {
        this.setState(state => ({
            vote: state.vote === type ? 0 : type
        }));
    }
    render() {
        console.log(this.state)
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
                                <span style={{ color: "#787C7E", fontSize: "12px", marginLeft: "7%" }}>Created by u/ Darskfanatasy</span>

                                <CardTitle tag="h5" style={{ marginLeft: "7%", marginTop: "5px" }}>{this.state.title}</CardTitle>
                                {avatarImageDivision}

                                <Row style={{ backgroundColor: "#F5F5F5", height: "30px", padding: "10px", width: "103%" }}>
                                    <i class="fal fa-comment-alt"></i>                                        </Row>

                            </Col>
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
                        <span style={{ color: "#787C7E", fontSize: "12px", marginLeft: "3%" }}>Created by u/ Darskfanatasy</span>
                        <CardBody>
                            <CardTitle tag="h5">{this.state.title}</CardTitle>
                            <CardText>{this.state.description}</CardText>
                        </CardBody>
                        <Row style={{ backgroundColor: "#F5F5F5", height: "30px", padding: "10px", width: "103%" }}>
                            <i class="fal fa-comment-alt"></i>                                        </Row>

                    </Col>
                </Row>
            </Card>
        }
        else if (this.state.type == "link") {
            postDivision = <Card >
                <Row>
                    <Col xs="1" style={{ backgroundColor: "#F5F5F5" }}>{this.state.title}</Col>

                    <Col>
                        <span style={{ color: "#787C7E", fontSize: "12px", marginLeft: "3%" }}>Created by u/ Darskfanatasy</span>
                        <CardBody>
                            <CardTitle tag="h5">{this.state.title}</CardTitle>
                            <CardText>
                                <a href={this.state.description}></a>

                            </CardText>
                        </CardBody>
                        <Row style={{ backgroundColor: "#F5F5F5", height: "30px", padding: "10px", width: "103%" }}>
                            <i class="fal fa-comment-alt"></i>                                        </Row>

                    </Col>
                </Row>
            </Card>
        }
        return (
            <div style={{ marginTop: "10%" }}>
                {postDivision}
            </div>
        )
    }
}
export default Post