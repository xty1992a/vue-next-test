const list = [[1, 2, 3, 4, [5, 6, 7, 8]], 9, [[10, [11, [12, [13]]]]]];

const isArray = (arr) => Array.isArray(arr);
function flat(list) {
  if (!isArray(list)) return list;
  return list.reduce(
    (pre, value) => [...pre, ...(isArray(value) ? flat(value) : [value])],
    []
  );
}

console.log(flat(list));
