import { Student } from './../models/student';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  // API path
  base_path = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept':'application/json'
    })
  }

  // Create a new item
  createStudent(item): Observable<Student> {
    return this.http
      .post<Student>(this.base_path, JSON.stringify(item), this.httpOptions)
      
  }

  // Get single student data by ID
  getStudent(id): Observable<Student> {
    return this.http
      .get<Student>(this.base_path + '/' + id , this.httpOptions)
      
  }

  // Get students data
  getStudents(): Observable<Student> {
    return this.http
      .get<Student>(this.base_path)
      
  }

  // Update item by id
  updateStudent(id, item): Observable<Student> {
    return this.http
      .put<Student>(this.base_path + '/' + id, JSON.stringify(item),this.httpOptions)
      
  }

  // Delete item by id
  deleteStudent(id) {
    return this.http
      .delete<Student>(this.base_path + '/' + id, this.httpOptions)
     
  }

}
