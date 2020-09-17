import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpTrackerServiceService {

  constructor(private http:HttpClient) { }

  public getIPAddress(){
    return this.http.get('https://geo.ipify.org/api/v1?apiKey=at_NtbyN9tG27fzSYiAH7PdwCog7LHNM');
  }

  public getIPDetails(ipAddress:string){
    return this.http.get('https://geo.ipify.org/api/v1?apiKey=at_NtbyN9tG27fzSYiAH7PdwCog7LHNM&ipAddress=' + ipAddress);
  }
}
