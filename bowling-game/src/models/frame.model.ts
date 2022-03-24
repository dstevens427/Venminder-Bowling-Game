import { ThisReceiver } from "@angular/compiler";
import { ScoreService } from "src/services/score.service";

export class FrameModel {
    constructor(index: number, scoreService: ScoreService) {
        this.Index = index;
        this.FrameNumber = index + 1;
        this.IsTenthFrame = this.FrameNumber === 10;
        this.RollBoxes = this.IsTenthFrame ? [0, 0, 0] : [0, 0];
        this.ScoreService = scoreService;
    }

    Index: number;
    FrameNumber: number;
    Score: number = 0;
    Rolls: number[] = [];
    RollsForDisplay: string[] = [];
    IsTenthFrame: boolean = false;
    IsFrameComplete: boolean = false;
    MaxRolls: number = 2;
    RollBoxes: number[];
    IsSpare: boolean = false;
    IsStrike: boolean = false;
    IsActive: boolean = false;
    DisplayScore: number = 0;
    StrikeString: string = 'X';
    SpareString: string = '/';
    ScoreService: ScoreService;

    completeFrame() {
        if (this.Rolls.length == this.MaxRolls) {
            this.IsFrameComplete = true;
            this.ScoreService.currentFrame ++;
        }
    }

    updateRolls(rollValue: number) {
        this.IsActive = true;
        this.Rolls.push(rollValue);
        
        if (!this.IsTenthFrame) {
            this.determineIfStrike();
        
            if (!this.IsStrike) {
                this.determineIfSpare();
            }
        }
        
        let rollForDisplay = this.prepRollForDisplay(rollValue);
        
        this.RollsForDisplay.push(rollForDisplay);

        
        if (this.IsTenthFrame) {
            this.scoreTenthFrame();
        } else {
            this.updateScore();
        }
        this.updateDisplayScore();
        this.completeFrame();
    }

    determineIfStrike() {
        let currentRoll = this.Rolls.slice(-1)[0];
        
        if (this.Rolls.length < this.MaxRolls && currentRoll === 10 && !this.IsTenthFrame) {
            this.IsStrike = true;
            this.Rolls.push(0);
            this.IsFrameComplete = true;
        }
    }
    
    determineIfSpare() {
        let currentRoll = this.Rolls.slice(-1)[0];
        let previousRoll = this.Rolls.slice(-2)[0];
        
        if (this.Rolls.length > 1 && (previousRoll + currentRoll === 10)) {
            this.IsSpare = true;
        }
    }

    prepRollForDisplay(rollValue: number): string {
        let rollForDisplay = '';
            
            if (this.IsStrike) {
                rollForDisplay = this.StrikeString;
            }

            if (this.IsSpare) {
                rollForDisplay = this.SpareString;
            }

            if (!rollForDisplay) {
                rollForDisplay = rollValue.toString();
            }

        return rollForDisplay;
    }

    updateScore() {
        let score = 0;
        let previousFrame = this.ScoreService.frames[this.Index - 1];

        if (this.Rolls) {
            this.Rolls.forEach(roll => {
                score += roll;
            });
        }

        if (previousFrame?.IsSpare) {
            score += this.Rolls[0];
            previousFrame.DisplayScore += this.Rolls[0];
        }

        if (previousFrame?.IsStrike) {
            score += score;
            previousFrame.DisplayScore += score;
        }

        this.Score = score;
    }

    updateDisplayScore() {
        if (this.Index == 0) {
            this.DisplayScore = this.Score;
        } else {
            this.DisplayScore = this.ScoreService.currentScore;
        }
    }

    scoreTenthFrame() {
        if (this.Rolls.length == 2 && this.MaxRolls == 2) {
            let pinsKnocked = this.Rolls[0] + this.Rolls[1];
            if (pinsKnocked < 10) {
                this.updateScore();
                this.ScoreService.gameOver = true;
            }
        }

        if (this.Rolls.length < 3) {
            if (this.Rolls[0] == 10) {
                this.MaxRolls = 3;
            } else if (this.Rolls[0] + this.Rolls[1] == 10) {
                this.MaxRolls = 3;
            }
        }

        if (this.MaxRolls == 3 && this.Rolls.length == 3) {
            this.updateScore();
            let score = this.Score;
            if (this.Rolls[0] == 10) {
                score += (this.Rolls[1] + this.Rolls[2]);
            }

            if (this.Rolls[0] + this.Rolls[1] == 10) {
                score += this.Rolls[2];
            }
            
            this.ScoreService.gameOver = true;
        }
    }
}
