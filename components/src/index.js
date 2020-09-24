import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail'
import ApprovalCard from './ApprovalCard'

// Composition

const App = () => {
    return (
        <div className="ui container comments">
            <ApprovalCard>
                <CommentDetail author="Sam" avatar={faker.image.avatar()} timeAgo="Today at 4:45PM" commentText="Hi" />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail author="Alex" avatar={faker.image.avatar()} timeAgo="Today at 2:00 AM" commentText="I like beer" />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail author="Jane" avatar={faker.image.avatar()} timeAgo="Yesterday at 5:00PM" commentText="Jane or James?" />
            </ApprovalCard>
        </div>
    );
};

// Render

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
