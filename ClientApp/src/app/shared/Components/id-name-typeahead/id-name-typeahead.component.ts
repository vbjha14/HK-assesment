import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-id-name-typeahead',
  templateUrl: './id-name-typeahead.component.html',
  styleUrls: ['./id-name-typeahead.component.css']
})
export class IdNameTypeaheadComponent {

  @Input() entities:any[] = [];
  @Input() valueMember:string;
  @Input() displayMember:string = '';
  @Output() onChange :EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("inputRef", { static: true }) inputRef : ElementRef;
  private _entity: any | null = null;
  get entity() {
    return this._entity;
  }
  set entity(value: any) {
    this._entity=value;
    this.onChange.emit(value ? value[this.valueMember] : null);
  }
  formatter = (entity: any) => entity[this.displayMember];
  searchEntities = (text$: Observable<string>) => text$.pipe(
   // tap(() => console.log(this.displayMember)),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.entities.filter(item =>item[this.displayMember].toString().toLocaleLowerCase().indexOf(term.toLowerCase()) !== -1).slice(0,10))
  );
  reset(){
    this.entity = null;
      this.inputRef.nativeElement.focus();
  }
}
