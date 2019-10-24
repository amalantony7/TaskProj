import { AbstractControl } from "@angular/forms";

export function Passwordvalidator(control : AbstractControl) : {[key : string] : boolean} | null {

    const password = control.get('nPassword');
    const confPassword = control.get('cnPassword');

    if(password.pristine || confPassword.pristine){

        return null;

    }

    return password && confPassword && password.value !== confPassword.value ?
     {'misMatch' : true} : null;


}