import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export async function passwordHash(pass: string): Promise<string> {
  const hash = await bcrypt.hash(pass, 4);
  return hash.toString();
}

export async function comparePassword(
  userPass: string,
  dbPass: string,
): Promise<boolean> {
  const res = await bcrypt.compare(userPass, dbPass);
  if (!res) return false;
  else {
    return true;
  }
}

export function compareIds(
  id1: string | mongoose.Types.ObjectId,
  id2: string | mongoose.Types.ObjectId,
): boolean {
  const stringId1 = typeof id1 === 'string' ? id1 : id1.toString();
  const stringId2 = typeof id2 === 'string' ? id2 : id2.toString();

  return stringId1 === stringId2;
}

export function isIdInArray(
  idToCheck: string | mongoose.Types.ObjectId,
  idArray: (string | mongoose.Types.ObjectId)[],
): boolean {
  for (const id of idArray) {
    if (compareIds(idToCheck, id)) {
      return true;
    }
  }
  return false;
}
