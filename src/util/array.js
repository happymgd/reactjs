import cloneDeep from 'lodash/cloneDeep'

export function chunkData (data, chunkSize) {

if(!Array.isArray(data)){
    return []
}
  const clonedData = cloneDeep(data);
  var results = [];
  while (clonedData.length) {
    results.push(clonedData.splice(0, chunkSize));
  }
  return results;
};


export function flattenArray(arr){
  if(!Array.isArray(arr)){
    return []
  }
  return arr.flat()
}



export function safeGet (value, ...path) {
  return path.reduce((prev, prop) => {
    if (prev && prev.hasOwnProperty(prop)) {
      return prev[prop];
    } else {
      return null;
    }
  }, value);
};

export function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
}
export function replaceAt(array, index, value) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}


export function randColor(colorList, index ){
  const len=colorList.length
  const idx=index <=len ?index: Math.floor(Math.random() *  len);
  return colorList[idx]
}