import "./plugins";
import * as d3 from 'd3';
import {doc, win} from './globals';
import {Howl, Howler} from 'howler';

const Chemz = (function () {
  const _private: {
    play: () => void;
    init: (element: HTMLElement, elementTwo: HTMLElement) => void;
    ctx: AudioContext | null;
    playIconClassElement: HTMLElement | null;
    towerBlockElement: HTMLElement | null;
    url: String | null;
    waveformArray: Array<Float32Array> | null;
    analyser: AudioContext | null;
    createAudioContext: (url: String) => void;
    audioElement: HTMLAudioElement | null;
    createNodes: () => void;
    createDestination: () => void;
    requestAnimationFrameFnc: () => void;
    globalAnimationID: Number | null;
    sound: Howl | null;
    useD3: () => void;
    svg: d3 | null;
    d3Line: d3.Line<any>;
    isPlaying: () => void;
  } = {
    url: null,
    audioElement: null,
    ctx: null,
    analyser: null,
    waveformArray: null,
    playIconClassElement: null,
    globalAnimationID: null,
    sound: null,
    svg: null,
    d3Line: null,
    towerBlockElement: null,

    init: function (element: HTMLElement, elementTwo: HTMLElement) {
      this.playIconClassElement = element;
      this.towerBlockElement = elementTwo;
    },

    createAudioContext: function (url: String) {
      this.sound = new Howl({
        src: [url],
        autoplay: false,
        preload: true,
        onloaderror: function() {
          console.log('onloaderror ERROR');
        },
        onplayerror: function() {
          console.log( 'onplayerror ERROR');
        },
        onfade: function() {
          console.log( 'FADE');
        },
      });
    },

    createNodes: function () {
      this.ctx = Howler.ctx;
      this.analyser = this.ctx.createAnalyser();
      this.waveformArray = new Float32Array(this.analyser.fftSize);
      this.analyser.getFloatTimeDomainData(this.waveformArray);
    },

    createDestination: function () {
      Howler.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    },

    requestAnimationFrameFnc: function () {
      const fps = 60;
      /*  setTimeout(() => {
          this.globalAnimationID = win.requestAnimationFrame(this.requestAnimationFrameFnc.bind(this));
        }, 1000 / fps);*/
      this.globalAnimationID = win.requestAnimationFrame(this.requestAnimationFrameFnc.bind(this));
      this.analyser.getFloatTimeDomainData(this.waveformArray)
      if (this.waveformArray.some(Boolean)) {
        if (!this.towerBlockElement.classList.contains('animation')) {
          this.towerBlockElement.classList.add('animation');
        }
        this.svg.select(".waveform")
          .select("path")
          .datum(this.waveformArray)
          .attr("d", this.d3Line);
      }
      if (!this.waveformArray.some(Boolean)) {
        if (this.towerBlockElement.classList.contains('animation')) {
          this.towerBlockElement.classList.remove('animation');
        }
      }
    },

    useD3: function () {

      const width = Math.max(doc.documentElement.clientWidth || 0, win.innerWidth || 0);
      const height = Math.max(doc.documentElement.clientHeight || 0, win.innerHeight || 0);

      this.svg = d3.select('#svg');
      this.svg.attr("viewBox", `0 0 ${width} ${height}`);

      const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, this.analyser.fftSize]);

      const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([-1, 1]);

      this.d3Line = d3.line()
        .x(function (d, i) {
          return xScale(i);
        })
        .y(function (d, i) {
          return yScale(d);
        });
    },

    play: function () {
      this.playIconClassElement.addEventListener('click', () => {
        this.sound.play();
      });
    },

    isPlaying: function () {
      this.sound.once('play', function () {
        console.log('PLAYING');
      });
    },

  };
  return {
    facade: function (args) {
      const {url, playIconClassElement, towerBlockElement} = args;

      _private.init(playIconClassElement, towerBlockElement);
      _private.createAudioContext(url);
      _private.createNodes();
      _private.createDestination();
      _private.requestAnimationFrameFnc();
      _private.play();
      _private.useD3();
      _private.isPlaying();
    }
  }
}());
const init = {...Chemz};
win.onload = () => {
  init.facade({
    url: require('../static/chemz.mp3'),
    playIconClassElement: <HTMLElement>doc.querySelector('.play_icon'),
    towerBlockElement: <HTMLElement>doc.querySelector('.towerblock')
  });
}

