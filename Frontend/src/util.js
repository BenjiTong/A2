const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

function formatDateByMode (date, modeNum) {
    // console.log(date + ' ' + modeNum)
    // console.log(typeof modeNum)
    if (+modeNum === 0) {
        return date.getFullYear()
    } else if (+modeNum === 1) {
        return months[date.getMonth()] + '-' + date.getFullYear()
    } else {
        return date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear()
    }
}

export default {
    formatDateByMode
}
