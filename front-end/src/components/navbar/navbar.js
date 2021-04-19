import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from "react-router"

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div>
                Hi
            </div>
        )
    }
}
export default withRouter(Navbar);