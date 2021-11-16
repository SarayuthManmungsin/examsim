export class TenantViewModel {

    public id: number;
    public name: string;
    public usersCount: number;

    public isUnique = true;
    public isNameValid = true;

    static make(data: any) {
        return new TenantViewModel(data);
    }

    static makeList(data: Array<any>): Array<TenantViewModel> {
        const results = [];
        for (let i = 0; i < data.length; i++) {
            results.push(new TenantViewModel(data[i]));
        }
        return results;
    }

    constructor(data?: any) {
        this.id = 0;
        this.name = '';
        this.usersCount = 0;

        if (data) {
            this.cast(data);
        }
    }

    private cast(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.usersCount = data.usersCount;
    }

    public isModelValid(): boolean {
        this.resetModelState();
        if (!this.name.trim()) {
            this.isNameValid = false;
            return false;
        }
        return true;
    }

    public resetModelState() {
        this.isNameValid = true;
        this.isUnique = true;
    }
}
