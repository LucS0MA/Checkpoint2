import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@ObjectType()
@Entity()
export class Country extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    code : string

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    emoji: string

    @Field()
    @Column()
    continent: string
}
