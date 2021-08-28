import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomVideoPlayerComponent } from './custom-video-player.component';

describe('VideoPlayerComponent', () => {
  let component: CustomVideoPlayerComponent;
  let fixture: ComponentFixture<CustomVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomVideoPlayerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});