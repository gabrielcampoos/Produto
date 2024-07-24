import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  private classController: string = 'products';

  listAll(): Observable<Product[]> {
    return this.apiService.get(environment.api + this.classController);
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
    return this.apiService.delete(
      environment.api + this.classController + '/' + id
    );
  }
}
