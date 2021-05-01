// author : Het Brahmbhatt
import React, { Component } from 'react'
import Navbar from '../Navbar/navbar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
class Post extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.data);
        this.state = {
            _id : this.props.data._id,
            _id : this.props.data._id,
            _id : this.props.data._id,
            _id : this.props.data._id,
            _id : this.props.data._id,
            _id : this.props.data._id,

        }
    };


    render() {
        return (
            <div>
            </div>
        )
    }
}
export default Post