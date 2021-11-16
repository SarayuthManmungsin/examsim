import { Injectable } from '@angular/core';
import { RequestService } from '@app/modules/core/services/request.service';
import { Endpoints } from '@app/configs/endpoints';
import { RequestSettings } from '@app/models/requests/request-settings';
import { BaseService } from '@app/modules/core/services/base.service';
import { IService } from '@app/modules/core/services/interface.service';
import { ServiceEndpoints } from '@app/models/endpoints/service-endpoints.model';
import { AuthenticationService } from './authentication.service';
import { ExamTitleViewModel } from '@app/models/exam/exam-title-view.model';
import { ExamQuestionViewModel } from '@app/models/exam/exam-question-view.model';
import { $$ } from 'protractor';
import { PagingResponse } from '@app/models/responses/paging-response';

@Injectable({
    providedIn: "root"
})
export class ExamService extends BaseService<ExamTitleViewModel> implements IService<ExamTitleViewModel> {

    constructor(public request: RequestService, private authService: AuthenticationService) {
        super(request, new ServiceEndpoints({
            get: Endpoints.ExamTitles,
            getAll: Endpoints.ExamTitles,
            create: Endpoints.ExamTitles,
            update: Endpoints.ExamTitles,
            delete: Endpoints.ExamTitles,
        }), ExamTitleViewModel.makeList);
    }

    public updateExamTitle(model: ExamTitleViewModel): Promise<any> {
        return this.request.patch(this.endpoints.update, model, new RequestSettings({isCustomErrorHandle: true}));
    }

    public createExamQuestion(model: ExamQuestionViewModel, examId: string) {
        return this.request.post(`${Endpoints.ExamTitles}/${examId}/${Endpoints.ExamQuestions}`, model);
    }

    public async getExamQuestions(page: number, examId: string): Promise<PagingResponse<ExamQuestionViewModel>> {
        const apiResponse = await this.request.get(`${Endpoints.ExamTitles}/${examId}/${Endpoints.ExamQuestions}` + '?page=' + page);
        let res = new PagingResponse<any>({
            examTitle: apiResponse.examTitle,
            totalItems: apiResponse.data.totalItems,
            list: apiResponse.data.list,
            pageSize: apiResponse.data.pageSize,
            pageNumber: apiResponse.data.pageNumber,
            totalPages: apiResponse.data.totalPages
        });
        if (this.dataSerializer) {
            res.list = this.dataSerializer(res.list);
        }
        return res;
    }
}