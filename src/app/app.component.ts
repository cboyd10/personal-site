import { Component } from '@angular/core';
import { SvgService } from './common/svg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public constructor(private svgService: SvgService) {
  }

}
