import { ValidationHelper } from '@app/models/helpers/validation-helper';

export class ExamTitleViewModel {

    public id: string;
    public title: string = '';
    public isActive: boolean = false;

    static makeList(data: Array<any>): ExamTitleViewModel[] {
        const results = [];
        for (let i = 0; i < data.length; i++) {
            results.push({...data[i]} as ExamTitleViewModel);
        }
        return results;
    }
}