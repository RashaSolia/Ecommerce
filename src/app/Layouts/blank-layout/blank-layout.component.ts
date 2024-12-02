import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-blank-layout',
    standalone: true,
    templateUrl: './blank-layout.component.html',
    styleUrl: './blank-layout.component.scss',
    imports: [NavBlankComponent, RouterOutlet, FooterComponent]
})
export class BlankLayoutComponent {

}
