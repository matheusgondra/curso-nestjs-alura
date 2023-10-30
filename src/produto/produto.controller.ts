import { Body, Controller, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async salvar(@Body() produto) {
    await this.produtoRepository.salvar(produto);
    return produto;
  }
}
