import { IsEmail, IsNumberString, Length, MinLength } from 'class-validator';
import { RolesEnum } from 'src/user/enums/user-roles.enum';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from 'src/generics/timestamp.entity';
import Offer from 'src/offer/entities/offer.entity';

@Entity()
class User extends Timestamp{


    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        nullable: false,
    })
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;
    
    
    @OneToMany(() => Offer, (offer) => offer.carListor,{
      eager:true,
    })
    offers?: Offer[]


    @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    unique: true
  })
  @IsNumberString()
  @Length(8,8)
  cin: string;

  @Column({
      type: 'enum',
      enum: RolesEnum,
      default: RolesEnum.USER
    }
  )
  role: RolesEnum;

}



export default User;