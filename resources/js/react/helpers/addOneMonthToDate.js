export default string => {
    const date = new Date(string);
    date.setMonth(date.getMonth() + 1);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
};