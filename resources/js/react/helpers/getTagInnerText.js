export default function getTagInnerText(string = '') {
    const regExp = /(<([^>]+)>)/ig;
    return string.replace(regExp, '')
}