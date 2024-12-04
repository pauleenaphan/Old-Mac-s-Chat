const getTodaysDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth() returns month from 0 to 11
    const day = today.getDate();
    const year = today.getFullYear();

    // Return in month/day/year format
    return `${month}/${day}/${year}`;
}
module.exports = { getTodaysDate }