import React from 'react';

class Foo extends React.Component{
    constructor( props ){
        super( props );
    }
    handleClick(event){
        console.log(this); // 'this' is undefined
    }
    render(){
        return (
            <button type="button" onClick={this.handleClick} >
                Click Me
            </button>
        );
    }
}
export default Foo;
