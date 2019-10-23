function arr(obj) {

  if (obj.indexOf("[") != -1) {
    obj = JSON.parse(obj).join(',');
  }
  return obj
}
export default arr
