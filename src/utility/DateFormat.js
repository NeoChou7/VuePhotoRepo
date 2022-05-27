
function convertYYYYMMDDHHMMtoDate (strDate) {
  let year = strDate.slice(0, 4)
  let month = strDate.slice(4, 6)
  let day = strDate.slice(6, 8)
  let hour = strDate.slice(8, 10)
  let min = strDate.slice(10, 12)
  return year + '/' + month + '/' + day + ' ' + hour + ':' + min
}

let DateFormat = {}
DateFormat.convertYYYYMMDDHHMMtoDate = convertYYYYMMDDHHMMtoDate
export default DateFormat
