export default function addLineBreaksToString(string) {
    const splitedString = string.split(' ');
    const spaceCounts = splitedString.length - 1;
    if(spaceCounts > 1) {
        const indexOfWordToAddLineBreak = Math.ceil(splitedString.length/2) - 1;
        let firstLine = '';
        let secondLine = '';
        splitedString.forEach((string, index) => {
            if(index <= indexOfWordToAddLineBreak) {
                firstLine = firstLine + ' ' + string;
            }else {
                secondLine = secondLine + ' ' + string;
            };
        });
        return [firstLine, secondLine]
    }else {
        return splitedString.join(' ')
    }
}