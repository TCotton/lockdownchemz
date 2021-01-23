import normalize from 'array-normalize';

const normaliseData = (frequencyArray: number[]): number[] => {
  return normalize(frequencyArray);
}

const aggregate = (frequencyArray: number[]): Float32Array => {
  const numberOfBars = Array.from(Array(12).keys());
  const aggregated = new Float32Array(numberOfBars);

  numberOfBars.forEach((x) => {
    let lowerBound = Math.floor(x / numberOfBars.length * frequencyArray.length);
    let upperBound = Math.floor((x + 1) / numberOfBars.length * frequencyArray.length);
    let bucket = frequencyArray.slice(lowerBound, upperBound);

    aggregated[x] = bucket.reduce(function(acc, d) {
      return acc + d;
    }, 0) / bucket.length;
  });

  return aggregated;
}

export {normaliseData, aggregate}
