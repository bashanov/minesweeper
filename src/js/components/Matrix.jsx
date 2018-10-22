import React from 'react';
import Cell from './Cell.jsx';

class Matrix extends React.Component {
    render() {
        let rows = [];
        for (let y = 1; y <= this.props.height; y++) {
            let cells = [];
            for (let x = 1; x <= this.props.width; x++) {
                cells.push(<Cell
                    key={y * this.props.height + x}
                    data={this.props.map[y][x]}
                    onClick={this.props.onClick}
                    onContextMenu={this.props.onContextMenu}
                />)
            }
            rows.push(<div key={"row-" + y} className="clearfix">{cells}</div>);
        }
        return <div className={this.props.active ? "board" : "board disabled"}>{rows}</div>;
    }
}

export default Matrix;

