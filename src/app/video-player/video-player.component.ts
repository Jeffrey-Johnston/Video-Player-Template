import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  video!: any;
  completionStatus: boolean = false;
  supposedCurrentTime: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.video = document.getElementById('videoPlayer');
  }

  progressStatus() {
    if (!this.video.seeking && this.completionStatus === false) {
      this.supposedCurrentTime = this.video.currentTime;
    }
  }

  seekingStatus() {
    if (this.video.currentTime - this.supposedCurrentTime > 0.01) {
      this.video.currentTime = this.supposedCurrentTime;
    }
  }

  videoEnded() {
    this.completionStatus = true;
  }
}
