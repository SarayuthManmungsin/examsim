import { NgModule } from '@angular/core';
import { CoreModule } from '@app/modules/core/core.module';
import { SidebarComponent } from '@app/modules/exam-question/components/sidebars/sidebar.component';
import { BaseExamQuestionComponent } from './components/base/base-exam-question.component';
import { ExamQuestionsComponent } from './components/exam-questions/exam-questions.component';
import { CreateExamQuestionSidebarComponent } from './components/sidebars/views/create-exam-question-sidebar.component';
import { ExamQuestionRoutingModule } from './exam-question.routes';
import { nl2brPipe } from '../../nl2br.pipe';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
    declarations: [
        BaseExamQuestionComponent,
        ExamQuestionsComponent,
        SidebarComponent,
        CreateExamQuestionSidebarComponent,
        nl2brPipe
    ],
    imports: [
        CoreModule,
        ExamQuestionRoutingModule,
        DndModule,
    ],
    providers: [

    ],
    exports: [
        ExamQuestionRoutingModule
    ]
})
export class ExamQuestionModule { }
