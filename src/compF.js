import React from "react";

const FunctionalComponent = ({ number = 10 }) => {
    return (
        <div>
            <p>Functional Component!</p>
            <p>State is {number}</p>
        </div>
    );
}

export default FunctionalComponent;

