import "./plugins";
import compose from 'lodash/fp/compose';
import canAutoplay from 'can-autoplay';
import {doc, win} from './globals';
import {Howl, Howler} from 'howler';
import {createD3} from './d3script';
import {aggregate, normaliseData} from './helperFunctions';
import {D3BuildCircle} from './D3BuildCircle';
import {D3BuildArc} from './D3BuildArc';

/*   const fps = 60;
    setTimeout(() => {
         this.globalAnimationID = win.requestAnimationFrame(this.requestAnimationFrameFnc.bind(this));
       }, 1000 / fps);*/

const Chemz = (function () {
  const _private: {
    play: () => void;
    init: (element: HTMLElement, elementTwo: HTMLElement) => void;
    ctx: AudioContext | null;
    playIconClassElement: HTMLElement | null;
    towerBlockElement: HTMLElement | null;
    url: string | null;
    waveformArray: Float32Array[] | null;
    frequencyArray: Float32Array[] | null;
    analyser: AudioContext | null;
    createAudioContext: (url: string) => void;
    audioElement: HTMLAudioElement | null;
    createNodes: () => void;
    createDestination: () => void;
    requestAnimationFrameFnc: () => void;
    globalAnimationID: number | null;
    sound: Howl | null;
    useD3: () => void;
    svg: object | null;
    isPlaying: () => void;
    buildD3: () => void;
    detectAutoplay: () => void;
    svgCircle: object | null;
    svgArc: object | null;
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
    towerBlockElement: null,
    frequencyArray: null,
    svgCircle: null,
    svgArc: null,

    init: function (element: HTMLElement, elementTwo: HTMLElement): void {
      this.playIconClassElement = element;
      this.towerBlockElement = elementTwo;
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
    },

    createDestination: function (): void {
      Howler.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    },

    buildD3: function (): void {
      this.svg.d3Build();
     /* this.svgCircle = new D3BuildCircle();
      this.svgCircle.createElement();*/
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
        this.svgArc.update(myResult);
       // this.svgCircle.update(myResult);
      }
      if (!this.waveformArray.some(Boolean)) {
        if (this.towerBlockElement.classList.contains('animation')) {
          this.towerBlockElement.classList.remove('animation');
        }
      }
    },

    useD3: function (): void {
      const width = Math.max(doc.documentElement.clientWidth || 0, win.innerWidth || 0);
      const height = Math.max(doc.documentElement.clientHeight || 0, win.innerHeight || 0);
      const fftSize = this.analyser.fftSize;

      this.svg = createD3({height, width, fftSize});
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
    }
  };
  return {
    facade: function (args: any): void {
      const {url, playIconClassElement, towerBlockElement} = args;
      _private.init(playIconClassElement, towerBlockElement);
      _private.createAudioContext(url);
      _private.detectAutoplay();
      _private.createNodes();
      _private.createDestination();
      _private.useD3();
      _private.buildD3();
      _private.requestAnimationFrameFnc();
      _private.play();
      _private.isPlaying();
    }
  }
}());
const init = {...Chemz};
win.onload = () => {
  init.facade({
    url: require('../static/chemz-edit.mp3'),
    playIconClassElement: <HTMLElement>doc.querySelector('.play_icon'),
    towerBlockElement: <HTMLElement>doc.querySelector('.towerblock')
  });
}

