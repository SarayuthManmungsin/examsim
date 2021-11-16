import { SidebarView } from '@app/models/sidebars/sidebar-view';

export class SidebarModel<T> {
    public title: string;
    public model: T;
    public view: SidebarView;
    public onSubmit: (callback: (data: any) => void) => void;
    public onSubmitted: (data: any) => void;
    public ready: boolean;

    constructor(data?: any) {
        this.title = '';
        this.ready = false;
        if (data) {
            this.cast(data);
        }
    }

    public onReady() {
        setTimeout(() => {
            this.ready = true;
        }, 0);
    }

    public loading() {
        this.ready = false;
    }

    private cast(data: any) {
        this.title = data.title;
        this.model = data.model;
        this.view = data.view;
        this.onSubmitted = data.onSubmitted;
    }
}
