import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mustContainCentricDomain } from './validators';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('radu&ceva.com', mustContainCentricDomain)
  });

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.userForm.setValue({
    //   firstName: 'John',
    //   lastName: 'Gigel'
    // });

    // this.userForm.reset();

    this.userForm.patchValue({
      lastName: 'Mirabela'
    });

    console.log('Pristine value:', this.userForm.get('lastName')?.pristine);
  }

  onSubmit(): void {
    console.log('Form submitted:', this.userForm.value);
    console.log('Pristine value after submit:', this.userForm.get('lastName')?.pristine);
    console.log(this.userForm.get('email')?.errors);
  }
}
