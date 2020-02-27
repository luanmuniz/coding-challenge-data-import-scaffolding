import {Table, Column, Model, DataType, AutoIncrement, CreatedAt, UpdatedAt} from 'sequelize-typescript';
import { Moment } from 'moment';
 
@Table
export class PortCall extends Model<PortCall> {
 
  @Column(DataType.BIGINT)
  @AutoIncrement
  id: string;
 
  @Column(DataType.DATE)
  arrival: Moment;

  @Column(DataType.DATE)
  departure: Moment;

  @Column(DataType.BOOLEAN)
  isDeleted: boolean;

  @CreatedAt
  creationDate: Moment;

  @UpdatedAt
  updatedOn: Date;
}
