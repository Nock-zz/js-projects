// import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// compose the JSX code 

const App = () => {
const buttonText = "Click me!"
return <div>
      <label className="label" htmlFor="name">
         Enter Name:
      </label>
      <input type="text" id="name"/>
      <button style={{backgroundColor:'blue', color:'white'}}>{buttonText}</button>
      </div>;
};

// render the result to the DOM using ReactDOM
ReactDOM.render(
<App />,
document.querySelector('#root')
);
