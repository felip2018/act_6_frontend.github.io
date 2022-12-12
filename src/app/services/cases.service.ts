import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http: HttpClient) { }

  public save(caseInfo: any) {
    return this.http.post(`${environment.basePath}/cases/save`, caseInfo);
  }

  public searchCases(type: string, document: string) {
    return this.http.get(`${environment.basePath}/cases/get?type=${type}&document=${document}`);
  }
}
