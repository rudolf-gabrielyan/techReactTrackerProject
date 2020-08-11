export default function getValueForEmployeeSlider(sliderValue) {
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

    if(sizes[sliderValue.join('')] !== undefined) {
        return [ sizes[sliderValue.join('')] ]
    }else {
        const cases = [];
        for(let i = sliderValue.join('')[0]; i <= sliderValue.join('')[1]; i++) {
            cases.push(i);
        };
        const keys = [];
        for(let i = 0; i <= cases.length; i++) {
            if(cases[i + 1] !== undefined) {
                if(cases[i] == 1) keys.push('' + cases[i] + cases[i]);
                keys.push('' + cases[i] + cases[i + 1]);
            };
        };
        if(keys.length) {
            return keys.map(key => sizes[key])
        }else {
            return []
        }
    }
}