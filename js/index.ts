import "./plugins";
import compose from 'lodash/fp/compose';
import canAutoplay from 'can-autoplay';
import {doc, win} from './globals';
import {Howl, Howler} from 'howler';
import {createD3} from './d3script';
import {aggregate, normaliseData} from './helperFunctions';
import {D3BuildCircle} from './D3BuildCircle';
import {D3BuildArc} from './D3BuildArc';
import {D3BuildIcosahedron} from './D3BuildIcosahedron';
import {D3BuildD3Stars} from "./D3BuildStars";
import {D3BuildCanvasOscillator} from './D3BuildCanvasOscillator';
import {D3BuildSpectrogram} from "./D3BuildSpectogram";
import {D3BuildSpectrogramCanvas} from './D3BuildSpectrogramCanvas';

const Chemz = (function () {
  const _private: {
    play: () => void;
    init: (element: HTMLElement, elementTwo: HTMLElement, svgOne: HTMLElement, svgTwo: HTMLElement, svgThree: HTMLElement, svgFour: HTMLElement, svgFive: HTMLElement, svgSix: HTMLElement, svgSeven: HTMLElement) => void;
    ctx: AudioContext;
    playIconClassElement: HTMLElement;
    towerBlockElement: HTMLElement;
    svgDomOne: HTMLElement;
    svgDomTwo: HTMLElement;
    svgDomThree: HTMLElement;
    svgDomFour: HTMLElement;
    svgDomFive: HTMLElement;
    svgDomSix: HTMLElement;
    svgDomSeven: HTMLElement;
    url: string | null;
    waveformArray: Float32Array[] | null;
    frequencyArray: Float32Array[] | null;
    frequencyByteData: Uint8Array[] | null;
    analyser: AudioContext;
    createAudioContext: (url: string) => void;
    audioElement: HTMLAudioElement;
    createNodes: () => void;
    createDestination: () => void;
    requestAnimationFrameFnc: () => void;
    globalAnimationID: number | null;
    sound: Howl | null;
    useD3: () => void;
    svg: object;
    isPlaying: () => void;
    buildD3: () => void;
    detectAutoplay: () => void;
    svgCircle: object | null;
    svgArc: object | null;
    displayD3BuildIcosahedron: () => void;
    displayD3BuildCircle:  () => void;
    displayD3BuildArc:  () => void;
    displayD3BuildOscillator: () => void;
    displayD3BuildStars: () => void;
    displayD3BuildSpectrogramCanvas: () => void;
    displayD3BuildSpectrogram: () => void;
    viewEvent: () => void;
    flags: { arc: boolean, circle: boolean, i: boolean, stars: boolean, o: boolean, s: boolean, sSVG: boolean };

  } = {
    url: null,
    waveformArray: null,
    globalAnimationID: null,
    frequencyArray: null,
    frequencyByteData: null,
    svgCircle: null,
    svgArc: null,
    flags: {
      i: true,
      arc: false,
      circle: false,
      stars: false,
      o: false,
      s: false,
      sSVG: false,
    },

    init: function (element: HTMLElement, elementTwo: HTMLElement, svgOne: HTMLElement, svgTwo: HTMLElement, svgThree: HTMLElement, svgFour: HTMLElement, svgFive: HTMLElement, svgSix: HTMLElement, svgSeven: HTMLElement): void {
      this.playIconClassElement = element;
      this.towerBlockElement = elementTwo;
      this.svgDomOne = svgOne;
      this.svgDomTwo = svgTwo;
      this.svgDomThree = svgThree;
      this.svgDomFour = svgFour;
      this.svgDomFive = svgFive;
      this.svgDomSix = svgSix;
      this.svgDomSeven = svgSeven;
    },

    createAudioContext: function (url: string): void {
      this.sound = new Howl({
        src: [url],
        autoplay: true,
        preload: 'metadata',
        html5: false,
        onloaderror: function (id, err) {
          console.log('onloaderror ERROR', [id, err]);
        },
        onplayerror: (id, err) => {
          console.log('onplayerror ERROR', [id, err]);
          this.sound.once('unlock', () => {
            this.sound.play();
          });
        },
        onfade: function (id) {
          console.log('FADE', [id]);
        },
      });
    },

    detectAutoplay: function (): void {
      canAutoplay.audio().then(({result}) => {
        if (!result) {
          this.playIconClassElement.classList.remove('hidden');
          this.towerBlockElement.classList.add('blur');
        }
      })
    },

    createNodes: function (): void {
      this.ctx = Howler.ctx;
      this.analyser = this.ctx.createAnalyser();
      this.waveformArray = new Float32Array(this.analyser.fftSize);
      this.analyser.getFloatTimeDomainData(this.waveformArray);
      this.frequencyArray = new Float32Array(this.analyser.frequencyBinCount);
      this.analyser.getFloatFrequencyData(this.frequencyArray);
      this.frequencyByteData = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(this.frequencyByteData);
    },

    createDestination: function (): void {
      Howler.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    },

    buildD3: function (): void {
      this.svg.d3Build();
      this.svgCircle = new D3BuildCircle();
      this.svgCircle.createElement();
      D3BuildIcosahedron.createElement();
      D3BuildD3Stars.createElement();
      this.svgArc = new D3BuildArc();
      this.svgArc.createElement();
    },

    requestAnimationFrameFnc: function (): void {
      this.globalAnimationID = win.requestAnimationFrame(this.requestAnimationFrameFnc.bind(this));
      this.analyser.getFloatTimeDomainData(this.waveformArray)
      if (this.waveformArray.some(Boolean)) {
        if (!this.towerBlockElement.classList.contains('animation')) {
          this.towerBlockElement.classList.add('animation');
        }
        this.svg.d3Path(this.waveformArray);
        this.analyser.getFloatFrequencyData(this.frequencyArray);

        const getMyResult = compose(
          aggregate,
          normaliseData,
        );
        const myResult = getMyResult(this.frequencyArray);
        if (this.flags.i) {
          D3BuildIcosahedron.update();
        }
        if (this.flags.arc) {
          this.svgArc.update(myResult);
        }
        if (this.flags.circle) {
          this.svgCircle.update(myResult);
        }
        if (this.flags.stars) {
          D3BuildD3Stars.update(aggregate(this.frequencyArray, 12));
        }
        if (this.flags.o) {
          D3BuildCanvasOscillator.update(this.waveformArray);
        }
        this.analyser.getByteFrequencyData(this.frequencyByteData);
        if (this.flags.s) {
          D3BuildSpectrogram.init(this.frequencyByteData);
        }

        if (this.flags.sSVG) {
          D3BuildSpectrogramCanvas.init(this.frequencyByteData);
        }

      }
      if (!this.waveformArray.some(Boolean)) {
        if (this.towerBlockElement.classList.contains('animation')) {
          this.towerBlockElement.classList.remove('animation');
        }
      }
    },

    viewEvent: function (): void {
      const view = doc.querySelectorAll('.view');
      doc.querySelector('body').addEventListener('click', event => {
        // @ts-ignore
        if (Array.from(view).includes(event.target)) return;

        // @ts-ignore
        if (event.target.id === 'four') {
          console.log('three');
          this.displayD3BuildStars();
        }

        // @ts-ignore
        if (event.target.id === 'three') {
          console.log('three');
          this.displayD3BuildArc();
        }

        // @ts-ignore
        if (event.target.id === 'two') {
          console.log('two');
          this.displayD3BuildCircle();
        }

        // @ts-ignore
        if (event.target.id === 'one') {
          console.log('one');
          this.displayD3BuildIcosahedron();
        }

        // @ts-ignore
        if (event.target.id === 'five') {
          console.log('five');
          this.displayD3BuildOscillator();
        }

        // @ts-ignore
        if (event.target.id === 'six') {
          console.log('six');
          this.displayD3BuildSpectrogram();
        }

        // @ts-ignore
        if (event.target.id === 'seven') {
          console.log('seven');
          this.displayD3BuildSpectrogramCanvas();
        }

      });
    },
    //TODO refactor
    displayD3BuildSpectrogramCanvas: function(): void {
      this.flags = {
        circle: false,
        arc: false,
        i: false,
        stars: false,
        o: false,
        s: false,
        sSVG: true,
      };

      if (this.svgDomSeven.classList.contains('hidden')) this.svgDomSeven.classList.remove('hidden');
      if (!this.svgDomTwo.classList.contains('hidden')) this.svgDomTwo.classList.add('hidden');
      if (!this.svgDomOne.classList.contains('hidden')) this.svgDomOne.classList.add('hidden');
      if (!this.svgDomFour.classList.contains('hidden')) this.svgDomFour.classList.add('hidden');
      if (!this.svgDomThree.classList.contains('hidden')) this.svgDomThree.classList.add('hidden');
      if (!this.svgDomFive.classList.contains('hidden')) this.svgDomFive.classList.add('hidden');
      if (!this.svgDomSix.classList.contains('hidden')) this.svgDomSix.classList.add('hidden');

      if (!this.svgDomSeven.classList.contains('flash')) this.svgDomSeven.classList.add('flash');
      if (this.svgDomTwo.classList.contains('flash')) this.svgDomTwo.classList.remove('flash');
      if (this.svgDomOne.classList.contains('flash')) this.svgDomOne.classList.remove('flash');
      if (this.svgDomFour.classList.contains('flash')) this.svgDomFour.classList.remove('flash');
      if (this.svgDomThree.classList.contains('flash')) this.svgDomThree.classList.remove('flash');
      if (this.svgDomFive.classList.contains('flash')) this.svgDomFive.classList.remove('flash');
      if (this.svgDomSix.classList.contains('flash')) this.svgDomSix.classList.remove('flash');
    },
    displayD3BuildSpectrogram: function(): void {

      this.flags = {
        circle: false,
        arc: false,
        i: false,
        stars: false,
        o: false,
        s: true,
        sSVG: false,
      };

      if (this.svgDomSix.classList.contains('hidden')) this.svgDomSix.classList.remove('hidden');
      if (!this.svgDomTwo.classList.contains('hidden')) this.svgDomTwo.classList.add('hidden');
      if (!this.svgDomOne.classList.contains('hidden')) this.svgDomOne.classList.add('hidden');
      if (!this.svgDomFour.classList.contains('hidden')) this.svgDomFour.classList.add('hidden');
      if (!this.svgDomThree.classList.contains('hidden')) this.svgDomThree.classList.add('hidden');
      if (!this.svgDomFive.classList.contains('hidden')) this.svgDomFive.classList.add('hidden');
      if (!this.svgDomSeven.classList.contains('hidden')) this.svgDomSeven.classList.add('hidden');

      if (!this.svgDomSix.classList.contains('flash')) this.svgDomSix.classList.add('flash');
      if (this.svgDomTwo.classList.contains('flash')) this.svgDomTwo.classList.remove('flash');
      if (this.svgDomOne.classList.contains('flash')) this.svgDomOne.classList.remove('flash');
      if (this.svgDomFour.classList.contains('flash')) this.svgDomFour.classList.remove('flash');
      if (this.svgDomThree.classList.contains('flash')) this.svgDomThree.classList.remove('flash');
      if (this.svgDomFive.classList.contains('flash')) this.svgDomFive.classList.remove('flash');
      if (this.svgDomSeven.classList.contains('flash')) this.svgDomSeven.classList.remove('flash');
    },
    displayD3BuildOscillator: function(): void {

      this.flags = {
        circle: false,
        arc: false,
        i: false,
        stars: false,
        o: true,
        s: false,
        sSVG: false,
      };

      if (this.svgDomFive.classList.contains('hidden')) this.svgDomFive.classList.remove('hidden');
      if (!this.svgDomTwo.classList.contains('hidden')) this.svgDomTwo.classList.add('hidden');
      if (!this.svgDomOne.classList.contains('hidden')) this.svgDomOne.classList.add('hidden');
      if (!this.svgDomFour.classList.contains('hidden')) this.svgDomFour.classList.add('hidden');
      if (!this.svgDomThree.classList.contains('hidden')) this.svgDomThree.classList.add('hidden');
      if (!this.svgDomSix.classList.contains('hidden')) this.svgDomSix.classList.add('hidden');
      if (!this.svgDomSeven.classList.contains('hidden')) this.svgDomSeven.classList.add('hidden');

      if (!this.svgDomFive.classList.contains('flash')) this.svgDomFive.classList.add('flash');
      if (this.svgDomTwo.classList.contains('flash')) this.svgDomTwo.classList.remove('flash');
      if (this.svgDomOne.classList.contains('flash')) this.svgDomOne.classList.remove('flash');
      if (this.svgDomFour.classList.contains('flash')) this.svgDomFour.classList.remove('flash');
      if (this.svgDomThree.classList.contains('flash')) this.svgDomThree.classList.remove('flash');
      if (this.svgDomSix.classList.contains('flash')) this.svgDomSix.classList.remove('flash');
      if (this.svgDomSeven.classList.contains('flash')) this.svgDomSeven.classList.remove('flash');
    },

    displayD3BuildIcosahedron: function (): void {

      this.flags = {
        circle: false,
        arc: false,
        i: true,
        stars: false,
        o: false,
        s: false,
        sSVG: false,
      };

      if (this.svgDomThree.classList.contains('hidden')) this.svgDomThree.classList.remove('hidden');
      if (!this.svgDomTwo.classList.contains('hidden')) this.svgDomTwo.classList.add('hidden');
      if (!this.svgDomOne.classList.contains('hidden')) this.svgDomOne.classList.add('hidden');
      if (!this.svgDomFour.classList.contains('hidden')) this.svgDomFour.classList.add('hidden');
      if (!this.svgDomFive.classList.contains('hidden')) this.svgDomFive.classList.add('hidden');
      if (!this.svgDomSix.classList.contains('hidden')) this.svgDomSix.classList.add('hidden');
      if (!this.svgDomSeven.classList.contains('hidden')) this.svgDomSeven.classList.add('hidden');

      if (!this.svgDomThree.classList.contains('flash')) this.svgDomThree.classList.add('flash');
      if (this.svgDomTwo.classList.contains('flash')) this.svgDomTwo.classList.remove('flash');
      if (this.svgDomOne.classList.contains('flash')) this.svgDomOne.classList.remove('flash');
      if (this.svgDomFour.classList.contains('flash')) this.svgDomFour.classList.remove('flash');
      if (this.svgDomFive.classList.contains('flash')) this.svgDomFive.classList.remove('flash');
      if (this.svgDomSix.classList.contains('flash')) this.svgDomSix.classList.remove('flash');
      if (this.svgDomSeven.classList.contains('flash')) this.svgDomSeven.classList.remove('flash');
    },

    displayD3BuildCircle: function (): void {

      this.flags = {
        circle: true,
        arc: false,
        i: false,
        stars: false,
        o: false,
        s: false,
        sSVG: false,
      };

      if (this.svgDomOne.classList.contains('hidden')) this.svgDomOne.classList.remove('hidden');
      if (!this.svgDomTwo.classList.contains('hidden')) this.svgDomTwo.classList.add('hidden');
      if (!this.svgDomThree.classList.contains('hidden')) this.svgDomThree.classList.add('hidden');
      if (!this.svgDomFour.classList.contains('hidden')) this.svgDomFour.classList.add('hidden');
      if (!this.svgDomFive.classList.contains('hidden')) this.svgDomFive.classList.add('hidden');
      if (!this.svgDomSix.classList.contains('hidden')) this.svgDomSix.classList.add('hidden');
      if (!this.svgDomSeven.classList.contains('hidden')) this.svgDomSeven.classList.add('hidden');

      if (!this.svgDomOne.classList.contains('flash')) this.svgDomOne.classList.add('flash');
      if (this.svgDomTwo.classList.contains('flash')) this.svgDomTwo.classList.remove('flash');
      if (this.svgDomThree.classList.contains('flash')) this.svgDomThree.classList.remove('flash');
      if (this.svgDomFour.classList.contains('flash')) this.svgDomFour.classList.remove('flash');
      if (this.svgDomFive.classList.contains('flash')) this.svgDomFive.classList.remove('flash');
      if (this.svgDomSix.classList.contains('flash')) this.svgDomSix.classList.remove('flash');
      if (this.svgDomSeven.classList.contains('flash')) this.svgDomSeven.classList.remove('flash');
    },

    displayD3BuildArc: function (): void {

      this.flags = {
        circle: false,
        arc: true,
        i: false,
        stars: false,
        o: false,
        s: false,
        sSVG: false,
      };

      if (this.svgDomTwo.classList.contains('hidden')) this.svgDomTwo.classList.remove('hidden');
      if (!this.svgDomOne.classList.contains('hidden')) this.svgDomOne.classList.add('hidden');
      if (!this.svgDomThree.classList.contains('hidden')) this.svgDomThree.classList.add('hidden');
      if (!this.svgDomFour.classList.contains('hidden')) this.svgDomFour.classList.add('hidden');
      if (!this.svgDomFive.classList.contains('hidden')) this.svgDomFive.classList.add('hidden');
      if (!this.svgDomSix.classList.contains('hidden')) this.svgDomSix.classList.add('hidden');
      if (!this.svgDomSeven.classList.contains('hidden')) this.svgDomSeven.classList.add('hidden');

      if (!this.svgDomTwo.classList.contains('flash')) this.svgDomTwo.classList.add('flash');
      if (this.svgDomOne.classList.contains('flash')) this.svgDomOne.classList.remove('flash');
      if (this.svgDomThree.classList.contains('flash')) this.svgDomThree.classList.remove('flash');
      if (this.svgDomFour.classList.contains('flash')) this.svgDomFour.classList.remove('flash');
      if (this.svgDomFive.classList.contains('flash')) this.svgDomFive.classList.remove('flash');
      if (this.svgDomSix.classList.contains('flash')) this.svgDomSix.classList.remove('flash');
      if (this.svgDomSeven.classList.contains('flash')) this.svgDomSeven.classList.remove('flash');
    },

    displayD3BuildStars: function (): void {

      this.flags = {
        circle: false,
        arc: false,
        i: false,
        stars: true,
        o: false,
        s: false,
        sSVG: false,
      };

      if (this.svgDomFour.classList.contains('hidden')) this.svgDomFour.classList.remove('hidden');
      if (!this.svgDomOne.classList.contains('hidden')) this.svgDomOne.classList.add('hidden');
      if (!this.svgDomTwo.classList.contains('hidden')) this.svgDomTwo.classList.add('hidden');
      if (!this.svgDomThree.classList.contains('hidden')) this.svgDomThree.classList.add('hidden');
      if (!this.svgDomFive.classList.contains('hidden')) this.svgDomFive.classList.add('hidden');
      if (!this.svgDomSix.classList.contains('hidden')) this.svgDomSix.classList.add('hidden');
      if (!this.svgDomSeven.classList.contains('hidden')) this.svgDomSeven.classList.add('hidden');

      if (!this.svgDomFour.classList.contains('flash')) this.svgDomFour.classList.add('flash');
      if (this.svgDomOne.classList.contains('flash')) this.svgDomOne.classList.remove('flash');
      if (this.svgDomTwo.classList.contains('flash')) this.svgDomTwo.classList.remove('flash');
      if (this.svgDomThree.classList.contains('flash')) this.svgDomThree.classList.remove('flash');
      if (this.svgDomFive.classList.contains('flash')) this.svgDomFive.classList.remove('flash');
      if (this.svgDomSix.classList.contains('flash')) this.svgDomSix.classList.remove('flash');
      if (this.svgDomSeven.classList.contains('flash')) this.svgDomSeven.classList.remove('flash');
    },

    useD3: function (): void {
      const width = Math.max(doc.documentElement.clientWidth || 0, win.innerWidth || 0);
      const height = Math.max(doc.documentElement.clientHeight || 0, win.innerHeight || 0);
      const fftSize = this.analyser.fftSize;

      this.svg = createD3({height, width, fftSize});
      D3BuildCanvasOscillator.createElement({fftSize});
      D3BuildSpectrogram.createElement({fftSize});
      D3BuildSpectrogramCanvas.createElement({fftSize});
    },

    play: function (): void {
      this.playIconClassElement.addEventListener('click', () => {
        this.sound.play();
        !this.playIconClassElement.classList.contains('hidden') ? this.playIconClassElement.classList.add('hidden') : this.playIconClassElement.classList.remove('hidden');
        if (this.towerBlockElement.classList.contains('blur')) this.playIconClassElement.classList.remove('blur');
      });
    },

    isPlaying: function (): void {
      this.sound.once('play', () => {
        console.log('isPlaying');
        if (!this.playIconClassElement.classList.contains('hidden')) this.playIconClassElement.classList.add('hidden');
      });
    },

  };
  return {
    facade: function (args: any): void {
      const {url, playIconClassElement, towerBlockElement, svgOne, svgTwo, svgThree, svgFour, svgFive, svgSix, svgSeven} = args;
      _private.init(playIconClassElement, towerBlockElement, svgOne, svgTwo, svgThree, svgFour, svgFive, svgSix, svgSeven);
      _private.createAudioContext(url);
      _private.detectAutoplay();
      _private.createNodes();
      _private.createDestination();
      _private.useD3();
      _private.buildD3();
      _private.requestAnimationFrameFnc();
      _private.play();
      _private.isPlaying();
      _private.viewEvent();
    }
  }
}());
const init = {...Chemz};
win.onload = () => {
  init.facade({
    url: require('../static/chemz-edit.mp3'),
    playIconClassElement: <HTMLElement>doc.querySelector('.play_icon'),
    towerBlockElement: <HTMLElement>doc.querySelector('.towerblock'),
    svgOne: <HTMLElement>doc.querySelector('#svg1'),
    svgTwo: <HTMLElement>doc.querySelector('#svg2'),
    svgThree: <HTMLElement>doc.querySelector('#svg3'),
    svgFour: <HTMLElement>doc.querySelector('#svg4'),
    svgFive: <HTMLElement>doc.querySelector('#svg5'),
    svgSix: <HTMLElement>doc.querySelector('#svg6'),
    svgSeven: <HTMLElement>doc.querySelector('#svg7'),
  });
}

