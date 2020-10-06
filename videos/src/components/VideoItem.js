import './VideoItem.css';
import React from 'react';

class VideoItem extends React.Component {
    
    render() {
        const snippet = this.props.video.snippet;
        const {video: {snippet: {title}, snippet: {thumbnails: {medium: {url}}}}} = this.props; /* only title and url extracted - note the comma*/
        console.log("url:", url);
        console.log("title: ", title);
        return (
            <div className="video-item item" onClick={() => this.props.onVideoSelect(this.props.video)}>
                <img className="ui item" alt={snippet.title} src={snippet.thumbnails.medium.url}/>
                <div className="content">
                    <div className="header">{snippet.title}</div>
                </div>
            </div>
        );
    }
}

// const VideoItem = ({video}) => {

//     return (
//         <div>{video.snippet.title}</div>
//     );

// }

export default VideoItem;
