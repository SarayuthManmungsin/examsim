import { ValidationHelper } from '@app/models/helpers/validation-helper';

export class UserViewModel {
    public id: number;
    public email: string;
    public firstName: string;
    public lastName: string;
    public password: string;
    public tenantID: string;

    public isUsernameValid = true;
    public isUsernameValidFormat = true;
    public isPasswordValid = true;
    public isPasswordValidFormat = true;
    public isFirstNameValid = true;
    public isLastNameValid = true;
    public isTenantValid = true;
    public isUsernameUnique = true;

    constructor(data?: any) {
        this.id = 0;
        this.email = '';
        this.firstName = '';
        this.lastName = '';

        if (data) {
            this.cast(data);
        }
    }

    static make(data: any): UserViewModel {
        return new UserViewModel(data);
    }

    static makeList(data: Array<any>): UserViewModel[] {
        const results = [];
        for (let i = 0; i < data.length; i++) {
            results.push(new UserViewModel(data[i]));
        }
        return results;
    }

    private cast(data: any) {
        this.id = data.id;
        this.email = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
    }

    public isModelValid(): boolean {
        let valid = true;
        this.resetModelState();
        if (!this.email.trim()) {
            this.isUsernameValid = false;
            valid = false;
        } else if (!ValidationHelper.isValidEmail(this.email.trim())) {
            this.isUsernameValidFormat = false;
            valid = false;
        }
        if (!this.password) {
            this.isPasswordValid = false;
            valid = false;
        } else if (!ValidationHelper.isValidPassword(this.password)) {
            this.isPasswordValidFormat = false;
            valid = false;
        }
        if (!this.firstName.trim()) {
            this.isFirstNameValid = false;
            valid = false;
        }
        if (!this.lastName.trim()) {
            this.isLastNameValid = false;
            valid = false;
        }
        if (!this.tenantID) {
            this.isTenantValid = false;
            valid = false;
        }
        return valid;
    }

    public resetModelState() {
        this.isUsernameValid = true;
        this.isUsernameValidFormat = true;
        this.isPasswordValid = true;
        this.isPasswordValidFormat = true;
        this.isFirstNameValid = true;
        this.isLastNameValid = true;
        this.isTenantValid = true;
        this.isUsernameUnique = true;
    }
}
