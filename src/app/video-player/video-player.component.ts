import { Component, OnInit } from '@angular/core';
import {
  faPlay,
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
  isPlay: boolean = false;
  percentage!: number;
  totalSeconds!: number;
  videoSeconds!: number;
  videoMinutes!: number;
  minutes!: number;
  seconds!: number;
  progress!: number;
  video!: any;
  fullScreenEnabled = !!document.fullscreenEnabled;
  faPlay = faPlay;
  faVolumeUp = faVolumeUp;
  faClosedCaptioning = faClosedCaptioning;
  faExpand = faExpand;
  faEllipsisH = faEllipsisH;
  constructor() {}

  ngOnInit(): void {
    this.video = document.getElementById('videoPlayer');
    this.progressStatus();
  }

  playPause() {
    if (this.video.paused) {
      this.video.play();
    } else {
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

  handleFullScreen() {}
}
