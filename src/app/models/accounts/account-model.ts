import { ValidationHelper } from '@app/models/helpers/validation-helper';

export class AccountModel {
    public id: string;
    public name: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public password: string;
    public newPassword: string;
    public confirmPassword: string;

    public isFirstNameValid = true;
    public isNewPasswordValid = true;
    public isConfirmPasswordValid = true;
    public isCurrentPasswordValid = true;
    public isCurrentPasswordRequiredValid = true;

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.password = '';
        this.confirmPassword = '';
        this.newPassword = '';
    }

    public isModelValid(): boolean {
        let isValid = true;
        this.resetModelState();
        if (!this.firstName.trim()) {
            this.isFirstNameValid = false;
            isValid = false;
        }
        if (this.newPassword) {
            if (this.newPassword !== this.confirmPassword) {
                this.isConfirmPasswordValid = false;
                isValid = false;
            }
            if (!ValidationHelper.isValidPassword(this.newPassword)) {
                this.isNewPasswordValid = false;
                isValid = false;
            }
            if (!this.password) {
                this.isCurrentPasswordRequiredValid = false;
                isValid = false;
            }
        }

        return isValid;
    }

    public resetPasswordState() {
        this.password = '';
        this.newPassword = '';
        this.confirmPassword = '';
    }

    private resetModelState() {
        this.isFirstNameValid = true;
        this.isNewPasswordValid = true;
        this.isConfirmPasswordValid = true;
        this.isCurrentPasswordValid = true;
        this.isCurrentPasswordRequiredValid = true;
    }
}
