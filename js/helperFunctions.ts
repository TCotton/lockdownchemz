import normalize from 'array-normalize';
import {zip} from 'lodash';

const covertToArrayRemoveLastValue = (anObject: object):array[] => {
  return Object.values(anObject).splice(0, (Object.values(anObject).length - 1));
}

export const createArcArray = (data: object, height: number = 300, width: number = 300): number[] => {
  const radiusOne = Math.min(width, height) / 2;
  const donutWidthOne = (radiusOne - (radiusOne / 6));
  const radiusTwo = donutWidthOne;
  const donutWidthTwo = (radiusTwo - (radiusOne / 6));
  const radiusThree = donutWidthTwo;
  const donutWidthThree = (radiusThree - (radiusOne / 6));
  const radiusFour = donutWidthThree;
  const donutWidthFour = (radiusFour - (radiusOne / 6));
  const radiusFive = donutWidthFour;
  const donutWidthFive = (radiusFive - (radiusOne / 6));

  const colourOne = 'hsla(16.8,71.4%,93.1%,100%)';
  const colourTwo = 'hsla(257.1,16.5%,33.3%,100%)';
  const colourThree = 'hsla(19.4,100%,86.1%,100%)';
  const colourFour = 'hsla(20,100%,90.6%,100%)';
  const colourFive = 'hsla(4.5,46.9%,72%,100%)';

  let dataTwo, dataThree, dataFour;

  dataTwo = [colourOne, colourTwo, colourThree, colourFour, colourFive];
  dataThree = [radiusOne, radiusTwo, radiusThree, radiusFour, radiusFive];
  dataFour = [donutWidthOne, donutWidthTwo, donutWidthThree, donutWidthFour, donutWidthFive];

  return zip(covertToArrayRemoveLastValue(data), dataTwo, dataThree, dataFour);
}

const normaliseData = (frequencyArray: Float32Array): number[] => {
  return normalize(frequencyArray);
}

const aggregate = (frequencyArray: number[], num: number = 6): Float32Array => {
  const numberOfBars = Array.from(Array(num).keys());
  const aggregated = new Float32Array(numberOfBars);

  numberOfBars.forEach((x) => {
    let lowerBound = Math.floor(x / numberOfBars.length * frequencyArray.length);
    let upperBound = Math.floor((x + 1) / numberOfBars.length * frequencyArray.length);
    let bucket = frequencyArray.slice(lowerBound, upperBound);

    aggregated[x] = bucket.reduce(function (acc, d) {
      return acc + d;
    }, 0) / bucket.length;
  });

  return aggregated;
}

const average = (nums) => {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

const averageEvery = (arr: Float32Array, n: number): number[] | boolan => {

  // if we have neither an arr, or an n
  // variable we quit here:
  if (!arr || !n) {
    return false;
  }

  // imported, convert typedarray to array
  // @ts-ignore
  const newArray = [...arr];

  // creating an variable by the name of 'groups'
  // using an array-literal:
  let groups = [];

  // while the supplied Array ('arr') still
  // has a non-zero length:
  while (newArray.length) {

    // we remove the first elements of that
    // Array from the index of 0 to the
    // index supplied in the variable 'n':
    groups.push(newArray.splice(0, n));
  }

  // here we return the Array of averages, created
  // using Array.prototype.map() to iterate over
  // the Arrays held in the groups Array:
  return groups.map(
    // here we use Arrow functions, 'group'
    // is a reference to the current Array-
    // element, the Array from the Array of
    // Arrays over which we're iterating:
    group =>

      // here we use Array.prototype.reduce()
      // to sum the values of the Array:
      group.reduce(
        // 'a' : the accumulated value returned
        // from the last iteration;
        // 'b' : the current number of the Array
        // of Numbers over which we're iterating:
        (a, b) => a + b

        // once we find the sum, we then divide that
        // sum by the number of Array-elements to find
        // the average:
      ) / group.length
  );
}

export {normaliseData, aggregate, average, averageEvery}
