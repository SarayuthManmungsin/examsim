export class RequestSettings {

    public isCustomErrorHandle: boolean;
    public retryOn401 = true;

    constructor(data?: Partial<RequestSettings>) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data: Partial<RequestSettings>) {
        this.isCustomErrorHandle = !!data.isCustomErrorHandle;
        this.retryOn401 = 'retryOn401' in data ? data.retryOn401 : true;
    }
}
