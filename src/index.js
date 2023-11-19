import Tree from './tree';
import { randomNumbersArray } from './util';

const odinArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

console.log(`odinArray: [${odinArray.join(', ')}]`);
const odinTree = new Tree(odinArray);
odinTree.print();

console.time('Driver Script');

/* --------------------------- Tie it all together -------------------------- */
// 1.
const randomArray = randomNumbersArray(50);
console.log('\nrandomArray:', randomArray);
const BST = new Tree(randomArray);

// 2.
console.log('\nisBalanced?', BST.isBalanced());

// 3.
console.log('\npreOrder:', BST.preOrder());

console.log('\ninOrder:', BST.inOrder());

console.log('\npostOrder:', BST.postOrder());

// 4.
const newNumbers = randomNumbersArray(150);
console.log('\nInserting several numbers');
newNumbers.forEach((number) => BST.insert(number));
BST.print();

// 5.
console.log('\nisBalanced?', BST.isBalanced());

// 6.
console.log('\nRebalance the tree');
BST.rebalance();

// 7.
console.log('\nisBalanced?', BST.isBalanced());

// 8.
console.log('\npreOrder:', BST.preOrder());

console.log('\ninOrder:', BST.inOrder());

console.log('\npostOrder:', BST.postOrder());

BST.print();
/* ----------------------------------- end ---------------------------------- */

console.timeLog('Driver Script');
