import { ValidationHelper } from '@app/models/helpers/validation-helper';

export class ForgetPasswordModel {

    public email: string;

    public isEmailValid: boolean;

    public isFail: boolean;

    constructor() {
        this.email = '';
        this.resetModelState();
    }

    public isRecoveryModelValid(): boolean {
        let isValid = true;
        this.resetModelState();
        if (!this.email.trim() || !ValidationHelper.isValidEmail(this.email.trim())) {
            this.isEmailValid = false;
            isValid = false;
        }
        return isValid;
    }

    private resetModelState() {
        this.isEmailValid = true;
    }
}
