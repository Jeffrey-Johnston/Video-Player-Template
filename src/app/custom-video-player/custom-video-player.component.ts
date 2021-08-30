import { Component, OnInit } from '@angular/core';
import {
  faPlay,
  faPause,
  faVolumeUp,
  faClosedCaptioning,
  faExpand,
  faEllipsisH,
  faUndo,
  faStepBackward,
  faStepForward,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-video-player',
  templateUrl: './custom-video-player.component.html',
  styleUrls: ['./custom-video-player.component.scss'],
})
export class CustomVideoPlayerComponent implements OnInit {
  //* state
  isPlay: boolean = false;
  isMute: boolean = false;
  fullScreenEnabled = !!document.fullscreenEnabled;
  completionStatus: boolean = false;

  //* elementas
  video!: any;
  progressBar!: any;

  //* progress counter
  totalSeconds!: number;
  videoSeconds!: number;
  videoMinutes!: number;
  minutes!: number;
  seconds!: number;

  //* progress bar
  progress!: number;
  percentage!: number;
  supposedCurrentTime: number = 0;

  //* icons
  faPlay = faPlay;
  faPause = faPause;
  faVolumeUp = faVolumeUp;
  faClosedCaptioning = faClosedCaptioning;
  faExpand = faExpand;
  faEllipsisH = faEllipsisH;
  faUndo = faUndo;
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;
  faVolumeMute = faVolumeMute;

  constructor() {}

  ngOnInit(): void {
    this.video = document.getElementById('videoPlayer');
    this.progressBar = document.getElementById('progress');
    this.progressStatus();
  }

  progressStatus() {
    //* timer
    this.totalSeconds = this.video.currentTime;
    this.minutes = Math.floor(this.totalSeconds / 60);
    if (this.totalSeconds >= 60) {
      this.seconds = Math.floor(this.totalSeconds - this.minutes * 60);
    } else {
      this.seconds = Math.floor(this.totalSeconds);
    }
    //* progress bar
    if (this.video.currentTime === 0) {
      this.progress = 0;
    } else {
      this.progress = this.video.currentTime / this.video.duration;
    }
    //* sets current time to 0 onInit
    if (!this.video.seeking && !this.completionStatus) {
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
    this.isPlay = false;
  }

  setVideoLength() {
    this.videoMinutes = Math.floor(this.video.duration / 60);
    if (this.video.duration >= 60) {
      this.videoSeconds = Math.floor(
        this.video.duration - this.videoMinutes * 60
      );
    } else {
      this.videoSeconds = Math.round(this.video.duration);
    }
  }

  playPause() {
    if (this.video.paused) {
      this.isPlay = true;
      this.video.play();
    } else {
      this.isPlay = false;
      this.video.pause();
    }
  }
  restart() {
    this.video.currentTime = 0;
    this.video.pause();
    this.isPlay = false;
  }

  skip(seconds: number) {
    this.video.currentTime = this.video.currentTime + seconds;
  }

  mute() {
    this.video.muted = !this.video.muted;
    this.isMute = !this.isMute;
  }

  onProgressBarClick(e: any) {
    const progressTime =
      (e.offsetX / this.progressBar.offsetWidth) * this.video.duration;
    this.video.currentTime = progressTime;
  }

  handleFullScreen() {}
}
