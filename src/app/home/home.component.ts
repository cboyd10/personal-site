import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HomeHeaderComponent, LottieComponent, HomeFooterComponent],
  standalone: true,
})
export class HomeComponent {
  public scrollToTarget(target: HTMLElement): void {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  public designAnimationOptions: AnimationOptions = {
    path: '../assets/design/data.json',
  };

  public designAnimationStyles: Partial<CSSStyleDeclaration> = {
    backgroundImage: `url('../../assets/images/design-content-holder.svg')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  };

  public developAnimationOptions: AnimationOptions = {
    path: '../assets/develop/data.json',
  };

  public getDesignAnimationStyles(): Partial<CSSStyleDeclaration> {
    if (window.innerWidth < 768) {
      return {
        backgroundImage: `url('../../assets/images/design-content-holder.svg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      };
    }

    return {
      width: '90%',
      backgroundImage: `url('../../assets/images/design-content-holder.svg')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    };
  }

  public getDevelopAnimationStyles(): Partial<CSSStyleDeclaration> {
    if (window.innerWidth < 768) {
      return {
        backgroundImage: `url('../../assets/images/develop-content-holder.svg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      };
    }

    return {
      width: '90%',
      backgroundImage: `url('../../assets/images/develop-content-holder.svg')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    };
  }
}
