import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { CasesService } from 'src/app/services/cases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-case',
  templateUrl: './register-case.component.html',
  styleUrls: ['./register-case.component.css']
})
export class RegisterCaseComponent implements OnInit {

  registerCaseForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private casesService: CasesService) {
    this.registerCaseForm = this.formBuilder.group({
      user_document: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],
      status: ['open', Validators.required]
    })
  }

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this.registerCaseForm.controls['user_document'].setValue(userData.document || '');
  }

  async submit() {
    try {
      const caseInfo = this.registerCaseForm.value;
      const registerCaseResponse: any = await lastValueFrom(this.casesService.save(caseInfo))
      console.log('REGISTER CASE RESPONSE > ', registerCaseResponse);
      if (registerCaseResponse.statusCode === 200) {
        // Se ha registrado el caso correctamente
        Swal.fire(
          'Aviso',
          'El caso ha sido registrado correctamente.',
          'success'
        );
      } else {
        // Datos incorrectos
        Swal.fire(
          'Aviso',
          'No ha sido posible registrar el caso.',
          'error'
        );
      }

    } catch (err) {
      console.error(err);
    }
  }
}
