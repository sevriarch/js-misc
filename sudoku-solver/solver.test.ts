import Solver from "./solver";

describe("constructor tests", () => {
    const errtable: [string, [number, number, number][]][] = [
        ["x too low", [[0, 5, 1]]],
        ["x too high", [[10, 5, 1]]],
        ["x not an integer", [[5.5, 5, 1]]],
        ["y too low", [[5, 0, 1]]],
        ["y too high", [[5, 10, 1]]],
        ["y not an integer", [[5, 5.5, 1]]],
        ["value too low", [[5, 5, 0]]],
        ["value too high", [[5, 5, 10]]],
        ["value not an integer", [[5, 5, 5.5]]],
        ["duplicate entries", [[5, 5, 5], [4, 4, 4], [5, 5, 5]]]
    ];

    test.each(errtable)("%s throws an error", (_, data) => {
        expect(() => new Solver(data)).toThrow();
    });

    const table: [string, Record<string, number>][] = [
        ["empty grid", {}],
        ["some values", { "1,9": 1, "4,6": 9, "9,1": 5, "5,7": 2 }]
    ];

    test.each(table)("%s", (_, data) => {
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