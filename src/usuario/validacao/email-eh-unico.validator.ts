import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async validate(value: any): Promise<boolean> {
    const usuarioComEmailExiste =
      await this.usuarioRepository.existeComEmail(value);
    return !usuarioComEmailExiste;
  }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (object: object, propriedade: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      validator: EmailEhUnicoValidator,
    });
  };
};
