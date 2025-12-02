// Sort games based on selected sorting option
export const sortGames = (gamesToSort, sortOption) => {
    const sortedGames = [...gamesToSort];

    switch (sortOption) {
        case "nameAscending":
            // https://www.w3schools.com/jsref/jsref_localecompare.asp
            sortedGames.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "nameDescending":
            sortedGames.sort((a, b) => b.name.localeCompare(a.name));
            break;

        case "priceLowestToHighest":
            sortedGames.sort((a, b) => a.price - b.price);
            break;

        case "priceHighestToLowest":
            sortedGames.sort((a, b) => b.price - a.price);
            break;

        case "releaseNewestToOldest":
            sortedGames.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            break;

        case "releaseOldestToNewest":
            sortedGames.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
            break;
    }   

    return sortedGames;
}