import { Component, OnInit } from '@angular/core';
import { Produto } from '../Produto';
import { Guid } from 'guid-typescript';
import { faCheckCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faMinusCircle = faMinusCircle;
  produtos: Produto[] = [];
  formulario: any;

  ngOnInit(): void {
    this.ExibirProdutos();
    this.formulario = new FormGroup({
      produtoId: new FormControl(),
      nome: new FormControl(),
      quantidade: new FormControl(),
      isComprado: new FormControl()
    });
  }

  CadastrarProduto(): void {
    this.formulario.value.produtoId = Guid.create().toString();
    this.formulario.value.isComprado = false;
    const produto: Produto = this.formulario.value;
    this.produtos.push(produto);
    localStorage.setItem("BD", JSON.stringify(this.produtos));
    this.formulario.reset();
  }

  ExibirProdutos(): void {
    let bd = localStorage.getItem("BD");
    if(bd) { this.produtos = JSON.parse(bd); } 
    else { this.produtos = []; }
  }

  AtualizarProduto(produtoId: string|undefined) {
    const indice: number = this.produtos.findIndex(p => p.produtoId == produtoId);
    this.produtos[indice].isComprado = !this.produtos[indice].isComprado;
    localStorage.setItem('BD', JSON.stringify(this.produtos));
  }

  RemoverProduto(produtoId: string|undefined) {
    const indice: number = this.produtos.findIndex(p => p.produtoId == produtoId);
    this.produtos.splice (indice, 1);
    localStorage.setItem('BD', JSON.stringify(this.produtos));
  }

}
