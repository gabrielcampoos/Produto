import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ApiResponse,
  ProductService,
} from '../../module/product/service/product.service';
import { Product } from '../../module/product/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from '../button/button.component';
import { MatInputModule } from '@angular/material/input';
import { UtilService } from '../../core/services/util.service';
import { FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    NgIf,
    MatTableModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() searchChange = new EventEmitter<string>();

  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = [
    'actions',
    'sku',
    'name',
    'stock',
    'cost',
    'price',
  ];

  constructor(
    private productService: ProductService,
    private utilService: UtilService,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const lowerCaseFilter = filter.trim().toLowerCase();
      return (
        data.sku.toLowerCase().includes(lowerCaseFilter) ||
        data.name.toLowerCase().includes(lowerCaseFilter)
      );
    };
  }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(): void {
    this.productService.listAll().subscribe({
      next: (response: ApiResponse<Product[]>) => {
        if (response && response.data) {
          this.dataSource.data = response.data;
        }
      },
      error: (error) => {
        console.error('Erro ao listar produtos:', error);
      },
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value);
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
          this.cdr.detectChanges();
          this.utilService.success('', 'Produto removido com sucesso.');
        },
        error: (error) => {
          console.error('Erro ao excluir produto:', error);
        },
      });
    }
  }
}
