import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactEntity{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    @IsNotEmpty({ message: "Name is required" })
    @IsString({ message: "Name must be a string" })
    name!: string;

    @IsEmail({}, { message: "Invalid email address" })
    @Column()
    email!: string;

    @Column()
     @IsNotEmpty({ message: "Subject is required" })
    @IsString({ message: "Subject must be a string" })
    subject!: string;

    @Column()
    @IsNotEmpty({ message: "Message is required" })
    @IsString({ message: "Message must be a string" })
    message!: string;
}