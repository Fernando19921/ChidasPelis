import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'card-search-box',
  standalone: true,
  imports: [],
  templateUrl:'./card-search-box.component.html',
  styleUrl:'./card-search-box.component.scss'

})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  input!: ElementRef<HTMLInputElement>;

  constructor() {}

  searchTag() {
    const newTag = this.input.nativeElement.value;
    console.log(newTag);
  }
}
