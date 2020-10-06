import React from 'react';

class VideoDetail extends React.Component {
    render() {
        const {selectedVideo} = this.props;
        if (!selectedVideo) return <div>loading....</div>;
        const {id: {videoId}} = selectedVideo;
        const videoSrc = `https://www.youtube.com/embed/${videoId}`
        return (
            <div>
                <div className="ui embed">
                    <iframe title="video player" src={videoSrc}/>
                </div>
                <div className="ui segment">
                    <h4 className="ui header">
                        {this.props.selectedVideo.snippet.title}
                    </h4>
                    <p>{this.props.selectedVideo.snippet.description}</p>
                </div>
            </div>
        );
    }
}

export default VideoDetail;
