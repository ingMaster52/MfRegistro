import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { EntradaComponent } from '../shared/entrada/entrada.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EntradaComponent],
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {
  form!: FormGroup;

  // control de visibilidad de contraseñas
  showPassword = false;
  showConfirmPassword = false;

  // checklist dinámico
  passwordChecks = {
    longitud: false,
    mayus: false,
    minus: false,
    numero: false,
    especial: false,
    noEspacios: false,
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipoIdentificacion: ['CC', Validators.required],

      // persona natural
      numeroIdentificacion: [''],
      nombre: ['', Validators.required],
      apellidos: [''],

      // persona jurídica
      numeroNit: [''],
      dv: [''],

      indicativo: ['+57', Validators.required],

      // comunes
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required],

      terminos: [false, Validators.requiredTrue],
      politica: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.setValidatorsForTipo(this.form.get('tipoIdentificacion')?.value);
    this.form.get('indicativo')?.disable()

    this.form.get('tipoIdentificacion')?.valueChanges.subscribe((val: string) => {
      this.onTipoChange(val);
    });
    // observar cambios en contraseña para checklist
    this.form.get('password')?.valueChanges.subscribe((val: string) => {
      this.validarPassword(val || '');
    });
  }

  // cambio entre CC/CE/PA vs NIT
  onTipoChange(value: string): void {
    this.setValidatorsForTipo(value);
  }

  private setValidatorsForTipo(tipo: string) {
    if (tipo === 'NIT') {
      // NIT: usamos numeroNit + dv + nombre(razón social)
      this.form.get('numeroIdentificacion')?.clearValidators();
      this.form.get('numeroIdentificacion')?.setValue('');
      this.form.get('numeroNit')?.setValidators([Validators.required]);
      this.form
        .get('dv')
        ?.setValidators([Validators.required, Validators.pattern(/^[0-9]$/)]);
      this.form.get('nombre')?.setValidators([Validators.required]); // razón social
      this.form.get('apellidos')?.clearValidators();
    } else {
      // Persona natural: usamos numeroIdentificacion, nombre y apellidos
      this.form.get('numeroNit')?.clearValidators();
      this.form.get('dv')?.clearValidators();
      this.form.get('numeroNit')?.setValue('');
      this.form.get('dv')?.setValue('');
      this.form
        .get('numeroIdentificacion')
        ?.setValidators([Validators.required]);
      this.form.get('nombre')?.setValidators([Validators.required]);
      this.form.get('apellidos')?.setValidators([Validators.required]);
    }

    // Actualizar estado de validación de controles afectados
    ['numeroIdentificacion', 'numeroNit', 'dv', 'nombre', 'apellidos'].forEach(
      (k) => {
        const c = this.form.get(k);
        if (c) c.updateValueAndValidity();
      }
    );
  }

  // getter conveniente para template
  get esNit(): boolean {
    return this.form.get('tipoIdentificacion')?.value === 'NIT';
  }

  // envío formulario
  onSubmit(): void {
    if (this.form.valid) {
      console.log('payload:', this.form.value);
      // enviar al backend...
    } else {
      this.form.markAllAsTouched();
    }
  } // mostrar/ocultar contraseñas
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // validaciones de contraseña
  private validarPassword(pass: string): void {
    this.passwordChecks.longitud = pass.length >= 8 && pass.length <= 16;
    this.passwordChecks.mayus = /[A-Z]/.test(pass);
    this.passwordChecks.minus = /[a-z]/.test(pass);
    this.passwordChecks.numero = /[0-9]/.test(pass);
    this.passwordChecks.especial = /[@#$%&*+\-]/.test(pass);
    this.passwordChecks.noEspacios = !/^\s|\s$/.test(pass);
  }

  allPasswordChecksValid(): boolean {
    return Object.values(this.passwordChecks).every((v) => v);
  }

  get passwordRules() {
    const pass = this.form.get('password')?.value || '';

    return {
      longitud: pass.length >= 8 && pass.length <= 16,
      mayuscula: /[A-Z]/.test(pass),
      minuscula: /[a-z]/.test(pass),
      numero: /[0-9]/.test(pass),
      // incluye @ y otros símbolos; la @ en el template deberá escaparse como &#64;
      especial: /[!@#$%^&*+\-?]/.test(pass),
      noInicial: pass === pass.trim(),
    };
  }

  getState(
    campo: string
  ):
    | 'default'
    | 'focus'
    | 'completado'
    | 'error'
    | 'quemado'
    | 'deshabilitado' {
    const control = this.form.get(campo);
    if (!control) return 'default';

    if (control.disabled) {
      return 'deshabilitado';
    }

    if (control.touched && control.invalid) {
      return 'error';
    }

    if (control.touched && control.valid) {
      return 'completado';
    }

    return 'default';
  }
}
