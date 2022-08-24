import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url = environment.apiUrl
  constructor(private http: HttpClient) { }

  postEmploye(data:any){
    return this.http.post<any>(this.url+"/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmploye(){
    return this.http.get(environment.apiUrl+"/posts")
    
  }

  updateEmploye(data:any,id:any){
  
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmploye(id: any){
    return this.http.delete<any>("http://localhost:3000/posts/" + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
