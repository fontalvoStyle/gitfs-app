import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from "../../services/gifs.service";

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @ViewChild( 'taginput' )
  public tagInput! : ElementRef<HTMLInputElement> ;

  constructor( private gifsService : GifsService ) {
  }

  search( ) : void {
    this.gifsService.searchTag( this.tagInput.nativeElement.value );
    this.tagInput.nativeElement.value = '';
  }

}
