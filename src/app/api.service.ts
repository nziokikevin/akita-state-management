import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';

const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/todos'

  constructor(private http: HttpClient) { }

  addTodo(title: string, description: string): Observable<Todo>{
    return this.http.post<Todo>(this.apiUrl, {title, description}, headerOptions)
  }

  getTodos(): Observable<Todo[]>{
    return this.http.get<{data: Todo[]}>(this.apiUrl)
    .pipe(map(res) => res.data)
  }

  deleteTodo(id: string): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Todo>(url)
  }

  updateTodo(id: string, changes: Todo):Observable<Todo>{
    const url = `${this.apiUrl}/${id}`
    return this.http.put<Todo>(url, changes)
  }
}
