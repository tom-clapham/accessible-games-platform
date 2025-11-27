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
    test("testCorrectlySortsByNameAscending", () => {
        const result = sortGames(testGames, "nameAscending").map((game) => game.name);
        expect(result).toEqual(["Among Us", "Football Manager", "League of Legends"]);
    });

    test("testCorrectlySortsByNameDescending", () => {
        const result = sortGames(testGames, "nameDescending").map((game) => game.name);
        expect(result).toEqual(["League of Legends", "Football Manager", "Among Us"]);
    });

    test("testCorrectlySortsByPriceHighestToLowest", () => {
        const result = sortGames(testGames, "priceHighestToLowest").map((game) => game.name);
        expect(result).toEqual(["Football Manager", "Among Us", "League of Legends"]);
    });

    test("testCorrectlySortsByPriceLowestToHighest", () => {
        const result = sortGames(testGames, "priceLowestToHighest").map((game) => game.name);
        expect(result).toEqual(["League of Legends", "Among Us", "Football Manager"]);
    });

    test("testCorrectlySortsByReleaseDateNewestToOldest", () => {
        const result = sortGames(testGames, "releaseNewestToOldest").map((game) => game.name);
        expect(result).toEqual(["Among Us", "Football Manager", "League of Legends"]);
    });

    test("testCorrectlySortsByReleaseDateOldestToNewest", () => {
        const result = sortGames(testGames, "releaseOldestToNewest").map((game) => game.name);
        expect(result).toEqual(["League of Legends", "Football Manager", "Among Us"]);
    });
})