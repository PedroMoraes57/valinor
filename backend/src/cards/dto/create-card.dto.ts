import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional() // Campo não obrigatório no DTO.
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  columnId: number; // Qual coluna este card pertence
}
