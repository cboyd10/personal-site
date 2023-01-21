import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  standalone: true
})
export class HomeHeaderComponent {

}
