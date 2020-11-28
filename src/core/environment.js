export const isInBrowser = () => {
    if (typeof window !== 'undefined') {
        return true
    } else {
        return false
    }
}