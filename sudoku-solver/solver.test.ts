import Solver from './solver';

describe('constructor tests', () => {
    const table: [string, Record<string, number>][] = [
        ['empty grid', {}],
        ['some values', { "1,9": 1, "4,6": 9, "9,1": 5, "5,7": 2 }]
    ];

    test.each(table)('%s', (_, data) => {
        const entries: [number, number, number][] = [];
        for (const d of Object.keys(data)) {
            const v = d.split(",");
            entries.push([Number(v[0]), Number(v[1]), data[d]]);
        }
        const s = new Solver(entries);

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cmp = data[`${i + 1},${j + 1}`] ? [data[`${i + 1},${j + 1}`]] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
                expect(s.grid[i][j]).toStrictEqual(cmp);
            }
        }
    });
});