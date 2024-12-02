import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.scss',
    imports: [NavAuthComponent, RouterOutlet, FooterComponent]
})
export class AuthLayoutComponent {

}
