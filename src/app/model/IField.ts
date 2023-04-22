import { ValidatorFn } from '@angular/forms';

export interface IField {
    name: string;
    initialValue: any;
    validators: ValidatorFn[];
    disabled: boolean;
    type: 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';
}
