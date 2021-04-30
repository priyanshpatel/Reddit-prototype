import React, { Component } from 'react'
import { Route } from "react-router-dom"
import Navbar from './Navbar/Navbar'
import CreatePost from './posts/createPost';
import CreateCommunity from './community/CreateCommunity'
import MyCommunity from './community/MyCommunity'
import Profile from './users/profile'
import { Profiler } from 'react';
import MyCommunities from './communities/myCommunities';
import CommunityModeration from './communities/communityModeration';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Navbar} />
                <Route path="/submit/:id" component={CreatePost} />
                <Route path="/create-community" component={CreateCommunity} />
                <Route path="/community-home-page" component={MyCommunity} />
                <Route path="/profile" component={Profile} />
                <Route path = "/my-communities" component={MyCommunities} />
                <Route path = "/my-communities-mod" component={CommunityModeration} />


            </div>
        )
    }
}
export default Routes;