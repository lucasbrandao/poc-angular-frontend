import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { CustomerService } from './service/customer.service';
import { Customer } from './model/customer';
import { Constants } from './utils/constants';
import { Option } from './model/option';
import { isNullOrUndefined } from 'util';

import { FormControl, FormGroup, Validators } from "@angular/forms";

declare const $: any;
declare const alertify: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CustomerService]
})
export class AppComponent implements OnInit {

  public id: string = null;
  public customer: Customer = new Customer;
  public customers: Array<Customer> = [];
  public riscOptions: Array<Option<string>> = Constants.RiscTypes.RISC_TYPES;
  public formGroup: FormGroup;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      Name: new FormControl('Campo nome é obrigatorio', [
        Validators.required,
      ]),
      LimitCredit: new FormControl('Campo limite de crédito é obrigatorio', [
        Validators.required,
      ]),
      Risc: new FormControl('Campo risco é obrigatorio', [
        Validators.required,
      ])
    });

    this.list();
  }

  public save(): void {

    if (this.isnull(this.id)) {
      this.customerService.save(this.customer)
        .subscribe(
          success => {
            this.clear();
            this.list();
            alertify.confirm('Cliente cadastrado com sucesso');
          },
          error => {
            alertify.confirm('Erro ao cadastrar cliente');
          });
    } else {
      this.edit();
    }
  }

  private edit(): void {
    this.customerService.edit(this.id, this.customer)
      .subscribe(
        success => {
          this.clear();
          this.list();
          alertify.confirm('Cliente alterado com sucesso');
        },
        error => {
          alertify.confirm('Erro ao alterar cliente');
        });
  }

  public get(id: string): void {
    this.customerService.get(id)
      .subscribe(
        customer => {
          this.id = customer.id;

          this.customer = new Customer();
          this.customer = customer;
        },
        error => {
          alertify.confirm('Erro ao consultar cliente');
        });
  }

  public list(): void {
    this.customerService.list()
      .subscribe(
        customers => {
          this.customers = [];
          this.customers = customers;
        },
        error => {
          alertify.confirm('Erro ao consultar cliente');
        });
  }

  public isnull(id: string): boolean {
    return isNullOrUndefined(id);
  }

  public clear(): void {
    this.formGroup.reset();

    this.customer = new Customer();
    this.id = null;
  }
}
