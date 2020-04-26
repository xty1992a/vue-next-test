const obj = {
  a: [1, 2, { b: 1 }],
  b: {
    c: {
      d: 1,
      e: false,
    },
  },
  c: 1,
  d: undefined,
  e: null,
};

const toString = (obj) => Object.prototype.toString.apply(obj);

function isObj(obj) {
  return toString(obj) === "[object Object]";
}
function isArray(arr) {
  return Array.isArray(arr);
}
function isNull(value) {
  return typeof value === "object" && value === null;
}
function isPlain(value) {
  if (isNull(value)) return true;
  return ["number", "string", "boolean", "undefined"].includes(typeof value);
}

function clone(obj) {
  if (isObj(obj)) {
    return Object.keys(obj).reduce((pre, key) => {
      const value = obj[key];
      if (isPlain(value)) return { ...pre, [key]: value };
      return { ...pre, [key]: clone(value) };
    }, {});
  }
  if (isArray(obj)) {
    return obj.map((value) => {
      if (isPlain(value)) return value;
      return clone(value);
    });
  }
  return obj;
}

const obj2 = clone(obj);
obj2.a[2].b = 2;
obj2.b.c.d = 3;
obj2.b.c.e = true;
console.log(obj2);
console.log(obj);
