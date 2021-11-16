import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StringHelper } from '@app/models/helpers/string-helper';
import { RequestService } from '@app/modules/core/services/request.service';
import { Option } from '@app/models/options/option.model';
import { APIResponseWrapper } from '@app/models/responses/api-response-wrapper';
import { PagingResponse } from '@app/models/responses/paging-response';

@Component({
    selector: 'app-dropdown-component',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {

    public value: string;

    @Input() options: Array<Option> = [];

    @Input() url: string;

    @Input()
    get model() {
        return this.value;
    }
    set model(val) {
        this.value = val;
        this.modelChange.emit(this.value);
    }

    @Output() modelChange = new EventEmitter<string>();

    public id = StringHelper.randomString();

    constructor(private requestService: RequestService) {

    }

    public ngOnInit() {
        this.initOptions();
    }

    public onChange() {
        this.model = this.value;
        console.log(this.url);
    }

    private initOptions() {
        if (this.url) {
            this.loadOptions();
        }
    }

    private loadOptions() {
        this.requestService.get<APIResponseWrapper<PagingResponse>>(this.url)
            .then((res: APIResponseWrapper<PagingResponse>) => {
                this.options = res.data.list.map(option => { return { text: option.name, value: option.id } as Option; });
        });
    }
}
