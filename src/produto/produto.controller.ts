import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criaProduto(@Body() produto) {
    await this.produtoRepository.salvar(produto);
    return produto;
  }

  @Get()
  async listaProduto() {
	 return await this.produtoRepository.listar();
  }
}
