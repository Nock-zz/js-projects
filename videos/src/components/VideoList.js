import React from 'react';
import VideoItem from './VideoItem';

const VideoList = (props) => {
    const renderedList = props.videos.map((video) => {
        return (
                <div key={video.id.videoId}>
                    <VideoItem video={video} onVideoSelect={props.onVideoSelect}/>
                </div>
        );
    });
    return (
        <div className="ui relaxed divided list">
            {renderedList}
        </div>
    );
}


export default VideoList;
