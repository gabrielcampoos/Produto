import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from './product.model';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

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
import { ApiResponse, ProductService } from './service/product.service';
import { UtilService } from '../../core/services/util.service';
import { InputComponent } from '../../shared/input/input.component';
import { MonetaryComponent } from '../../shared/monetary/monetary.component';
import { NumeralComponent } from '../../shared/numeral/numeral.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { SearchComponent } from '../../shared/search/search.component';

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
    SearchComponent,
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
    private utilService: UtilService,
    private cdr: ChangeDetectorRef
  ) {}

  dataSource = new MatTableDataSource<Product>();

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
      this.productService.delete(id).subscribe({
        next: (response) => {
          console.log('Delete response:', response);

          this.dataSource.data = this.dataSource.data.filter(
            (product) => product.id !== id
          );
          this.cdr.detectChanges(); // Força a atualização da tabela
          this.utilService.success('', 'Produto removido com sucesso.');
        },
        error: (error) => {
          console.error('Erro ao excluir produto:', error);
        },
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
      this.utilService.alertToastr('Registro gravado com sucesso.');
      this.listProducts();
      this.typeAdd = false;
      this.form.reset();
    });
  }

  listProducts() {
    this.productService.listAll().subscribe({
      next: (response: ApiResponse<Product[]>) => {
        if (response && response.data) {
          this.dataSource.data = response.data;
        } else {
          console.error('Estrutura de resposta inesperada:', response);
        }
      },
      error: (error) => {
        console.error('Erro ao listar produtos:', error);
      },
    });
  }

  addProduct() {
    this.typeAdd = true;
    this.form.reset();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  search() {
    this.typeAdd = false;
  }
}
