import React from 'react';
import emoji from './utils/emoji';

class GameInfo extends React.Component {
    constructor(props) {
        super();
        this.state = {
            info: [
                {name: "Level", text: emoji("joystick"), item: "level", animate: ""},
                {name: "Life", text: emoji("redHeart"), item: "life", animate: ""},
                {name: "Bombs", text: emoji("bomb"), prop: "currentBoard", item: "bombsCount", animate: ""},
                {name: "Opened", text: emoji("magnifier"), prop: "currentBoard", item: "cellsOpened", animate: ""},
                {name: "Scores", text: emoji("trophy"), item: "scores", animate: ""},
            ],
            props: props
        }
    }

    render() {
        return (
            <div className="info">
                {
                    this.state.info.map((item) => {
                        let p = this.props["game"];
                        if (item["prop"] !== undefined) {
                            p = p[item["prop"]];
                        }
                        return (
                            <div key={item.name}>
                                <b title={item.name}>{item.text} {p[item.item]}</b>
                                <p className="desc">{item.name}</p>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default GameInfo;