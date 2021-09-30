import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { PasswordModule } from 'primeng/password';
import { PrettyJsonPipe } from './pretty-json/prettyjson.pipe';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AccordionModule } from 'primeng/accordion';
import { TreeTableModule } from 'primeng/treetable';
import { OrderListModule } from 'primeng/orderlist';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SplitterModule } from 'primeng/splitter';
import {SelectButtonModule} from 'primeng/selectbutton';
import { IdNameTypeaheadComponent } from './Components/id-name-typeahead/id-name-typeahead.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressBarComponent } from './Components/progress-bar/progress-bar.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    PrettyJsonPipe,
    TruncatePipe,
    IdNameTypeaheadComponent,
    ProgressBarComponent
  ],
  imports: [
    ProgressBarModule,
    TimelineModule,
    CardModule,
    DropdownModule,
    CalendarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    TabViewModule,
    TooltipModule,
    DialogModule,
    PanelMenuModule,
    ToolbarModule,
    OverlayPanelModule,
    InputTextModule,
    MultiSelectModule,
    InputTextareaModule,
    ScrollPanelModule,
    FieldsetModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule,
    FileUploadModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    StepsModule,
    TabMenuModule,
    PasswordModule,
    ContextMenuModule,
    AccordionModule,
    TreeTableModule,
    OrderListModule,
    ToggleButtonModule,
    SplitterModule,
    SelectButtonModule,
    NgbModule,
    AutoCompleteModule
  ],
  exports: [
    ProgressBarModule,
    TimelineModule,
    CardModule,
    DropdownModule,
    CalendarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    TabViewModule,
    TooltipModule,
    DialogModule,
    PanelMenuModule,
    ToolbarModule,
    OverlayPanelModule,
    InputTextModule,
    MultiSelectModule,
    InputTextareaModule,
    ScrollPanelModule,
    FieldsetModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule,
    FileUploadModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    StepsModule,
    TabMenuModule,
    PasswordModule,
    PrettyJsonPipe,
    TruncatePipe,
    ContextMenuModule,
    AccordionModule,
    TreeTableModule,
    OrderListModule,
    ToggleButtonModule,
    SplitterModule,
    SelectButtonModule,
    NgbModule,
    IdNameTypeaheadComponent,
    ProgressBarComponent,
    AutoCompleteModule
  ],
})
export class SharedModule { }
