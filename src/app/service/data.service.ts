import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService { 

  private readonly BASE_URL = 'https://628b2f687886bbbb37b2139d.mockapi.io/todos'; 

  public todos = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) { 
    this.getAllTodos().subscribe({ 
      next: todos => this.todos.next(todos),
      error: err => console.log(err) 
      // fa chiamata a getalltodos, e riempie con next il behavioursubject del database
      
  })
  } 

  getAllTodos(){ 
    return this.http.get<Todo[]>(this.BASE_URL);
  }
}
