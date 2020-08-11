const getDaysBetweenDates = (firstDate, secondDate) => {
    const day = 1000 * 60 * 60 * 24;
    const difference = firstDate - secondDate;
    return Math.round(difference/day)
};

export default getDaysBetweenDates