function SecToMin(sec) {
  var mins = Math.floor(sec / 60)
  var secs = Math.floor(sec - mins * 60)
  if (secs < 10) {
    secs = '0' + secs
  }
  if (mins < 10) {
    mins = '0' + mins
  }
  return mins + ':' + secs
}
