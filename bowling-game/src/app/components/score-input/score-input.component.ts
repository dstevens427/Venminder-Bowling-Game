import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, Input, OnInit } from '@angular/core';
import { ScoreService } from 'src/services/score.service';

@Component({
  selector: 'app-score-input',
  templateUrl: './score-input.component.html',
  styleUrls: ['./score-input.component.scss']
})
export class ScoreInputComponent implements OnInit {

  @Input() gameOver: boolean = false;

  numberArray: number[] = Array.from(Array(11).keys());

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
  }

  submitRoll(rollValue: number): void {
    this.scoreService.addRoll(rollValue);
  }

}
