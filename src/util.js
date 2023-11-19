const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const shuffle = (array) => {
  const arr = array;
  for (let i = 0; i < arr.length; i += 1) {
    const m = Math.floor(Math.random() * arr.length);
    const n = Math.floor(Math.random() * arr.length);
    [arr[m], arr[n]] = [arr[n], arr[m]];
  }
  return arr;
};

const randomNumbersArray = (n) => {
  const arr = [];
  for (let i = 0; i < n; i += 1) {
    const num = Math.floor(Math.random() * n * 10);
    arr.push(num);
  }
  return shuffle(arr);
};

export { prettyPrint, randomNumbersArray };
