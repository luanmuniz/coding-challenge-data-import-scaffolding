import {Table, Column, Model, DataType, AutoIncrement, CreatedAt, UpdatedAt, PrimaryKey, BelongsTo, DeletedAt} from 'sequelize-typescript';
import { Moment } from 'moment';
import Vessel from './vessel';
 
@Table({
  tableName: 'port_calls', 
  underscored: true,
})
export default class PortCall extends Model<PortCall> {
 
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;
 
  @Column(DataType.DATE)
  arrival: Moment;

  @Column(DataType.DATE)
  departure: Moment;

  @Column(DataType.STRING)
  portId: string;

  @Column(DataType.STRING)
  portName: string;

  @Column(DataType.BOOLEAN)
  isDeleted: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  createdDate: Moment;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedDate: Moment;

  @DeletedAt
  @Column(DataType.DATE)
  deletedDate: Moment;

  @BelongsTo(() => Vessel, 'vessel_imo')
  vessel: Vessel;
}
