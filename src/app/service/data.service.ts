import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly BASE_URL = 'https://62b965c0ff109cd1dc911428.mockapi.io/todo';

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

  getActiveTodos(){
return this.todos.pipe(
  map(todos => todos.filter(todo => !todo.doneDate))
)
  }

  getDoneTodos(){
    return this.todos.pipe(
      map(todos => todos.filter(todo => todo.doneDate))
    )
  }

  deleteTodo(todo: Todo){
    const url = this.BASE_URL + '/' + todo.id;
    this.http.delete(url).subscribe({
      next: r => {
        const newArray = this.todos.value.filter(t => t !== todo)
        this.todos.next(newArray)
        // tolgo todo cancellato da vecchi todos
      },
      error: err => console.log(err)
    })
  }

  completeTodo(todo: Todo){
    const completedTodo = todo;
    completedTodo.priority = -1;
    completedTodo.doneDate = new Date().getTime() / 1000;
    console.log(completedTodo);

    this.putTodo(completedTodo);
  }

  getTodoById(id: string) {
    // for (const todo of this.todos.value) {
    //   //  todos sono behavioursubject
    //   if (todo.id === id) {
    //     return todo;
    //   }
    // }
    // return null
    // se paths potrebbero non dare values
    // return this.todos.value.find(todo => todo.id === id);
    return this.todos.pipe(
      map(todos => todos.find(todo => todo.id === id))
    )
  }

  //  se ho id
  putTodo(todo: Todo){
    const url = this.BASE_URL + '/' + todo.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.http.put<Todo>(url, todo, { headers }).subscribe({
      next: todo => {
        const newArray = [...this.todos.value];
        this.todos.next(newArray);
      },
      error: err => console.log(err)

    })
  }

  saveTodo(todo: Todo){ 

    if (todo.id) {
      this.putTodo(todo);
      return;
    }

    //  se non ho id
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.http.post<Todo>(this.BASE_URL, todo, {headers}).subscribe({
      next: todo => {
        const newArray = [...this.todos.value, todo];
        this.todos.next(newArray);
      },
      error: err => console.log(err)
    })

  }
}
