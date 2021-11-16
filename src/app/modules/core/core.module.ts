import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '@app/modules/core/components/home/home.component';
import { PageNotFoundComponent } from '@app/modules/core/components/page-not-found/page-not-found.component';
import { PaggingComponent } from '@app/modules/core/components/pagging/pagging.component';
import { NavigationComponent } from '@app/modules/core/components/navigation/navigation.component';
import { FooterComponent } from '@app/modules/core/components/footer/footer.component';
import { SystemMessageComponent } from '@app/modules/core/components/system-message/system-message.component';
import { TableComponent } from '@app/modules/core/components/table/table.component';
import { SpinnerComponent } from '@app/modules/core/components/spinner/spinner.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
    declarations: [
        HomeComponent,
        PageNotFoundComponent,
        PaggingComponent,
        NavigationComponent,
        FooterComponent,
        SystemMessageComponent,
        TableComponent,
        SpinnerComponent,
        DropdownComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        CollapseModule.forRoot()
    ],
    providers: [

    ],
    exports: [
        CommonModule,
        FormsModule,
        HomeComponent,
        PageNotFoundComponent,
        PaggingComponent,
        NavigationComponent,
        FooterComponent,
        SystemMessageComponent,
        TableComponent,
        SpinnerComponent,
        DropdownComponent
    ]
})
export class CoreModule { }
