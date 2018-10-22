import React from 'react';

class GameInfo extends React.Component {
    constructor(props) {
        super();
        this.state = {
            info: [
                {name: "Level", text: "\ud83d\udd79\ufe0f", prop: "game", item: "level", animate: ""},
                {name: "Life", text: "\u2764\ufe0f", prop: "game", item: "life", animate: ""},
                {name: "Bombs", text: "\ud83d\udca3", prop: "board", item: "bombsCount", animate: ""},
                {name: "Opened", text: "\ud83d\udd0d", prop: "board", item: "cellsOpened", animate: ""},
                {name: "Scores", text: "\ud83c\udfc6", prop: "game", item: "scores", animate: ""},
            ],
            props: props
        }
    }

    render() {
        return (
            <div className="info">
                {this.state.info.map((item) => {
                    return (
                        <div key={item.name}>
                            <b title={item.name}>{item.text} {this.props[item.prop][item.item]}</b>
                            <p className="desc">{item.name}</p>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default GameInfo;