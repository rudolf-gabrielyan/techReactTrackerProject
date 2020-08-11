export default function getEmployeeSliderSelectedValue(selectedSliderValue) {
    const sizes = {
        '11': 'Self-employed',
        '12': '1-10 employees',
        '23': '11-50 employees',
        '34': '51-200 employees',
        '45': '201-500 employees',
        '56': '501-1000 employees',
        '67': '1001-5000 employees',
        '78': '5001-10,000 employees',
        '89': '10,001+ employees',
    };

    if(selectedSliderValue.length === 1) {
        return Object.keys(sizes).find(key => sizes[key] === selectedSliderValue[0]).split('').map(value => +value)
    }else {
        const startValue = +Object.keys(sizes).find(key => sizes[key] === selectedSliderValue[0])[0];
        const endValue = +Object.keys(sizes).find(key => sizes[key] === selectedSliderValue[selectedSliderValue.length - 1])[1];
        return [startValue, endValue]
    }
}