import { sortGames } from "./sortGames";

const testGames = [
    {
        id: 1,
        name: "Football Manager",
        price: 49.99,
        release_date: "2017-03-03",
    },
    {
        id: 2,
        name: "Among Us",
        price: 3.99,
        release_date: "2018-06-15",
    },
    {
        id: 3,
        name: "League of Legends",
        price: 0.00,
        release_date: "2009-03-06",
    },
];

describe("sortGames", () => {
    test("testCorrectlySortedByNameAscending", () => {
        const result = sortGames(testGames, "nameAscending").map((game) => game.name);
        expect(result).toEqual(["Among Us", "Football Manager", "League of Legends"]);
    });
})