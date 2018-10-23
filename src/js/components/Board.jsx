import React from 'react';
import Matrix from "./Matrix.jsx";
import generateMatrixMap from './utils/generateMatrixMap';
import emoji from './utils/emoji';

/**
 * @property {function} this.prop.callbackHandleCurrentBoard
 * @property {function} this.prop.callbackLevelUp
 * @property {function} this.prop.callbackAddScores
 * @property {function} this.prop.callbackRestartGameHandler
 * @property {function} this.prop.callbackBombHandler
 */
class Board extends React.Component {
    constructor(props) {
        super();
        this.state = Board.getNewBoard(props);
    }

    static getNewBoard(props) {
        let level = props.level;
        let width = props.settings.size + (level - 1) * 2;
        let difficult = props.settings.difficult + (level - 1) * 5;
        let height = Math.floor(width * props.settings.ratio);
        let cellsCount = width * height;
        let bombsCount = Math.round(cellsCount * difficult / 100);
        if (bombsCount < 1 && cellsCount > 1) {
            bombsCount = 1;
        }
        let map = generateMatrixMap(width, height, bombsCount, props.settings.cellTemplate);
        let newBoardState = {
            width: width,
            height: height,
            cellsCount: cellsCount,
            cellsOpened: 0,
            flagsCount: 0,
            bombsCount: bombsCount,
            map: map,
            active: true,
            settingFlags: false,
            lastClickTime: new Date()
        };
        props.callbackHandleCurrentBoard(newBoardState);
        return newBoardState;
    }

    handleClickOnCell(x, y) {
        if (this.state.active) {
            let cell = this.state.map[y][x];
            let uCell = cell;
            if (uCell.isOpened === false) {
                let forceEmpty = false;
                if (uCell.isFlag) {
                    this.handleToggleFlag(x, y);
                    forceEmpty = true;
                }
                uCell.isOpened = true;
                this.state.cellsOpened++;
                if (uCell.isBomb) {
                    this.handleBomb(uCell);
                    uCell.label = emoji("bomb");
                } else {
                    this.props.callbackAddScores(uCell.isNumber ? 2 : 1);
                    if (uCell.isNumber) {
                        uCell.label = uCell.bombsAround;
                    } else {
                        // Empty cell
                        uCell.label = forceEmpty ? '' : Board.getLabelForEmptyCell();
                        this.autoOpenClosestEmptyCells(x, y);
                    }
                    this.checkIsNeedLevelUp();
                }
                this.setState({[cell]: uCell});
            }
            this.props.callbackHandleCurrentBoard(this.state);
        }
    }

    handleToggleFlag(x, y) {
        if (this.state.active) {
            let cell = this.state.map[y][x];
            let uCell = cell;
            if (uCell.isOpened === false) {
                if (!uCell.isFlag && this.state.flagsCount >= this.state.bombsCount) {
                    return;
                }
                uCell.isFlag = !cell.isFlag;
                this.state.flagsCount += uCell.isFlag ? 1 : -1;
                uCell.label = uCell.isFlag ? emoji("flag") : Board.getLabelForEmptyCell();
                this.setState({[cell]: uCell});
            }
            this.checkIsNeedLevelUp();
        }
    }

    handleBomb(cell) {
        if (this.props.life <= 1) {
            this.setState({active: false});
        }
        this.props.callbackBombHandler();
    }

    autoOpenClosestEmptyCells(x, y) {
        for (let y2 = -1; y2 <= 1; y2++) {
            for (let x2 = -1; x2 <= 1; x2++) {
                if (y2 !== x2 !== 0) {
                    if (this.state.map[y + y2] !== undefined && this.state.map[y + y2][x + x2] !== undefined) {
                        let cell = this.state.map[y + y2][x + x2];
                        if (!cell.isOpened && !cell.isBomb && !cell.isNumber) {
                            this.handleClickOnCell(x + x2, y + y2);
                        }
                    }
                }
            }
        }
    }

    checkIsNeedLevelUp() {
        if ((this.state.cellsCount - this.state.cellsOpened - this.state.flagsCount) === 0) {
            this.props.callbackLevelUp();
        }
    }

    toggleSettingFlags() {
        this.setState({settingFlags: !this.state.settingFlags});
    }

    static getLabelForEmptyCell() {
        let arr = [
            emoji("seedling"),
            emoji("evergreenTree"),
            emoji("deciduousTree"),
            emoji("earOfRice"),
            emoji("bug"),
            emoji("blossom"),
            emoji("sunflower")
        ];
        if (Math.random() < 0.12) {
            return (arr[Math.floor(Math.random() * arr.length)]);
        } else {
            return '';
        }
    }

    handleRestartGame() {
        this.props.callbackRestartGameHandler();
    }

    render() {
        return (
            <div>
                <Matrix
                    height={this.state.height}
                    width={this.state.width}
                    map={this.state.map}
                    active={this.state.active}
                    onClick={(props) => {
                        if (this.state.settingFlags) {
                            this.handleToggleFlag(props.x, props.y);
                        } else {
                            this.handleClickOnCell(props.x, props.y);
                        }
                        this.setState({lastClickTime: new Date()});
                    }}
                    onContextMenu={(e, props) => {
                        e.preventDefault();
                        this.handleToggleFlag(props.x, props.y)
                    }}
                />
                <div className={!this.state.active ? "d-none" : ''}>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        style={{marginTop: "20px"}}
                        onClick={this.toggleSettingFlags.bind(this)}
                    >
                        You {this.state.settingFlags ? "setting " + emoji("flag") : emoji("magnifier") + " cells"}.
                        Click
                        to {this.state.settingFlags ? "open cells" : "set flags"}.
                    </button>
                </div>
                <div className={this.state.active ? "d-none" : ''}>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        style={{marginTop: "20px"}}
                        onClick={this.handleRestartGame.bind(this)}
                    >
                        Play one more time
                    </button>
                </div>
            </div>
        )
    }
}

export default Board;