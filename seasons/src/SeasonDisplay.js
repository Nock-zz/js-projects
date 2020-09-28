import './SeasonDisplay.css'
import React from 'react';

function getSeason(lat, month) {
    if (month > 2 && month < 9) {
        return lat > 0 ? 'summer' : 'winter';
    } else {
        return lat > 0 ? 'winter' : 'summer';
    }
}

const SeasonDisplay = (props) => {
    const season = getSeason(props.lat, (new Date()).getMonth());
    
    const seasonConfig = {
        summer: {
            text: 'Let\'s hit the beach',
            iconName: 'sun'
        },
        winter: {
            text: 'Brr, it is chilly',
            iconName: 'snowflake'
        }
    }
    
    const {text, iconName} = seasonConfig[season];
//    const text = (season === 'winter') ? "Brr - It's chilly" : "Let's hit the beach"
//    const icon = (season === 'winter') ? "snowflake" : "sun"
return (
    <div className={`season-display ${season}`}>
    <i className={`icon-left massive ${iconName} icon`}></i>
        <h1>{text}</h1>
    <i className={`icon-right massive ${iconName} icon`}></i>
        </div>
);
};

export default SeasonDisplay
