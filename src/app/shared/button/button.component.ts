import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() color: string = '';
  @Input() icon: string = '';
  @Output() response = new EventEmitter<any>();

  clicked(event: any) {
    this.response.emit();
  }
}
