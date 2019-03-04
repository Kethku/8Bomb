// TODO: consolidate - avoid duplication
const rgbs = [
  'rgb(246,214,189)',
  'rgb(195,163,138)',
  'rgb(153,117,119)',
  'rgb(129,98,113)',
  'rgb(78,73,95)',
  'rgb(32,57,79)',
  'rgb(15,42,63)',
  'rgb(8,20,30)'
];

const triplets = [
  [246, 214, 189],
  [195, 163, 138],
  [153, 117, 119],
  [129, 98, 113],
  [78, 73, 95],
  [32, 57, 79],
  [15, 42, 63],
  [8, 20, 30]
];

function int (i) {
  let values = triplets[i % triplets.length];
  return (255 << 24) |
    (values[2] << 16) |
    (values[1] << 8) |
    values[0];
}

let intLookup = {};
for (let i = 0; i < 8; i++) {
  intLookup[int(i)] = i;
}

// const hexes = [
//   '#f6d6bd',
//   '#c3a38a',
//   '#997577',
//   '#816271',
//   '#4e495f',
//   '#20394f',
//   '#0f2a3f',
//   '#08141e'
// ]

const colors = {
  rgb (i) {
    return rgbs[i % rgbs.length];
  },

  triplet (i) {
    return triplets[i % triplets.length];
  },

  int,

  // NOTE: if triplet isn't a color in the pallet, this will return undefined.
  lookupTriplet (triplet) {
    for (let i = 0; i < triplets.length; i++) {
      let current = triplets[i];
      if (current[0] === triplet[0] &&
          current[1] === triplet[1] &&
          current[2] === triplet[2]) {
        return i;
      }
    }
    return undefined;
  },

  lookupInt (int) {
    return intLookup[i];
  }
}

export default colors;
