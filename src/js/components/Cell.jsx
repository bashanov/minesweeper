import React from 'react';

class Cell extends React.Component {
    handleClick() {
        if (this.props.data.isOpened === false) {
            this.props.onClick(this.props.data);
        }
    }

    getClassName() {
        let className = 'square closed';
        if (this.props.data.isOpened) {
            className = 'square';
            if (this.props.data.isNumber) {
                className = 'square number';
            }
        }
        return className;
    }

    render() {
        return (
            <div
                className={this.getClassName() + ' ' + this.props.data.animation}
                onClick={() => this.handleClick()}
                onContextMenu={(e) => this.props.onContextMenu(e, this.props.data)}
            >
                {this.props.data.label}
            </div>
        )
    }
}

export default Cell;