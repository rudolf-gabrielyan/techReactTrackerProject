export default function editStringKeyForBackend(key) {
    key = key.split('').map(char => {
        if(char !== char.toLowerCase()) {
            return '_' + char.toLowerCase()
        }else {
            return char
        }
    })
    return key.join('')
}