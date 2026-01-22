import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-menu',
  imports: [RouterLink],
  templateUrl: './app-menu.html',
  styleUrl: './app-menu.scss',
})
export class AppMenu {
//  @Input() monMenu: any = [];
}
