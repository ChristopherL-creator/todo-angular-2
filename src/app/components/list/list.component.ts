import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public dataS: DataService, private route: ActivatedRoute) { }
  // oimporta serviio creato da noi

  ngOnInit(): void { 
    console.log(this.route.data);
    //  mi riprendp cosiì il data che ho passato
  } 

  getTodos(){ 
    // a seconda della root, mi cambia la funione nel data service
    const isActive = this.route.snapshot.data['isActive']; 
    if (isActive) {
      return this.dataS.getActiveTodos();
    } else { 
      return this.dataS.getDoneTodos();
    } 
    // restituisco observable, che può cambiare nel tempo
  }

}
