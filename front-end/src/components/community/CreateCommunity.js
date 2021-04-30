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
import Navbar from "../Navbar/Navbar";
import { Link } from 'react-router-dom';
import cookie from "react-cookies";
class CreateCommunity extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            error: false
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
                formData.append(`commmunityAvatar[${i}]`, files[i])
            }
            let obj = {
                communityName: this.state.communityName,
                description: this.state.description,
                rules: this.state.rules,
                members: [
                    {
                        _id: cookie.load('id')
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
        this.setState({ communityCover: e.target.files })
    }
    handleAddFields = () => {
        this.setState({ rules: [...this.state.rules, { id: uuidv4(), title: '', description: '' }] })
    }
    render() {
        console.log(this.state);
        let error = null
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
                                <span><strong><div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "20px" }}>Create a Community</div></strong></span>
                                <hr />
                            </div>
                        </div>
                        <div className="row" style={{ marginLeft: "2%" }}>
                            <div className="col-5">
                                <span><strong><div className="required" style={{ fontSize: "16px" }}>Name</div></strong></span>

                            </div>
                        </div>
                        <div className="row" style={{ marginLeft: "2%" }}>
                            <textarea style={{ marginLeft: "1%" }} id="w3review" name="communityName" onChange={this.handleOtherChange} rows="2" cols="60">
                            </textarea>
                        </div>
                        <div className="row" style={{ marginLeft: "2%", marginTop: "5%" }}>
                            <div className="col-5">
                                <span><strong><div className="required">Description</div></strong></span>
                            </div>
                        </div>
                        <div className="row" style={{ marginLeft: "2%" }}>
                            <textarea style={{ marginLeft: "1%" }} id="w3review" name="description" onChange={this.handleOtherChange} rows="2" cols="60">
                            </textarea>
                        </div>
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
                                    <button type="submit" className="btn btn-danger" style={{ backgroundColor: "#0079d3", border: "1px solid #0079d3", marginLeft: "40%", borderRadius: "60px", marginTop: "5%", cursor: "pointer" }} onSubmit={this.handleFormSubmit}>Create Community</button>
                                </form>
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
    }

}
const matchDispatchToProps = (dispatch) => {
    return {
        createCommunityAction: (data) => dispatch(createCommunityAction(data)),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(CreateCommunity)