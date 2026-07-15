import {CACHE_KEYS} from '../cache/cache.keys.js';
import {cacheService} from '../cache/cache.service.js';
import {productRepository} from '../repositories/product.repository.js'
import {type CreateProductInput, type ProductFilters } from '../types/product.types.js'
import { type IProduct, type IProductWithUser } from '../interfaces/product.interface.js';


export const productService = {
    async getAllProducts(filters?: ProductFilters): Promise<IProductWithUser[]> {
        const cacheKey = filters?.search
        ?CACHE_KEYS.PRODUCT_BY_NAME(filters.search)
        : CACHE_KEYS.ALL_PRODUCTS;

        const cachedData = await cacheService.get<IProductWithUser[]>(cacheKey);
        if(cachedData) return cachedData;

        const products = await productRepository.findAll(filters);

        if (products.length > 0) {
            await cacheService.set(cacheKey, products, 300)
        }

        return products;
    }
}
