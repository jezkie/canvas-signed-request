declare var Sfdc: any;
import { Component } from '@angular/core';
// import * as Sfdc from '@salesforce/canvas-js-sdk';
import { SignedRequestService } from './signed-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private signedRequestService: SignedRequestService) {}
  title = 'canvas-signed-request';
  sr: any = {};

  ngOnInit() {
    const req = this.signedRequestService.getToken();
    req.subscribe(sr => {
      console.log(sr);
      this.sr = sr;
      console.log(this.sr.client);

      Sfdc.canvas.client.ajax(
        this.sr.context.links.queryUrl + '?q=SELECT FIELDS(All) FROM EventLogFile LIMIT 200', 
        {
          client: this.sr.client,
          method: 'GET',
          contentType: 'application/json',
          success: function(data: any) {
            console.log(data);
          }
        });
    });
  }  
}
