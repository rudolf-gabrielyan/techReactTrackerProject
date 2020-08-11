const modifyStringForUrl = string => {
    string = string.toLowerCase();
    string = string.replace(/\s/g, '_');
    return string
}

export default modifyStringForUrl