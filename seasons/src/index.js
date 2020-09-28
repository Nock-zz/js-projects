import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


class App extends React.Component {
    
        state = {
            lat: null,
            errorMessage: ''
        };

    componentDidMount() {
 
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude}),
            (err) => this.setState({errorMessage: err.message})
        );
    }

    renderContent() {
        if (this.state.lat && ! this.state.errorMessage) {
        return <SeasonDisplay lat={this.state.lat}/>
        }
        else if (!this.state.lat && this.state.errorMessage){
                return <div>Error:{this.state.errorMessage}</div>
    }
    else  {
        return <Spinner message="Please accept request to use your location" />
    }
    }


    render() {
        return(
        <div>
            {this.renderContent()};
        </div>
        );
}
}
ReactDOM.render(<App />,
    document.querySelector('#root')
);
