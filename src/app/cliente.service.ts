import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  API_URL: string = "http://localhost:8080/clientes"

  constructor(private http: HttpClient) { }

  findById(id: number) : Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API_URL}/${id}`);
  }

  findAll() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API_URL);
  }

  save(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.API_URL, cliente);
  } 

  delete(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  update(id: number, cliente: Cliente) : Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, cliente);
  }
}
