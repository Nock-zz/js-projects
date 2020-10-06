import React from 'react';

class SearchBar extends React.Component {
    
    state = {term: '' };

    onChange = (e) => {
        this.setState({term: e.target.value});
    };
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSearchBarSubmit(this.state.term);
    }

    render() {
        return (
            <div className="search-bar ui segment" >
                <form className="ui form" onSubmit={this.onSubmit}>
                    <div className="field"></div>
                        <label htmlFor="search">Search</label>
                        <input type="text" value={this.state.term} onChange={this.onChange} id="search" placeholder="Enter search term.."/>
                    <div/>
                </form>
            </div>
        );
    }
}



export default SearchBar;
