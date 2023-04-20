import { ValidatorFn, Validators } from '@angular/forms';

export interface IField {
    name: string;
    initialValue: any;
    validators: ValidatorFn[];
}
