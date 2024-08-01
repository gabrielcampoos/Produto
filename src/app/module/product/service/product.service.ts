import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../product.model';
import { HttpHeaders } from '@angular/common/http';

export interface ApiResponse<T> {
  message: string;
  code: number;
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private classController: string = 'product';

  constructor(private apiService: ApiService) {}

  listAll(): Observable<ApiResponse<Product[]>> {
    return this.apiService.get<ApiResponse<Product[]>>(
      environment.api + this.classController
    );
  }

  create(data: Product): Observable<Product> {
    return this.apiService.post(environment.api + this.classController, data);
  }

  edit(data: Product): Observable<Product> {
    return this.apiService.put(
      environment.api + this.classController + '/' + data.id,
      data
    );
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete<any>(
      environment.api + this.classController + '/' + id
    );
  }
}
