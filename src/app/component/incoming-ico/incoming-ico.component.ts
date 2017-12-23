import { Component, OnInit } from '@angular/core';
import { IcoService } from './ico-services.service';
import { Ico} from './ico.model';
@Component({
  selector: 'app-incoming-ico',
  templateUrl: './incoming-ico.component.html',
  styleUrls: ['./incoming-ico.component.css'],
  providers: [IcoService]
})
export class IncomingIcoComponent implements OnInit {
  Icos: Ico[];
  constructor(private icoService: IcoService) { }

  ngOnInit() {
    //load the incoming ico data
    this.icoService.getICOs().then((Ico: any) => {
      console.log(Ico);
      if (Ico) {
        this.Icos = Ico.ico.upcoming.map((Ico) => {
          if(!Ico.name) {
            console.log('no icos');
          }
          return Ico;
        })
      }
});
  }

}
