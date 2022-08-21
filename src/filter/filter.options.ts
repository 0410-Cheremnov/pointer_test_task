import { Between } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class FilterOptions {

  @ApiProperty()
  limit?: number;

  @ApiProperty()
  skip?: number;

  //поле по которому сортируем
  @ApiProperty()
  order?: string;

  //ask desk
  @ApiProperty()
  sort?: string;

  @ApiProperty()
  dateFrom?: Date;

  @ApiProperty()
  dateTo?: Date;


  constructor(data: any) {
    this.limit = data.limit;
    this.skip = data.skip;
    this.order = data.order;
    this.sort = data.sort;
  }

  public static async getOptions(data: Partial<FilterOptions>) {
    if (data.dateFrom > data.dateTo) {
      const t = data.dateFrom;
      data.dateFrom = data.dateTo;
      data.dateTo = t;
    }
    return Object.assign({},
      data.limit && {take: data.limit},
      data.skip && {skip: data.skip},
      data.dateTo && data.dateFrom && {where: {date: Between(data.dateFrom, data.dateTo)}},
      data.order && data.sort && {order: {[data.order]: data.order}}
  )
}}