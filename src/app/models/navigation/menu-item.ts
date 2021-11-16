export class MenuItem {

    public text: string;

    public url: string;

    public icon: string;

    public isAccount: boolean;

    constructor(data?: any) {
        this.text = '';
        this.url = '';

        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.text = data.text;
        this.url = data.url;
        this.icon = data.icon;
        this.isAccount = data.isAccount;
    }
}
