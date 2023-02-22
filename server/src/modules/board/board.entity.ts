import { Expose } from 'class-transformer';

export class BoardEntity {
  src: string;

  constructor(partial: Partial<BoardEntity>, req?: any) {
    partial['full_src'] = `${req.protocol}://${req.get('Host')}/file${
      partial.src
    }`;
    Object.assign(this, partial);
  }
}
