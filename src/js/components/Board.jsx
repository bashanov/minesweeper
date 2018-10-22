import React from 'react';
import Matrix from "./Matrix.jsx";

class Board extends React.Component {
    constructor(props) {
        super();
        this.state = this.getNewBoard(props);
    }

    getNewBoard(props) {
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
                    uCell.animation = "animated flip bomb";
                    this.handleBomb(uCell);
                    uCell.label = "\ud83d\udca3";
                } else {
                    this.props.callbackAddScores(uCell.isNumber ? 2 : 1);
                    uCell.animation = 'animated fadeIn faster';
                    if (uCell.isNumber) {
                        uCell.label = uCell.bombsAround;
                    } else {
                        // Empty cell
                        uCell.label = forceEmpty ? '' : this.getLabelForEmptyCell();
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
                uCell.label = uCell.isFlag ? '\ud83d\udea9' : this.getLabelForEmptyCell();
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

    getLabelForEmptyCell() {
        let emojis = [
            '\ud83c\udf31',
            '\ud83c\udf32',
            '\ud83c\udf33',
            '\ud83c\udf3e',
            '\ud83d\udc1b',
            '\ud83c\udf3c',
            '\ud83c\udf3b'
        ];
        if (Math.random() < 0.12) {
            return (emojis[Math.floor(Math.random() * emojis.length)]);
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
                        You {this.state.settingFlags ? "setting \ud83d\udea9" : "\ud83d\udd0d cells"}. Click
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

function generateMatrixMap(width, height, bombsCount, cellTemplate) {
    let isDebug = false;
    let map = {};
    let bombsLeft = bombsCount;
    let cellsCount = width * height;
    // Generate map
    for (let y = 1; y <= height; y++) {
        let mapRow = {};
        for (let x = 1; x <= width; x++) {
            let cell = {};
            for (let key in cellTemplate) {
                if (cellTemplate.hasOwnProperty(key)) {
                    cell[key] = cellTemplate[key];
                }
            }
            cell.x = x;
            cell.y = y;
            let isBomb = Math.floor((Math.random() * cellsCount) + 1);
            if (isBomb < bombsCount && bombsLeft > 0) {
                bombsLeft--;
                cell.isBomb = true;
                if (isDebug) {
                    cell.label = 'B';
                }
            }
            mapRow[x] = cell;
        }
        map[y] = mapRow;
    }
    // Add more bombs if needed
    if (bombsLeft > 0) {
        while (bombsLeft) {
            let randX = Math.floor((Math.random() * width) + 1);
            let randY = Math.floor((Math.random() * height) + 1);
            if (map[randY][randX].isBomb === false) {
                map[randY][randX].isBomb = true;
                bombsLeft--;
                if (isDebug) {
                    map[randY][randX].label = 'B';
                }
            }
        }
    }
    // Added numbers (count of bombs close to cell)
    for (let y = 1; y <= height; y++) {
        for (let x = 1; x <= width; x++) {
            if (map[y][x].isBomb === false) {
                let counter = 0;
                for (let y2 = -1; y2 <= 1; y2++) {
                    for (let x2 = -1; x2 <= 1; x2++) {
                        if (y2 !== x2 !== 0) {
                            if (map[y + y2] !== undefined && map[y + y2][x + x2] !== undefined && map[y + y2][x + x2].isBomb === true) {
                                counter++;
                            }
                        }
                    }
                }
                if (counter > 0) {
                    map[y][x].bombsAround = counter;
                    map[y][x].isNumber = true;
                    if (isDebug) {
                        map[y][x].label = counter;
                    }
                }
            }
        }
    }
    return map;
}

export default Board;