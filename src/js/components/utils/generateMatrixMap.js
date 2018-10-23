export default function generateMatrixMap(width, height, bombsCount, cellTemplate) {
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