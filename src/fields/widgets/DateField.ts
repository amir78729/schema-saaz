import { StringField, StringFieldType } from '../primitives/StringField';

export type DateType = StringFieldType;

export class DateField extends StringField {
  constructor(name: string) {
    super(name);
    this.format = 'date';
  }
}
