export default function timer(ref) {
    clearTimeout(ref.current);
    return new Promise(resolve => ref.current = setTimeout(resolve, 500))
}