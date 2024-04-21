
function mqStorageSetString(key, val) {
  localStorage.setItem("mq_" + key, val)
}

function mqStorageGetString(key, _default) {
  return localStorage.getItem("mq_" + key) || _default
}

function mqStorageSetJSON(key, val) {
  localStorage.setItem("mq_" + key, JSON.stringify(val));
}

function mqStorageGetJSON(key, _default) {
  var res = localStorage.getItem("mq_" + key);
  return (res?JSON.parse(res):_default);
}

