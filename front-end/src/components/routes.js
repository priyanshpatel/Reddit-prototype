import React, { Component } from 'react'
import { Route } from "react-router-dom"
import Navbar from './navbar/navbar'
import CreatePost from './posts/createPost';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Navbar} />
                <Route  path="/submit/:id" component={CreatePost} />




            </div>
        )
    }
}
export default Routes;