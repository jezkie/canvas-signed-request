import { Component } from '@angular/core';
import { SignedRequestService } from './signed-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private signedRequestService: SignedRequestService) {}
  title = 'canvas-signed-request';

  ngOnInit() {
    const req = this.signedRequestService.getToken();
    req.subscribe(data => {
      console.log(data);
      
    });
  }  
}
