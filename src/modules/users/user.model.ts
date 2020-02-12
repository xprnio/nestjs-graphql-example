import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Team } from '../teams/team.model';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  firstName: string;

  @Column()
  @Field({ nullable: false })
  lastName: string;

  @ManyToMany(() => Team, team => team.members)
  @Field(() => [ Team ], { nullable: true })
  teams: Team[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
