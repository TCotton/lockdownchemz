import normalize from 'array-normalize';
import {zip} from 'lodash';

const covertToArrayRemoveLastValue = (anObject: object): number[] => {
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

  const colourOne = 'hsl(35.5,65.3%,46.3%)';
  const colourTwo = 'hsl(22.5,14.3%,11%)';
  const colourThree = 'hsl(44.4,36%,85.3%)';
  const colourFour = 'hsl(27.8,59.3%,22.2%)';
  const colourFive = 'hsl(44.4,37%,50.7%)';

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

const average = (nums:number[]) => {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

const icosahedronSides = () => {
  const faces = [];
  const y = (Math.atan2(1, 2) * 180) / Math.PI;
  for (var x = 0; x < 360; x += 72) {
    faces.push([
      [x + 0, -90],
      [x + 0, -y],
      [x + 72, -y],
      [x + 0, -90]
    ]);
    faces.push([
      [x + 0, -y],
      [x + 72, -y],
      [x + 36, y],
      [x + 0, -y]
    ]);
    faces.push([
      [x + 36, y],
      [x + 0, -y],
      [x - 36, y],
      [x + 36, y]
    ]);
    faces.push([
      [x - 36, 90],
      [x - 36, y],
      [x + 36, y],
      [x + 36, 90]
    ]);
  }
  return faces;
}

const averageEvery = (arr: Float32Array, n: number): number[] | boolean => {

  // if we have neither an arr, or an n
  // variable we quit here:
  if (!arr || !n) {
    return false;
  }

  // imported, convert typedarray to array
  const newArray:Array<number> = [...arr];

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
        (a:number, b:number) => a + b

        // once we find the sum, we then divide that
        // sum by the number of Array-elements to find
        // the average:
      ) / group.length
  );
}

export {normaliseData, aggregate, average, averageEvery, icosahedronSides}
