function valid_value(n: number): boolean {
    return typeof n === 'number' && isFinite(n) && n % 1 === 0 && n >= 1 && n <= 9;
}

export default class Solver {
    readonly grid: number[][][];

    constructor(tiles: [number, number, number][]) {
        this.grid = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.grid[i] = new Array(9);
            for (let j = 0; j < 9; j++) {
                this.grid[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9].slice();
            }
        }

        tiles.forEach(([x, y, val]) => {
            if (!valid_value(x) || !valid_value(y) || !valid_value(val)) {
                throw new Error(`invalid tile definition: [${x}, ${y}, ${val}]`);
            }

            x--;
            y--;

            if (this.grid[x][y].length === 1) {
                throw new Error(`tile [${x}, ${y}] was defined twice, as ${this.grid[x][y][0]} and then as ${val}`);
            }

            this.grid[x][y] = [val];
        });
    }
}