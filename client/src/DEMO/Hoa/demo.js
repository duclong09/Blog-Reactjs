import React from 'react';
class Hoa extends React.Component {
    constructor(props) {
      super(props);
      this.state = {hoa: new Date()};
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.props.state}.</h2>
        </div>
      );
    }
  }
export default Hoa;