import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { SvgService } from './common/svg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'personal-site';
  designAnimationOptions: AnimationOptions<'svg'> | null = {
    path: '../assets/design/data.json'
  };
  developAnimationOptions: AnimationOptions<'svg'> | null = {
    path: '../assets/develop/data.json'
  };

  public constructor(private svgService: SvgService) {
  }

}
