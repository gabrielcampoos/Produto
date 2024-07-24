import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Product } from './product.model';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from './service/product.service';
import { UtilService } from '../../core/services/util.service';
import { InputComponent } from '../../shared/input/input.component';
import { MonetaryComponent } from '../../shared/monetary/monetary.component';
import { NumeralComponent } from '../../shared/numeral/numeral.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    NgIf,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InputComponent,
    MonetaryComponent,
    NumeralComponent,
    ButtonComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class ProductComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private utilService: UtilService
  ) {}

  dataSource: Product[] = [];

  displayedColumns: string[] = [
    'actions',
    'sku',
    'name',
    'stock',
    'cost',
    'price',
  ];

  form!: FormGroup;

  typeAdd: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      sku: [null, Validators.required],
      name: [null, Validators.required],
      stock: [null],
      cost: [null, Validators.required],
      price: [null, Validators.required],
    });

    this.listProducts();
  }

  async delete(id: string) {
    let confirm = await this.utilService.alertConfirmation(
      'Deseja remover o produto?'
    );

    if (confirm.isConfirmed) {
      this.productService.delete(id).subscribe((response) => {
        if (response) {
          this.listProducts();
          this.utilService.success('', 'Produto removido com sucesso.');
        }
      });
    }
  }

  edit(data: Product) {
    this.form.patchValue(data);

    this.typeAdd = true;
  }

  create() {
    if (this.form.valid) {
      let data = this.form.value as Product;

      if (!data.id) {
        this.insert(data);
      } else {
        this.update(data);
      }
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }

  insert(data: Product) {
    this.productService.create(data).subscribe((response) => {
      this.utilService.success('Sucesso!', 'Registro gravado com sucesso.');
      this.listProducts();
      this.typeAdd = false;
      this.form.reset();
    });
  }

  update(data: Product) {
    this.productService.edit(data).subscribe((response) => {
      // this.utilService.success('Sucesso!', 'Registro gravado com sucesso.');
      this.utilService.alertToastr('Registro gravado com sucesso.');
      this.listProducts();
      this.typeAdd = false;
      this.form.reset();
    });
  }

  listProducts() {
    this.productService.listAll().subscribe((response) => {
      this.dataSource = response;
    });
  }

  addProduct() {
    this.typeAdd = true;
    this.form.reset();
  }

  search() {
    this.typeAdd = false;
  }
}
