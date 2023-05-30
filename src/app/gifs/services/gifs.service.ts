import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { GifsResponse, Gif } from "../interfaces/gif";
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey : string = "F3zYNhtyi7TmCYQjZ8xPXoSUJNPwgLv9";
  private urlApi : string = "http://api.giphy.com/v1/gifs";
  private tagsHistory : string[] = [];
  public gifsList : Gif[] = [];

  constructor( private htpp : HttpClient ) {
    this.loadLocalStorage();
  }
  private loadLocalStorage() : void {
    if( localStorage.getItem( 'history' ) !== null ) {
      this.tagsHistory = JSON.parse( localStorage.getItem( 'history' )! );
      this.searchTag( this.tagsHistory[ 0 ] );
    }
  }

  get getTagsHistory() {
    return [ ...this.tagsHistory ];
  }

  private organizeHistory( tag: string ): void {
    tag = tag.toLowerCase();
    let indexTag : number = this.tagsHistory.indexOf( tag )
    if( indexTag != -1 ){
      this.tagsHistory.splice( indexTag, 1 );
    }else if( this.tagsHistory.length  === 10 ){
      this.tagsHistory.pop();
    }
    this.tagsHistory.unshift( tag );

    this.saveLocalStorage();
  }

  private saveLocalStorage( ) : void {
    localStorage.setItem( 'history', JSON.stringify( this.tagsHistory ) );
  }

  searchTag( tag: string ) : void {
    if( tag.length == 0 ) return;
    this.organizeHistory( tag );
    const params :HttpParams = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'q', tag )
      .set( 'limit', 10 );
    this.htpp.get<GifsResponse>( `${this.urlApi}/search`, { params } )
      .subscribe( ( response ) => {
        this.gifsList = response.data;
      } );
  }
}
