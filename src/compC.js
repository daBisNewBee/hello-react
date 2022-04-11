import React, {Component} from "react";

class ClassComponent extends Component {
    state = {number : 0}

    componentDidMount() {
        this.setState({ number:10});
    }

    render() {
        const {number} = this.state;
        return (
            <div>
                <p>ClassComponent!</p>
                <p>State is {number}</p>
            </div>
        );
    }
};

export {ClassComponent};
