import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/model/todo';
import { DataService } from 'src/app/service/data.service';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public dataS: DataService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }
              //  per importare matdialog
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

  openDialog(todo?: Todo){
   if (todo) {
     this.dialog.open(EditComponent, {
       maxWidth: '500px',
       width: '90%',
       data: {id: todo.id}
     });
   } else {
    this.dialog.open(EditComponent, {
      maxWidth: '500px',
      width: '90%'
    });
   }
  }

}
