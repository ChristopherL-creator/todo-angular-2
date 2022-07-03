import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogueComponent } from 'src/app/components/delete-dialogue/delete-dialogue.component';
import { Todo } from 'src/app/model/todo';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo?: Todo;
  @Output() todoCompleted = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<Todo>();
  @Output() todoEdited = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(todo?: Todo){
    if (todo) {
      this.dialog.open(DeleteDialogueComponent, {
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
