import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Feedback {

  @ApiProperty()
  @PrimaryColumn()
  id?:string;

  @ApiProperty()
  @Column()
  userName?: string;

  @ApiProperty()
  @Column({type: 'timestamptz'})
  date?: Date;

  @ApiProperty()
  @Column()
  text?: string;

  @ApiProperty()
  @Column({type: 'jsonb'})
  order?: object[];

  @ApiProperty()
  @Column({type: 'jsonb', nullable: true})
  answer?: object[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;
}
