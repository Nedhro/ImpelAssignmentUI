﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';
import { ToastrService } from 'ngx-toastr';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthenticationService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        const token = this.route.snapshot.paramMap.get('token');
        if(token) {
            this.getToken(token);
        }

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        let storageUrl = localStorage.getItem('returnUrl');
        if(storageUrl){
            this.returnUrl = storageUrl;
        }
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.auth.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.error){
                        this.toastr.error('Error! '+data.error);
                        this.loading = false;
                    } else {
                        this.router.navigate([this.returnUrl]);
                    }
            });
    }

    getToken(token: string) {
        this.auth.getVerificationToken(token).subscribe(response => {
            console.log(response);
            if(response == 'OK') {
                this.toastr.success("Success! your account has been activate successfully.");
            } else {
                console.log();
            }
        })
    }
}
