// Created by Priyansh Patel

import React, { Component } from 'react';
import Gallery from "react-grid-gallery";

class ImageThumbnail extends Component {
    constructor(props){
        super(props);
        this.state = {
            communityAvatar: this.props.data,
        }
    }

    componentDidMount() {
        console.log("----------inside ImageThumbnail component-------------", this.props.data);
    }

    render() {
        let imageObj = {}
        let imageList = []
        if(this.state.communityAvatar.length !== 0){
            // for (let i = 0; i < this.state.communityAvatar.length; i++){}
            for (const image of this.state.communityAvatar) {
                imageObj = {}
                imageObj.src = image
                imageObj.thumbnailWidth = 50
                imageObj.thumbnailHeight = 50
                imageList.push(imageObj)
            }
        }
        return (
            <Gallery
                images={imageList}
                enableLightbox={true}
                // maxRows={3}
                backdropClosesModal
                // currentImage={3}
                // isOpen={ true}
            />
        )
    }
}

export default ImageThumbnail;