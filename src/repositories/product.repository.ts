import { tr } from 'zod/locales';
import {prisma} from '../config/prisma.js';
import { type IProduct, type IProductWithUser } from '../interfaces/product.interface.js';
import {type CreateProductInput, type UpdateProductInput, type ProductFilters } from '../types/product.types.js';


export const productRepository = {
    async create(data: CreateProductInput): Promise<IProduct> {
        return await prisma.product.create({data});
    },

    async findAll(filter?: ProductFilters): Promise<IProductWithUser[]>  {
        const whereClause: any = {};
        
        if (filter?.search){
            whereClause.name = {
                contains: filter.search,
                mode: 'insensitive',
            }
        }

        return await prisma.product.findMany({
            where: whereClause,
            include: {
                user: {
                    select: { id: true, name: true, email: true}
                }
            }
        }) as IProductWithUser[];
    },

    async findById(id: number): Promise<IProductWithUser | null> {
        return await prisma.product.findUnique({
            where: {id},
            include: {
                user: { select: { id: true, name: true, email: true}}
            }
        }) as IProductWithUser | null
    },

    async delete(id: number): Promise<IProduct> {
        return await prisma.product.delete({where: {id}});
    }

}

    
