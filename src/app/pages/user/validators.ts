import { AbstractControl, ValidationErrors } from "@angular/forms";

export function mustContainCentricDomain(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    if (value.includes('@centric.eu')){
        return null;
    }

    return {
        mustContrainCentricDomain: true
    };
}