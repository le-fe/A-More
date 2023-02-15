import { Expose } from 'class-transformer';

export class ElementEntity {
  id: string;
  name: string;
  src: string;
  tags: string;
  description: string;
  createAt: Date;
  updateAt: Date;

  constructor(partial: Partial<ElementEntity>, req?: any) {
    partial['full_src'] = `${req.protocol}://${req.get('Host')}/file${
      partial.src
    }`;
    Object.assign(this, partial);
  }
}
