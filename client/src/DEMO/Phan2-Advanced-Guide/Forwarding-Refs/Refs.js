import React from "react";
export default class Refs extends React.Component {
    constructor(props) {
        super(props);
        //Khởi tạo một ref
        this.myRef = React.createRef();
    }
    handleClick = () => {
        //thuộc tính current trong refs cho phép chúng ta chỉ định element hiện tại được tham chiếu.
        this.myRef.current.style.color = "red";
        this.myRef.current.focus();
     }
    render() {
        return (
            <div>
                <input
                    name="email"
                    onChange={this.onChange}
                    ref={this.myRef}
                    type="text"
                />
                <button onClick={this.handleClick}>
                    Focus Input
                </button>
            </div>

        );
    }
}