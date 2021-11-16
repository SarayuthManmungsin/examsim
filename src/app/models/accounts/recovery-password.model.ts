import { ValidationHelper } from '@app/models/helpers/validation-helper';

export class RecoveryPasswordModel {

    public email: string;

    public code: string;

    public newPassword: string;

    public confirmPassword: string;

    public isEmailValid: boolean;

    public isPasswordValid: boolean;

    public isCodeValid: boolean;

    public isPasswordMatch: boolean;

    public isFail: boolean;

    constructor() {
        this.code = '';
        this.email = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.resetModelState();
    }

    public isModelValid(): boolean {
        let isValid = true;
        this.resetModelState();
        if (!this.email.trim()) {
            this.isEmailValid = false;
            isValid = false;
        }
        if (!this.newPassword || !ValidationHelper.isValidPassword(this.newPassword)) {
            this.isPasswordValid = false;
            isValid = false;
        }
        if (!this.code.trim()) {
            this.isCodeValid = false;
            isValid = false;
        }
        if (!this.confirmPassword || this.confirmPassword !== this.newPassword) {
            this.isPasswordMatch = false;
            isValid = false;
        }
        return isValid;
    }

    private resetModelState() {
        this.isEmailValid = true;
        this.isCodeValid = true;
        this.isPasswordValid = true;
        this.isPasswordMatch = true;
    }
}
