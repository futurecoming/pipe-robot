export const afterCurrentTime = function(value) {
    let now = new Date().valueOf();
    let time = new Date(value).valueOf();
    if (time > now) {
      return true;
    } else {
      return false;
    }
}


