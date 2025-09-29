import { Component } from '@angular/core';
import { RegistroComponent } from './components/registro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mf-registro';
}
