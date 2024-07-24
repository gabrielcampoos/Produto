import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private toastr: ToastrService) {}

  success(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
    });
  }

  alertConfirmation(message: string) {
    return Swal.fire({
      title: 'Atenção',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3065d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    });
  }

  alertToastr(message: string) {
    this.toastr.success(message);
  }
}
