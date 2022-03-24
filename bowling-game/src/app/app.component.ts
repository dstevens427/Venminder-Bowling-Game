import { Component } from '@angular/core';
import { FrameModel } from 'src/models/frame.model';
import { ScoreService } from 'src/services/score.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bowling-game';
  numberOfFrames = 10;

  constructor(public scoreService: ScoreService) {}

  ngOnInit() {
    for (let index = 0; index < this.numberOfFrames; index++) {
      let newFrame = new FrameModel(index, this.scoreService);
      this.scoreService.frames.push(newFrame);
    }
  }
}
