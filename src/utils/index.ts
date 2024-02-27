import { BadRequestException, ParseIntPipe } from '@nestjs/common';
import * as crypto from 'crypto';

export function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

export function generateParseIntPipe(propName) {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new BadRequestException(propName + '应为数字');
    },
  });
}
