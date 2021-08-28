import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'custom-video';
  showDefaultPlayer: boolean = true;
  showCustomPlayer: boolean = true;

  selectDefualt() {
    this.showDefaultPlayer = true;
    this.showCustomPlayer = false;
  }
  selectCustom() {
    this.showCustomPlayer = true;
    this.showDefaultPlayer = false;
  }
}
