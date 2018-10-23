import React from 'react';
import Board from './Board.jsx';
import GameInfo from "./GameInfo.jsx";

class MineSweeperApp extends React.Component {
    constructor() {
        super();
        this.state = {
            level: 1,
            scores: 0,
            refreshGame: 0,
            life: 3,
            defaultBoard: {
                size: 6,
                ratio: 1.2,
                difficult: 8,
                cellTemplate: {
                    x: 0,
                    y: 0,
                    isBomb: false,
                    isNumber: false,
                    bombsAround: 0,
                    isOpened: false,
                    isFlagged: false,
                    isLife: false,
                    label: ''
                }
            },
            currentBoard: {}
        };
    }

    refreshGame() {
        this.setState({refreshGame: !this.state.refreshGame});
    }

    restartGameHandler() {
        this.setState({
            level: 1,
            scores: 0,
            life: 3,
        });
        this.refreshGame();
    }

    currentBoardHandler(props) {
        this.setState({currentBoard: props});
    }

    levelUpHandler() {
        this.setState({
            level: this.state.level + 1,
            scores: this.state.scores + (2 * this.state.level * this.state.level * 10)
        });
        this.refreshGame();
    }

    addScoresHandler(scores) {
        this.state.scores += scores * this.state.level;
    }

    bombHandler() {
        this.setState({life: this.state.life - 1});
    }

    render() {
        return (
            <div className="miner">
                <GameInfo
                    level={this.state.level}
                    life={this.state.life}
                    scores={this.state.scores}
                    bombsCount={this.state.currentBoard.bombsCount}
                    cellsOpened={this.state.currentBoard.cellsOpened}
                />
                <Board
                    settings={this.state.defaultBoard}
                    level={this.state.level}
                    life={this.state.life}
                    key={this.state.refreshGame}
                    callbackHandleCurrentBoard={this.currentBoardHandler.bind(this)}
                    callbackLevelUp={this.levelUpHandler.bind(this)}
                    callbackAddScores={(scores) => this.addScoresHandler(scores)}
                    callbackRestartGameHandler={this.restartGameHandler.bind(this)}
                    callbackBombHandler={this.bombHandler.bind(this)}
                />
            </div>
        );
    }
}

export default MineSweeperApp;