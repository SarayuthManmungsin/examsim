import { NgModule } from '@angular/core';
import { CoreModule } from '@app/modules/core/core.module';
import { SidebarComponent } from '@app/modules/exam/components/sidebars/sidebar.component';
import { ExamRoutingModule } from './exam.routes';
import { BaseExamComponent } from './components/base/base-exam.component';
import { ExamsComponent } from './components/exams/exams.component';
import { CreateExamSidebarComponent } from './components/sidebars/views/create-exam-sidebar.component';

@NgModule({
    declarations: [
        BaseExamComponent,
        ExamsComponent,
        SidebarComponent,
        CreateExamSidebarComponent
    ],
    imports: [
        CoreModule,
        ExamRoutingModule,
    ],
    providers: [

    ],
    exports: [
        ExamRoutingModule
    ]
})
export class ExamModule { }
