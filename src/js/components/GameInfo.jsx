import React from 'react';
import emoji from './utils/emoji';

class GameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: {name: "Level", emoji: emoji("joystick"), animated: true},
            life: {name: "Life", emoji: emoji("redHeart"), animated: true},
            bombsCount: {name: "Bombs", emoji: emoji("bomb")},
            cellsOpened: {name: "Opened", emoji: emoji("magnifier")},
            scores: {name: "Scores", emoji: emoji("trophy")}
        };
    }

    render() {
        return (
            <div className="info">
                {
                    Object.keys(this.state).map((k) => {
                        return (
                            <div key={this.state[k].name + '-' + this.props[k]}
                                 className={this.state[k].animated !== undefined ? "animated flash" : ''}>
                                <b title={this.state[k].name}>{this.state[k].emoji} {this.props[k]}</b>
                                <p className="desc">{this.state[k].name}</p>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default GameInfo;