import React from 'react';
import './Inheritance.css';
class Label extends React.Component {
    constructor(props) {
        super(props);
        this.className = 'plain-label';
    }
    render() {
        return <span className={this.className}>
            {this.props.children}
        </span>
    }
}

class SuccessLabel extends Label {
    constructor(props) {
        super(props);
        this.className = this.className + ' success-label';
    }
}

class SuccessLabelWithIcon extends Label {
    constructor(props) {
        super(props);
        this.className = this.className + ' success-label';
    }
    render() {
        return <div>
            {super.render()}<span>&#9650;</span>
        </div>
    }
}

class ErrorLabel extends Label {
    constructor(props) {
        super(props);
        this.className = this.className + ' error-label';
    }
}


class Inheritance extends React.Component {
    render() {
        return (
            <div className="Inheritance">
                <Label> Nhom B- Label </Label>
                <hr />
                <SuccessLabel> Success Label Inheritance label </SuccessLabel>
                <hr />
                <ErrorLabel> Error Label Inheritance label </ErrorLabel>
                <hr />
                <SuccessLabelWithIcon> Success Label with Icon Inheritance label </SuccessLabelWithIcon>
            </div>
        )

    }

}
export default Inheritance;