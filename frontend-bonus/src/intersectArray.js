/**
 * intersectArray
 * input 2 arrays [1,2,3,4,5] [2,4,6,8,10]
 * output [2,4]
 * 
 * @param {number[]} arr1 
 * @param {number[]} arr2 
 * @returns 
 */
const intersectArrayWithSet = (arr1, arr2) => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...set1].filter((value) => set2.has(value));
};

module.exports = intersectArrayWithSet;