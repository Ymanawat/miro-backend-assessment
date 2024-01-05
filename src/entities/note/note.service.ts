import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from 'src/mongodb/schemas/notes.schema';
import { User } from 'src/mongodb/schemas/user.shema';
import { compareIds, isIdInArray } from 'src/utils/util';
import { AllNotesResponseDto, NotesResponseDto } from './note.dto';
import { domainsConfig, jwtConfig } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Note.name)
    private readonly notesModel: Model<Note>,
    private readonly jwtService: JwtService,
  ) {}

  public async createNote({ userId, notesDto }): Promise<NotesResponseDto> {
    const user = await this.userModel.findById(userId);

    notesDto.adminUserIds = [userId];
    const newNote = await this.notesModel.create({
      ...notesDto,
    });

    return { data: newNote };
  }

  public async updateNote({
    userId,
    notesDto,
    notesId,
  }): Promise<NotesResponseDto> {
    const note = await this.notesModel.findById(notesId);

    if (!note) {
      throw new NotFoundException(['No note is found with this noteId']);
    }

    if (!isIdInArray(userId, note.adminUserIds)) {
      throw new ForbiddenException([
        'User has no access to the edit this note',
      ]);
    }

    const updatedNote = await this.notesModel.findByIdAndUpdate(
      { _id: notesId },
      { $set: notesDto },
      { __v: 0, new: true },
    );

    return { data: updatedNote };
  }

  public async getNote({ userId, notesId }): Promise<NotesResponseDto> {
    const note = await this.notesModel.findById(notesId).select({ __v: 0 });
    if (!note) {
      throw new NotFoundException(['No note is found with this noteId']);
    }
    if (!isIdInArray(userId, note.adminUserIds)) {
      throw new ForbiddenException(['User does not have access to this note']);
    }
    return { data: note };
  }

  public async getAllNotes(userId): Promise<AllNotesResponseDto> {
    const notes = await this.notesModel
      .find({
        adminUserIds: { $in: [userId] },
      })
      .select({ __v: 0 })
      .exec();

    return { data: notes };
  }

  public async deleteNote({ userId, notesId }) {
    const note = await this.notesModel.findById(notesId);

    if (!note) {
      throw new NotFoundException(['No note is found with this noteId']);
    }
    if (!isIdInArray(userId, note.adminUserIds)) {
      throw new ForbiddenException(['User has no access to delete this note']);
    }

    try {
      await this.notesModel.findByIdAndDelete(notesId);
      return {
        success: true,
      };
    } catch (error) {
      throw new error();
    }
  }

  public async shareNote({ userId, notesId }) {
    const note = await this.notesModel.findById(notesId);

    if (!note) {
      throw new NotFoundException(['No note is found with this noteId']);
    }
    if (!isIdInArray(userId, note.adminUserIds)) {
      throw new ForbiddenException(['User does not have access to this note']);
    }

    const payload = {
      notesId: notesId.toString(),
      context: jwtConfig.audience.share,
    };
    const shareNotesToken = this.jwtService.sign(payload, {
      audience: jwtConfig.audience.share,
      secret: jwtConfig.secrets.share,
    });

    const sharingUrl = `${domainsConfig.restapi}/api/notes/${notesId}/share?token=${shareNotesToken}`;
    return { sharingUrl: sharingUrl };
  }

  async searchNotes({ userId, query }): Promise<AllNotesResponseDto> {
    try {
      const notes = await this.notesModel
        .find({
          adminUserIds: userId,
          $text: { $search: query },
        })
        .select({ __v: 0 });

      return { data: notes };
    } catch (error) {
      throw new Error('Error fetching notes');
    }
  }

  async getSharedNote({ notesIdFromUrl, notesIdFromToken }) {
    if (!compareIds(notesIdFromToken, notesIdFromUrl)) {
      throw new ForbiddenException(['Invalid share link']);
    }

    const note = await this.notesModel
      .findById(notesIdFromToken)
      .select({ _id: 0, __v: 0 });
    console.log();
    if (!note) {
      throw new ForbiddenException(['invalid sharing link']);
    }

    return { data: note };
  }
}
