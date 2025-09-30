import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntradaComponent),
      multi: true,
    },
  ],
  templateUrl: './entrada.component.html',
})
export class EntradaComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() disabled = false;
  @Input() type: string = 'text';
  @Input() state:
    | 'default'
    | 'focus'
    | 'completado'
    | 'error'
    | 'quemado'
    | 'deshabilitado' = 'default';


  id = `entrada-${nextId++}`;

  value: any = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
