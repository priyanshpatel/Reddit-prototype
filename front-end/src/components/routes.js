import React, { Component } from 'react'
import { Route } from "react-router-dom"
import Navbar from './navbar/navbar'


class Routes extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />





            </div>
        )
    }
}
export default Routes;