//import {doc, win} from './globals';

export function Events () {

  Events.prototype.click = function(): Promise<void> {
    return this.play();
  }

}
