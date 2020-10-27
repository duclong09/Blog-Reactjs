import React from 'react';

var newData = {
   data: 'Data TranCongHoa',
}

var MyHOC = (ComposedComponent) => class extends React.Component {
   componentDidMount() {
      this.setState({
         datahoa: newData.data
      });
   }
   render() {
      return <ComposedComponent {...this.props} {...this.state} />;
   }
};

class MyComponent extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.datahoa}</h1>
         </div>
      )
   }
}

export default MyHOC(MyComponent);