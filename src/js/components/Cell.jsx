import React from 'react';
let classNames = require('classnames');

class Cell extends React.Component {
    handleClick() {
        if (this.props.data.isOpened === false) {
            this.props.onClick(this.props.data);
        }
    }

    render() {
        let cellClass = classNames({
            "square": true,
            "closed": !this.props.data.isOpened,
            "number": this.props.data.isNumber,
            "animated flip bomb": this.props.data.isBomb && this.props.data.isOpened,
            "animated fadeIn": !this.props.data.isBomb && this.props.data.isOpened,
        });
        return (
            <div
                className={cellClass}
                onClick={() => this.handleClick()}
                onContextMenu={(e) => this.props.onContextMenu(e, this.props.data)}
            >
                {this.props.data.label}
            </div>
        )
    }
}

export default Cell;