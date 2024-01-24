import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErrorRequestService {
  constructor(private router: Router) {}

  handleErrorDetailUser(error: HttpErrorResponse) {
    console.log(error);
    console.log(error.status);
    console.log(error.statusText);
    if (error.status === 400) {
      console.error('An error occurred:', error.error);
      this.router.navigate(['/unauthorized']);
    } else if (error.status === 500) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'error',
        title: error.statusText,
      });
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      this.router.navigate(['/unauthorized']);
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
