import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoRepository {
  private readonly produtos = [];

  async salvar(produto) {
    this.produtos.push(produto);
  }
}
