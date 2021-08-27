import { Component, OnInit } from '@angular/core';
import {
  faPlay,
  faPause,
  faVolumeUp,
  faClosedCaptioning,
  faExpand,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  //* state
  isPlay: boolean = false;
  fullScreenEnabled = !!document.fullscreenEnabled;
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
  //* icons
  faPlay = faPlay;
  faPause = faPause;
  faVolumeUp = faVolumeUp;
  faClosedCaptioning = faClosedCaptioning;
  faExpand = faExpand;
  faEllipsisH = faEllipsisH;
  constructor() {}

  ngOnInit(): void {
    this.video = document.getElementById('videoPlayer');
    this.progressBar = document.getElementById('progress');
    this.progressStatus();
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

  mute() {
    this.video.muted = !this.video.muted;
  }

  progressStatus() {
    this.totalSeconds = this.video.currentTime;
    this.minutes = Math.floor(this.totalSeconds / 60);
    if (this.totalSeconds >= 60) {
      this.seconds = Math.floor(this.totalSeconds - this.minutes * 60);
    } else {
      this.seconds = Math.floor(this.totalSeconds);
    }
    if (this.video.currentTime === 0) {
      this.progress = 0;
    } else {
      this.progress = this.video.currentTime / this.video.duration;
    }
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

  onProgressBarClick(e: any) {
    const progressTime =
      (e.offsetX / this.progressBar.offsetWidth) * this.video.duration;
    this.video.currentTime = progressTime;
    console.log(progressTime);
  }

  handleFullScreen() {}
}
