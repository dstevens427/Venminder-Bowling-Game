import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FrameModel } from 'src/models/frame.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  frames: FrameModel[] = [];
  currentFrame: number = 0;
  currentScore: number = 0;
  gameOver: boolean = false;

  constructor() { }

  addRoll(rollValue: number) {
    if (this.currentFrame < 10) {
      this.frames[this.currentFrame].updateRolls(rollValue);

      this.tallyTotalScore();
    }
  }

  tallyTotalScore() {
    let currentScore = 0;

    this.frames.forEach((frame) => {
      currentScore += frame.Score;
    });

    this.currentScore = currentScore;
    this.frames[this.currentFrame].updateDisplayScore();
  }
}
