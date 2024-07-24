import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-monetary',
  standalone: true,
  imports: [
    NgxCurrencyDirective,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './monetary.component.html',
  styleUrl: './monetary.component.scss',
})
export class MonetaryComponent {
  @Input() form!: FormGroup;
  @Input() controlName: string = '';
  @Input() title: string = '';
  @Input() placeholder: string = '';
}
