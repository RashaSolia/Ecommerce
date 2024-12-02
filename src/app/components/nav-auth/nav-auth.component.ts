import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent {

}
