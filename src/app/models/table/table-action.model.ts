export class TableActionModel {
    public text: string;
    public callback: () => void;

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.text = data.text;
        this.callback = data.callback;
    }
}
