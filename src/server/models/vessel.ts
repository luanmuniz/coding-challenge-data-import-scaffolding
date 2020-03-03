import {Table, Column, Model, DataType, CreatedAt, PrimaryKey} from 'sequelize-typescript';
import { Moment } from 'moment';
import { DataTypes } from 'sequelize/types';
 
@Table({
  tableName: 'vessels', 
  underscored: true,
  updatedAt: false,
  deletedAt: false
})
export default class Vessel extends Model<Vessel> {

  @PrimaryKey
  @Column
  imo: number;

  @Column
  name: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdDate: Moment;
}
