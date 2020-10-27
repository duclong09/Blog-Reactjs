
  import React from "react";
//Component Con
const MyInput = React.forwardRef((props, ref) => {
    return(<input name={props.name} ref={ref} />);
 });
 // Component Cha
 const MyComponent = () => {
    let ref = React.createRef();
    return (
      <MyInput
        name="email"
        ref={ref}
      />
    );
 }
 export default MyInput;
