import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-header',
  imports: [],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  @Input() monHeader: any = [];
}
