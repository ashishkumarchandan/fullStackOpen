const reverse = (str) => {
  return str.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, curr) => {
    return sum + curr;
  };

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

export {
  reverse,
  average,
};


