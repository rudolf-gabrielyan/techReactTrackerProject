export default string => {
    const date = new Date(string);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
};