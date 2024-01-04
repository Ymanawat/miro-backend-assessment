import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtDashboardGuard, JwtShareGaurd } from 'src/auth/jwt/jwt.gaurds';
import { NotesService } from './note.service';
import { NotesDto } from './note.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtDashboardGuard)
  @Post()
  async createCrouse(@Request() req: any, @Body() notesDto: NotesDto) {
    return await this.notesService.createNote({
      userId: req.user._id,
      notesDto,
    });
  }

  @UseGuards(JwtDashboardGuard)
  @Put(':id')
  async updateNote(
    @Request() req: any,
    @Body() notesDto: NotesDto,
    @Param('id') id: string,
  ) {
    return await this.notesService.updateNote({
      userId: req.user._id,
      notesDto,
      notesId: id,
    });
  }

  @UseGuards(JwtDashboardGuard)
  @Get(':id')
  async getNote(@Request() req: any, @Param('id') id: string) {
    return await this.notesService.getNote({
      userId: req.user._id,
      notesId: id,
    });
  }

  @UseGuards(ThrottlerGuard, JwtDashboardGuard)
  @Get()
  async getAllNotes(@Request() req: any) {
    return await this.notesService.getAllNotes(req.user._id);
  }

  @UseGuards(JwtDashboardGuard)
  @Delete(':id')
  async deleteNode(@Request() req: any, @Param('id') id: string) {
    return await this.notesService.deleteNote({
      userId: req.user._id,
      notesId: id,
    });
  }

  @UseGuards(JwtDashboardGuard)
  @Post(':id/share')
  async shareNote(@Request() req: any, @Param('id') id: string) {
    return await this.notesService.shareNote({
      userId: req.user._id,
      notesId: id,
    });
  }

  @UseGuards(JwtShareGaurd)
  @Get(':id/share')
  async getSharedNote(@Request() req: any, @Param('id') id: string) {
    return await this.notesService.getSharedNote({
      notesIdFromUrl: id,
      notesIdFromToken: req.user?.notesId,
    });
  }

  @UseGuards(JwtDashboardGuard)
  @Get('search')
  async searchNotes(@Request() req: any, @Query('q') query: any) {
    return await this.notesService.searchNotes({
      userId: req.user._id,
      query,
    });
  }
}
