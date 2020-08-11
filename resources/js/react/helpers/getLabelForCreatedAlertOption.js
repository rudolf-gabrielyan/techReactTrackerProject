export default function getLabelForCreatedAlertOption(option) {
    if(Array.isArray(option)) {
        if(option.length === 9) {
            return 'any employees count'
        }else if(option.length > 3) {
            return `range of ${option.slice(0, 2).join(', ')} and ${option.slice(2).length} other employees count`
        }else if(option.length == 3) {
            return `range of ${option[0]}, ${option[1]} and ${option[2]}`
        }else {
            return `range of ${option.join(' and ')}`
        };
    }else {
        if(!Object.keys(option)[0] || Object.keys(option)[0] === 'name') {
            if(!Object.keys(option)[0]) {
                return 'technology name'
            }else {
                return option.name
            };
        }else if(Object.keys(option)[1] === 'countries') {
            if(option.type === 'all') {
                return 'any country'
            }else if(option.type === 'choosen') {
                if(option.countries.length > 3) {
                    return `${option.countries.slice(0, 2).join(', ')} or in ${option.countries.slice(2).length} other countries`
                }else if(option.countries.length === 3) {
                    return `${option.countries[0]}, ${option.countries[1]} or in ${option.countries[2]}`
                }else {
                    return option.countries.join(' or in ')
                };
            }else {
                if(option.countries.length > 3) {
                    return `any country except ${option.countries.slice(0, 2).join(', ')} and ${option.countries.slice(2).length} other countries`
                }else if(option.countries.length === 3) {
                    return `any country except ${option.countries[0]}, ${option.countries[1]} and ${option.countries[2]}`
                }else {
                    return `any country except ${option.countries.join(' and ')}`
                };
            };
        }else if(Object.keys(option)[1] === 'industries') {
            if(option.type === 'all') {
                return 'any industry vertical'
            }else if(option.type === 'choosen') {
                if(option.industries.length > 3) {
                    return `${option.industries.slice(0, 2).join(', ')} or to ${option.industries.slice(2).length} other industry verticals`
                }else if(option.industries.length === 3) {
                    return `${option.industries[0]}, ${option.industries[1]} or to ${option.industries[2]}`
                }else {
                    return option.industries.join(' or to ')
                };
            }else {
                if(option.industries.length > 3) {
                    return `any industry vertical except ${option.industries.slice(0, 2).join(', ')} and ${option.industries.slice(2).length} other industry verticals`
                }else if(option.industries.length === 3) {
                    return `any industry vertical except ${option.industries[0]}, ${option.industries[1]} and ${option.industries[2]}`
                }else {
                    return `any industry vertical except ${option.industries.join(' and ')}`
                };
            };
        };
    }
}