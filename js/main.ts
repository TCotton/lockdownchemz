import "./plugins";
import * as d3 from 'd3';
const module = (function (doc, win) {
  let sourceNode, analyserNode, javascriptNode, amplitudeArray, audioContext, canvasWidth = 512, canvasHeight = 256,
    sampleSize = 1024, audioElement, mimeCodec = 'audio/mp3';
  let ctx;
  const _private = {
    i: 5,
    playAudio: function() {
      audioElement = doc.querySelector('audio');
      audioElement.src = require('../static/chemz.mp3');
      ctx = new AudioContext();
      const sourceNode = ctx.createMediaElementSource(audioElement);
      const analyser = ctx.createAnalyser();
      const waveformArray = new Float32Array(analyser.fftSize);
      analyser.getFloatTimeDomainData(waveformArray);
      let globalId;
      ;(function  updateWaveform() {
        globalId = requestAnimationFrame(updateWaveform);
        console.dir(globalId);
        analyser.getFloatTimeDomainData(waveformArray)
        console.log('repeat often');
        console.dir(waveformArray);
        if(waveformArray.some(Boolean)) {
          cancelAnimationFrame(globalId);
          console.dir(waveformArray);
        }
      })()
      console.log('analyser');
      console.dir(analyser);

      sourceNode.connect(analyser);
      analyser.connect(ctx.destination);

      audioElement.play().then(_ => {
        // Start whatever you need to do only after playback
        // has begun.
        ctx = new AudioContext();
        const sourceNode = ctx.createMediaElementSource(audioElement);
        const waveformArray = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(waveformArray);
        console.dir(waveformArray);
        console.log('autoplay working');
      }).catch(error => {
        if (error.name === "NotAllowedError") {
          console.log("NotAllowedError");
          doc.querySelector('.play_icon').addEventListener('click', () => {
            alert('yes PLAYBACK!');
            audioElement.play().then(_ => {
              console.dir(waveformArray);
            });
            /*ctx.resume().then(() => {
              console.log('Playback resumed successfully');
            });*/
          });
        } else {
          // Handle a load or playback error
        }
      });

      console.dir(audioElement);
      audioElement.addEventListener('playing', () => {
        console.log('playing');
        analyser.getFloatTimeDomainData(waveformArray);
        console.dir(waveformArray);
      })

      audioElement.addEventListener('loadstart', () => {
        console.log('loadstart');
      })

      audioElement.addEventListener('loadeddata', () => {
        console.log('loadeddata');
      })


    },
    play: function () {
      audioElement = doc.querySelector('audio');
      audioElement.play().catch(e => console.log(e));
    },
    get: function () {
      console.log('current value:' + this.i);
      ctx = new AudioContext();
      audioElement = doc.querySelector('audio');

      const sourceNode = ctx.createMediaElementSource(audioElement);
      const analyser = ctx.createAnalyser();
      const waveformArray = new Float32Array(analyser.fftSize);
      analyser.getFloatTimeDomainData(waveformArray);
      sourceNode.connect(analyser);
      analyser.connect(ctx.destination);
      audioElement.play().then(() => {
        // Start whatever you need to do only after playback
        // has begun.
        console.log('autoplay working');
        console.dir(waveformArray);
        audioElement.mute = true;
      }).catch(error => {
        if (error.name === "NotAllowedError") {
          console.log("NotAllowedError");
        } else {
          // Handle a load or playback error
        }
      });
    },
    d3Explosion: function() {
      const width = Math.max(doc.documentElement.clientWidth || 0, win.innerWidth || 0)
      const height = Math.max(doc.documentElement.clientHeight || 0, win.innerHeight || 0)

      const svg = d3.select('#svg');
      svg.attr('width', width);
      svg.attr('height', height);

      const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, analyser.fftSize]);

      const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([-1, 1]);

      const line = d3.line()
        .x(function (d, i) {
          //console.dir(d);
          return xScale(i);
        })
        .y(function (d, i) {
          console.dir(d);
          return yScale(d);
        });

      svg.select(".waveform")
        .select("path")
        .datum(waveformArray)
        .attr("d", line);

    },
    subSample: function(data) {
      const numberOfPoints = Math.ceil(width / 2);
      const subsampledData = new Float32Array(numberOfPoints);

      for (let i = 0; i < numberOfPoints; i++) {
        subsampledData[i] = data[Math.floor(i / numberOfPoints * data.length)];
      }
      return subsampledData;
    },
    set: function (val) {
      this.i = val;
    },
    run: function () {
      console.log('running');
    },
    jump: function () {
      console.log('jumping');
    }
  };
  return {
    facade: function (args) {
      console.dir(doc);
      console.dir(win);
      _private.set(args.val);
      _private.playAudio();
      if (args.run) {
        _private.run();
      }
    }
  }
}(document, window));

module.facade({run: true, val: 10});
