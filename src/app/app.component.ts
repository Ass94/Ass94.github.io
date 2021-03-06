import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente();
  params: HttpParams = new HttpParams();

  form : FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.minLength(4)])
  })
  
  constructor(private service: ClienteService ) {}


  ngOnInit() {
    this.findAll()
  }

  findAll() {
    this.service.findAll()
    .subscribe(lista => this.clientes = lista)
  }

  save() {
    const cliente: Cliente = {...this.form.value}
    this.service.save(cliente)
    .subscribe(clienteSalvo => {
      this.clientes.push(clienteSalvo)
      this.form.reset()
    })
  }

  delete(cliente: Cliente) {
    this.service.delete(cliente.id)
    .subscribe({
      next: (response) => this.findAll()
    })

  }



  
}
