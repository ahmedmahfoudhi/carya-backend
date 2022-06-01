import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { FindUsersDto } from 'src/user/dtos/find-users.dto';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { Repository } from 'typeorm';
import User from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    // returns all users that exist in the db
    async getAllUsers(): Promise<User[]> {
        const result = await this.userRepository.find();
        console.log(result);
        return result;
    }

    // returns user found by his email
    async getUserByEmail(email: string): Promise<User>{
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            }
        });
        if(!user){
            throw new NotFoundException('user does not exist');
        }
        user.password = undefined;
        return user;
    }


    // returns a user found by his id
    async getUserById(id:number): Promise<User>{
        console.log(id);
        const user = await this.userRepository.findOneBy({
            id:id
        });
        if(!user){
            throw new NotFoundException(`user with id ${id} does not exist`);
        }
        user.password = undefined;
        return user;
    }

    // ADDS a new user
    async addUser(createUserDto: CreateUserDto): Promise<User>{
        const {email,cin,phoneNumber} = createUserDto;

        // find a user by his email, cin or password to check if the new user exist in the db
        const user : User = await this.userRepository.findOne({where: [
            {email},
            {cin},
            {phoneNumber}
        ]});

        //user exist in the db
        if(user){
            let errorMsgs = [];
            if(user.email === email){
                errorMsgs.push("Email already used");
            }
            if(user.phoneNumber === phoneNumber){
                errorMsgs.push("Phone number already used");
            }
            if(user.cin === cin){
                errorMsgs.push("CIN already used");
            }
            throw new ConflictException(errorMsgs);
        }
        const newUser =this.userRepository.save(createUserDto);
        return newUser;
        
    }

    // UPDATES an existing user
    async updateUser(id:number, updateUserDto:UpdateUserDto): Promise<User>{
        const user = await this.userRepository.preload({id,...updateUserDto});
        if(user){
            const result = await this.userRepository.save(user);
            result.password = undefined;
            return result;
        }
        throw new NotFoundException('user does not exist');
    }

    // SOFT-DELETES a user 
    async softDelete(id:number):Promise<any> {
        const result = await this.userRepository.softDelete(id);
        if(result.affected){
            return result;
        }
        throw new NotFoundException(`user with id${id} does not exist`);
    }

    // DELETES a user permanently
    async hardDelete(id:number): Promise<any>{
        const result = await this.userRepository.delete(id);
        if(result.affected){
            return result;
        }
        throw new NotFoundException(`user with id ${id} does not exist`);
    }

    // GET all users sorted and paginated
    async getAllUsersSortedAndPaginated(findOption: FindUsersDto): Promise<any>{
        const page = findOption.page ? findOption.page : 1;
        const nbPerPage = findOption.nbPerPage ? findOption.nbPerPage : 10;
        const orderType = findOption.orderType ? findOption.orderType === 'ASC' ? 'ASC' 
                                                                                : 'DESC' 
                                               : 'DESC';
        const criteria = findOption.criteria ? findOption.criteria : 'createdAt';

        const queryBuilder = this.userRepository.createQueryBuilder('user');
        queryBuilder.orderBy(`user.${criteria}`,orderType)
            .limit(nbPerPage)
            .offset((page-1)*nbPerPage);
        const result = await queryBuilder.getMany();
        const total = await queryBuilder.getCount();
        const nbOfPages = Math.ceil(total/nbPerPage);
        return {
            data: result,
            page,
            total,
            nbOfPages
        };
    }



}