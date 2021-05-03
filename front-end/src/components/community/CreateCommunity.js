//author-Het 
import React, { Component } from 'react'
import community_page from '../../images/community-page.png'
import './CreateCommunity.css'
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import createCommunityAction from '../../actions/community/createCommunityAction';
import { connect } from "react-redux";
import getByIDCommunityAction from '../../actions/community/getCommunityByID';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Navbar from "../Navbar/navbar";
import { Link } from 'react-router-dom';
import cookie from "react-cookies";
class CreateCommunity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            communityAvatar: [],
            communityCover: "",
            communityName: "",
            description: "",
            rules: [
                {
                    id: uuidv4(),
                    title: "",
                    description: ""
                }
            ],
            error: false,
            title: "",
            buttonName: "",
            rulesTitle: ""
        }
    }
    componentDidMount() {
        document.title = "Create a Community"
    }
    handleRemoveFields = id => {
        const values = [...this.state.rules];
        values.splice(values.findIndex(value => value.id === id), 1);
        this.setState(
            {
                rules: values
            }
        )
    }
    handleOtherChange = inp => {
        {
            this.setState({
                [inp.target.name]: inp.target.value,
                error: false
            })
        }

    }
    handleChangeInput = (id, event) => {
        const newRules = this.state.rules.map(i => {
            console.log(id);

            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })
        this.setState(
            {
                rules: newRules
            }
        )
    }
    async componentDidMount() {
        console.log(this.props.match.params.id)
        if (this.props.match.params.id != null) {
            this.props.getByIDCommunityAction(this.props.match.params.id).then(response => {
                if (this.props.getCommunityData.data.rules.length == 0) {
                    this.setState(
                        {
                            communityName: this.props.getCommunityData.data.communityName,
                            description: this.props.getCommunityData.data.description,
                            title: "Edit a Community",
                            buttonName: "Update Community",
                            rules: [
                                {
                                    id: uuidv4(),
                                    title: "",
                                    description: ""
                                }
                            ],
                            communityCover: this.props.getCommunityData.data.communityCover,
                            communityAvatar: this.props.getCommunityData.data.communityAvatar,
                            communityAvatarLength: this.props.getCommunityData.data.communityAvatar.length,
                            rulesTitle: "Edit Rules"

                        }
                    )
                }
                else {
                    this.setState(
                        {
                            // rules : this.props.getCommunityData.rules
                            communityName: this.props.getCommunityData.data.communityName,
                            description: this.props.getCommunityData.data.description,
                            title: "Edit a Community",
                            buttonName: "Update Community",
                            rules: this.props.getCommunityData.data.rules,
                            communityCover: this.props.getCommunityData.data.communityCover,
                            communityAvatar: this.props.getCommunityData.data.communityAvatar,
                            communityAvatarLength: this.props.getCommunityData.data.communityAvatar.length,
                            rulesTitle: "Edit Rules"


                        }
                    )
                }
            })
        }
        else if (this.props.match.params.id == undefined) {
            this.setState({
                commmunityAvatar: [],
                communityCover: "",
                communityName: "",
                description: "",
                rules: [
                    {
                        id: uuidv4(),
                        title: "",
                        description: ""
                    }
                ],
                error: false,
                title: "Create a Community",
                buttonName: "Create Community",
                rulesTitle: "Add Rules"


            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.communityName == "" || this.state.description == "") {
            this.setState({
                error: true
            })
        }
        else {
            const formData = new FormData();
            const files = this.state.commmunityAvatar;
            for (let i = 0; i < files.length; i++) {
                formData.append(`communityAvatar`, files[i])
            }
            formData.append(`communityCover`, this.state.communityCover)

            let obj = {
                communityName: this.state.communityName,
                description: this.state.description,
                rules: this.state.rules,
                members: [
                    {
                        _id: cookie.load('userID')
                    }
                ]
            }
            formData.append("community", JSON.stringify(obj));
            this.props.createCommunityAction(formData).then(response => {

            })
        }

    };
    fileSelectedHandler = (e) => {
        this.setState({ commmunityAvatar: [...this.state.commmunityAvatar, ...e.target.files] })
    }
    fileAvatarHandler = (e) => {
        this.setState({ communityCover: e.target.files[0] })
    }
    handleAddFields = () => {
        this.setState({ rules: [...this.state.rules, { id: uuidv4(), title: '', description: '' }] })
    }
    render() {
        console.log(this.state);
        let error = null;
        let fileDivision = null;
        let avatarImageDivision = this.state.communityAvatar.map((data, index) => (
            <div>
                <CarouselProvider
                    naturalSlideWidth={10}
                    naturalSlideHeight={10}
                    totalSlides={this.state.communityAvatarLength}
                >
                    <ButtonBack style={{ border: "none", backgroundColor: "white", fontSize: "20px", marginTop: "10%", float: "left" }}>&#60;</ButtonBack>
                    <ButtonNext style={{ border: "none", backgroundColor: "white", float: "right", marginTop: "10%", fontSize: "20px", }}>&#62;</ButtonNext>
                    <Slider>
                        <Slide index={index}>
                            <img src={data} style={{ position: "absolute" }} alt="" />

                        </Slide>

                        {/* <Slide index={0}>I am the first Slide.</Slide>
                            <Slide index={1}>
                                <img src={community_page} style={{ position: "absolute" }} width="100%" height="40%" alt="" />
                            </Slide>
                            <Slide index={2}>I am the third Slide.</Slide> */}
                    </Slider>
                </CarouselProvider>
            </div>
        ))
        if (this.props.match.params.id == null) {
            fileDivision = (
                <div>
                    <div className="row" style={{ marginLeft: "2%", marginTop: "5%" }}>
                        <div className="col-3">
                            <span><strong><div>Choose Multiple Images Files</div></strong></span>
                        </div>
                        <div className="col-3">
                            <span><strong><div>Choose Community Avatar</div></strong></span>
                        </div>
                    </div>

                    <div className="row" style={{ marginLeft: "2%" }}>
                        <input style={{ background: "none", border: "none" }} type="file" id="file" multiple name="file" data-show-upload="true" data-show-caption="true" onChange={this.fileSelectedHandler} />
                        <input style={{ background: "none", border: "none" }} type="file" id="file" name="file" data-show-upload="true" data-show-caption="true" onChange={this.fileAvatarHandler} />

                    </div>
                </div>
            )
        }
        else {
            fileDivision = (
                <div>
                    <div className="row" style={{ marginLeft: "2%", marginTop: "5%" }}>
                        <div className="col-3">
                            <span><strong><div>Community Cover </div></strong></span>
                        </div>
                        <div className="col-3">
                            <span><strong><div>Community Avatar</div></strong></span>
                        </div>
                    </div>
                    <div className="row" style={{ marginLeft: "2%", marginTop: "5%" }}>
                        <div className="col-3" style={{ height: "100px", width: "100px" }}>
                            <img src={this.state.communityCover} style={{ position: "absolute" }} width="100%" height="100%" alt="" />
                        </div>
                        <div className="col-3" >
                            {avatarImageDivision}
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.error) {
            error = <div style={{ 'color': 'red' }}>*Please fill all the required fields</div>
        }
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div className="row">
                    <div className="col-1">
                        <img src={community_page} style={{ position: "absolute" }} width="110%" maxHeight="160%" alt="" />
                    </div>
                    <div className="col-11">
                        <br></br><br></br><br></br><br></br>
                        <div className="row" style={{ marginLeft: "2%" }}>
                            <div className="col-5">
                                <span><strong><div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "20px" }}>{this.state.title}</div></strong></span>
                                <hr />
                            </div>
                        </div>
                        <div className="row" style={{ marginLeft: "2%" }}>
                            <div className="col-5">
                                <span><strong><div className="required" style={{ fontSize: "16px" }}>Name</div></strong></span>

                            </div>
                        </div>
                        <div className="row" style={{ marginLeft: "2%" }}>
                            <textarea style={{ marginLeft: "1%" }} id="w3review" value={this.state.communityName} name="communityName" onChange={this.handleOtherChange} rows="2" cols="60">
                            </textarea>
                        </div>
                        <div className="row" style={{ marginLeft: "2%", marginTop: "5%" }}>
                            <div className="col-5">
                                <span><strong><div className="required">Description</div></strong></span>
                            </div>
                        </div>
                        <div className="row" style={{ marginLeft: "2%" }}>
                            <textarea style={{ marginLeft: "1%" }} id="w3review" name="description" value={this.state.description} onChange={this.handleOtherChange} rows="2" cols="60">
                            </textarea>
                        </div>
                        {fileDivision}
                        <div className="row" style={{ marginLeft: "2%", marginTop: "5%" }}>
                            <div className="col-5">
                                <span><strong><div>{this.state.rulesTitle}</div></strong></span>
                                <div className="col-3">
                                    <span><strong><div>Choose Multiple Images Files</div></strong></span>
                                </div>
                                <div className="col-3">
                                    <span><strong><div>Choose Community Avatar</div></strong></span>
                                </div>
                            </div>

                            <div className="row" style={{ marginLeft: "2%" }}>
                                <input style={{ background: "none", border: "none" }} type="file" id="file" multiple name="file" data-show-upload="true" data-show-caption="true" onChange={this.fileSelectedHandler} />
                                <input style={{ background: "none", border: "none" }} type="file" id="file" name="file" data-show-upload="true" data-show-caption="true" onChange={this.fileAvatarHandler} />

                            </div>
                            <div className="row" style={{ marginLeft: "2%", marginTop: "5%" }}>
                                <div className="col-5">
                                    <span><strong><div>Add Rules</div></strong></span>
                                </div>
                            </div>
                            <div className="row" style={{ marginLeft: "2%", width: "120%" }}>
                                <div className="col-8">
                                    <form onSubmit={this.handleSubmit}>

                                        {this.state.rules.map((inputField, index) => (
                                            <div key={inputField.id}  >
                                                <input name="title" placeholder="Title" value={this.state.rules[index].title} onChange={event => this.handleChangeInput(this.state.rules[index].id, event)} />
                                                <input name="description" style={{ marginLeft: "2%" }} placeholder="Description" value={this.state.rules[index].description} onChange={event => this.handleChangeInput(this.state.rules[index].id, event)} />
                                                <IconButton disabled={this.state.rules.length === 1} onClick={() => this.handleRemoveFields(inputField.id)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={this.handleAddFields}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </div>
                                        ))}
                                        <div className="error">
                                            {error}
                                        </div>
                                        <button type="submit" className="btn btn-danger" style={{ backgroundColor: "#0079d3", border: "1px solid #0079d3", marginLeft: "40%", borderRadius: "60px", marginTop: "5%", cursor: "pointer" }} onSubmit={this.handleFormSubmit}>{this.state.buttonName}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
const matchStateToProps = (state) => {
    return {
        communityData: state.createCommunityReducer.communityData,
        getCommunityData: state.getByIDCommunityReducer.getCommunityData,

    }

}
const matchDispatchToProps = (dispatch) => {
    return {
        createCommunityAction: (data) => dispatch(createCommunityAction(data)),
        getByIDCommunityAction: (data) => dispatch(getByIDCommunityAction(data)),

    }
}

export default connect(matchStateToProps, matchDispatchToProps)(CreateCommunity)