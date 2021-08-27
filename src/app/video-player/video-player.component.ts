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

  supposedCurrentTime: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.video = document.getElementById('videoPlayer');
    this.progressBar = document.getElementById('progress');
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

    if (!this.video.seeking) {
      this.supposedCurrentTime = this.video.currentTime;
    }
  }
  // prevent user from seeking
  seekingStatus() {
    // guard agains infinite recursion:
    // user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
    var delta = this.video.currentTime - this.supposedCurrentTime;
    if (Math.abs(delta) > 0.01) {
      console.log('Seeking is disabled');
      this.video.currentTime = this.supposedCurrentTime;
    }
  }
  // delete the following event handler if rewind is not required
  videoEnded() {
    // reset state in order to allow for rewind
    this.supposedCurrentTime = 0;
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
  }

  handleFullScreen() {}
}
