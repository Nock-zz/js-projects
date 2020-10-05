ReactDOM is used to render valid html into the DOM from JSX.
This is done with the render method.
ReactDOM.render(<App />, document.querySelector('#root'));  // Here we inject the JSX <App /> element into index.html just under the root id.

React is used for JSX composition.
The basic idea is that you create your own custom elements which can be nested and also which taken properties

There are two ways to create JSX elements:
- Using functions (with a return of the JSX)

const Element = function(props) {
    return (
        <div mycolor={props.color}>Element</div>
    );


 - Using classes (with a render() method)

 class Element extends React.Component {
    render() {
        <div mycolor={this.props.color}>Element</div>
    }
 }

And you call this by setting up the top element to pass the color prop:

const App = () => {
return (
    <div><Element color="red" /></div>
);
};



Note that if you do nest elements by first creating a sub-element and then nesting it in the top element,
then you need to use props.children in the parent of the child or children.

const SubElement = () => {
return <div>SubElement</div>;
}

and App becomes:

const App = () => {
return (
    <div>
        <Element color="red">
            <SubElement/>
        </Element>    
    </div>
);
};

You also need to amend Element so to use props.children that SubElement is displayed:

 class Element extends React.Component {
    render() {
        <div mycolor={this.props.color}>
            Element
            {props.children}
        </div>
    }
 }

In JSX functions the props are a parameter wheras in JSX classes the props are class variables this.props
The advantage of classes is that classes can have state for properties that change over time.
To initialize state inside a class you can use:
state = {somethingThatChanges: '');
And Babel with transpile this into:
constructor(props) {
super(props);
this.state = {somethingThatChanges: ''};
}

But to update state you must use this.setState (which is inherited from React.Component.
The setState() method allows to to amend a particular property of this.state but will not impact other unmentioned properties of this.state.

The nice thing about props is that they can pass anything fixed including a function.
And a function can do anything - including setting state with setState.
So you can define state on a parent and then pass it a function that can be passed to the child using props. When called the function takes a parameter for an event (Change, Submit, Click etc..) of the child.
You can then use the onChange, onSubmit property to call that function delivered via props with the event on the child.
In this way the function on the parent is passed down to the child but we can still get back information about the event of the child at the parent level (from the functions parameter). So you can now use this function to amend the App (e.g. by resetting the value prop at the parent lvel or even by passing the parameter information as a prop to another component).

The pics project used this technique. The component - SearchBar - passes up the user entered keyword to App this keyword as the parameter to the onSearchSubmit callback. 
The App onSearchSubmit callback uses an unsplash query, supported by axios, to return an object arraywith information about the images and updates state {images: }. 
Finally at the App parent level, a second component - ImageList - is passed a subset of this object array {id, description, url.regular} to display as the images as JSX.

Some grid css is required to display the images in 2D.


.image-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* makes the columns an even 250px */
    gap: 5px;                                                     /* sets a gap in 2D */
    grid-auto-rows: 150px;                                        /* fixes the row height */
}

.image-list img {
    width: 275px;                                           /* set the image width */
    grid-row-end: span 2;                                   /* truncate image after 2 - need variable - rows*/
    ;
}

However, we want a variable and React allows us to do this with React.createRef().
First we set up ImageCard to produce a single image with the prop of id and image passed to it.
Then we let ImageCard render a div enclosed img with description and urls.regular from the image.
We also set up constructor() so that a imageRef=React.createRef() is created and we include this on the img as ref={imageRef}.
Now we can use this.imageRef to reach into the DOM and find that the height is given by this.imageRef.current.clientHeight but we need it to load first.
So we use componentDidMount() and then we use the addEventListener() method on this.props.imageRef .addEventListener('load', this.setSpans)
The setSpans callback will then run and it will find the height, create the spans as Math.ceil(height/150), update state with this.setState( {spans:spans} }.
We can then set a custom style on our div enclosed img with style={{ gridRowEnd: `span ${this.state.spans}` }}
It is complex but it works.


















