import { Component, Input, OnInit } from '@angular/core';
import { FrameModel } from 'src/models/frame.model';
import { ScoreService } from 'src/services/score.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  @Input() frame: FrameModel = new FrameModel(0, this.scoreService);

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    
  }

}
