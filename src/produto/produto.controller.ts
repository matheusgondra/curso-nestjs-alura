import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { randomUUID } from 'crypto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criaProduto(@Body() novoProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();
    Object.assign(produto, { ...novoProduto, id: randomUUID() });
    const produtoCadastrado = await this.produtoRepository.salvar(produto);
    return produtoCadastrado;
  }

  @Get()
  async listaProduto() {
    return await this.produtoRepository.listar();
  }

  @Put('/:id')
  async atualizaProduto(
    @Param('id') id: string,
    @Body() produto: AtualizaProdutoDTO,
  ) {
    const produtoAtualizado = await this.produtoRepository.atualiza(
      id,
      produto,
    );
    return {
      produto: produtoAtualizado,
      message: 'Produto atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id);
    return {
      produto: produtoRemovido,
      message: 'Produto removido com sucesso',
    };
  }
}
