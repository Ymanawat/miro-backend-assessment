import { IsNotEmpty, IsString } from 'class-validator';

export class NotesDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateNotesDto {
  @IsString()
  title?: string;

  @IsString()
  content?: string;
}

export class NotesResponseDto {
  data: NotesDto;
}

export class AllNotesResponseDto {
  data: NotesDto[];
}
