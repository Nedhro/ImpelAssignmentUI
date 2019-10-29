import { ErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor(private toaster: ToastrService) {}

    handleError(error){
        console.log(error);
        if(error.status !== 403 && error.status !== 401){
            let msg = error.statusText;
            if(error.eror !=='undefined'){
                msg = error.error;
            }

            this.toaster.error(msg, '', {
                timeOut: 3000
            });
        }
    }
}
