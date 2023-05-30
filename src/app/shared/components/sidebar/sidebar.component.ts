import { Component } from '@angular/core';
import {GifsService} from "../../../gifs/services/gifs.service";

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifservice :GifsService ) {
  }

  get tagsHistory() {
    return this.gifservice.getTagsHistory;
  }

  public search( tag : string  ) : void {
    this.gifservice.searchTag( tag );
  }


}
