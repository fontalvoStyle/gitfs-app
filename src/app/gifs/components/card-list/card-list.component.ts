import {Component, Input, Output} from '@angular/core';
import {Gif} from "../../interfaces/gif";

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  @Input()
  public gifList : Gif[] = [];

}
