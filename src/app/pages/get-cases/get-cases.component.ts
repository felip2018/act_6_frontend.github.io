import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CasesService } from 'src/app/services/cases.service';

@Component({
  selector: 'app-get-cases',
  templateUrl: './get-cases.component.html',
  styleUrls: ['./get-cases.component.css']
})
export class GetCasesComponent implements OnInit {

  cases: any[];

  constructor(private casesService: CasesService) {
    this.cases = [];
  }

  async ngOnInit() {
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
      const getCasesResponse: any = await lastValueFrom(this.casesService.searchCases('all', userData.document));
      console.log('GET CASES RESPONSE > ', getCasesResponse);
      if (getCasesResponse.statusCode === 200) {
        this.cases = getCasesResponse.result;
      }
    } catch (err) {
      console.error(err);
    }
  }

}
