import { Timestamp } from "src/generics/timestamp.entity";
import User from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Offer extends Timestamp{
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    carType: string;

    @Column()
    carImages: string;
    
    @ManyToOne(() => User,(user)=>user.offers,{
    })
    carListor: User;

    
    @Column()
    carDescription: string;

    
    @Column()
    price: number;
    
}


export default Offer;