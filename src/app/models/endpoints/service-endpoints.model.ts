export class ServiceEndpoints {
    public get: string;
    public getAll: string;
    public create: string;
    public update: string;
    public delete: string;

    constructor(data) {
        this.get = data.get;
        this.getAll = data.getAll;
        this.create = data.create;
        this.update = data.update;
        this.delete = data.delete;
    }
}
