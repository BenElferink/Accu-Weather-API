export function getStorage(key, defaultValue) {
  let storage = JSON.parse(window.localStorage.getItem(key));
  let data;

  if (storage == null) {
    data = defaultValue;
    console.log('💡 -GENERATED-', data);
  } else {
    data = storage;
    console.log(`⤴️ -LOADED- localStorage: ${key}`, data);
  }

  if (typeof data === 'function') {
    return data();
  } else {
    return data;
  }
}

export function setStorage(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
  console.log(`⤵️ -SAVED- localStorage: ${key}`, data);
}
