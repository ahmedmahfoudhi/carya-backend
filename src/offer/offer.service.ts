import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dtos/create-offer.dto';
import { FindOffersDto } from './dtos/find-offers.dto';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import Offer from './entities/offer.entity';

@Injectable()
export class OfferService {
    constructor(@InjectRepository(Offer) private readonly offerRepository: Repository<Offer>,
                private readonly userService: UserService
    ){}

    // GETS an offer by its id
    async getOfferById(id: number): Promise<Offer>{
        const offer = await this.offerRepository.findOne({where:[{id}]});
        if(!offer){
            throw new NotFoundException(`offer with id ${id} does not exist`);
        }
        offer.carListor.password = undefined;
        return offer;
    }

    // GETS all offers
    async getAllOffers(): Promise<Offer[]>{
        const offers = await this.offerRepository.find();
        const offersToReturn = offers.map(offer => offer.carListor.password = undefined);
        return offersToReturn;
    }

    // GETS offers paginated and sorted of a user if specified or of all users 
    async getOffersPaginatedAndSorted(findOption: FindOffersDto, id = undefined): Promise<any>{
        const cirteria = findOption.criteria ? findOption.criteria : 'createdAt';
        const orderType = findOption.orderType  ? findOption.orderType === 'ASC'? 'ASC'
                                                                                : 'DESC'
                                                : 'DESC';
        const page = findOption.page ? findOption.page : 1;
        const nbPerPage = findOption.nbPerPage ? findOption.nbPerPage : 10;
        const queryBuilder = this.offerRepository.createQueryBuilder('offer');
        queryBuilder.orderBy(`offre.${cirteria}`,orderType)
                    .offset((page-1)*nbPerPage)
                    .limit(nbPerPage);
        if(id){
            queryBuilder.andWhere('offer.carListor = :id', {id});
        }
        const result = await queryBuilder.getMany();
        const total = await queryBuilder.getCount();
        const nbOfPages = Math.ceil(total/nbPerPage);
        return {
            data: result,
            page,
            total,
            nbOfPages
        }
         
    }

    // ADDS a new offer
    async createOffer(createOfferDto: CreateOfferDto): Promise<Offer>{
        const user = await this.userService.getUserById(createOfferDto.user);
        if(!user){
            throw new BadRequestException(`user with id ${user.id} does not exist`);
        }
        try {
            const offer = this.offerRepository.create({
                ...createOfferDto,
                carListor: user
            })
            offer.carListor.password = undefined;
            return offer;
        } catch (error) {
            console.log(error);
            throw new BadRequestException('something went wrong, try again later!');
        }
    }

    // UPDATES an offer
    async updateOffer(id:number, updateOfferDto: UpdateOfferDto): Promise<Offer>{
        const offer = await this.offerRepository.preload({id, ...updateOfferDto});
        if(!offer){
            throw new NotFoundException(`offer with id ${id} does not exist`);
        }
        const updatedOffer = await this.offerRepository.save(offer);
        updatedOffer.carListor.password = undefined;
        return updatedOffer;
    }

    // SOFT-DELETS an offer
    async softDelete(id:number): Promise<any>{
        const result = await this.offerRepository.softDelete(id);
        if(result.affected){
            return result;
        }
        throw new NotFoundException(`offer with id ${id} does not exist`);
    }

    // PERMANENTLY-DELETES an offer
    async hardDelete(id: number): Promise<any>{
        const result = await this.offerRepository.delete(id);
        if(result.affected){
            return result;
        }
        throw new NotFoundException(`offer with id ${id} does not exist`)
    }
}