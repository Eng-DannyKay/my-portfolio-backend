import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    message: string;
}