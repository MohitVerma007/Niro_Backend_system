import { type IProduct } from "../interfaces/product.interface.js";

export type CreateProductInput = Omit<IProduct, 'id'>;
export type UpdateProductInput = Partial<Omit<CreateProductInput, 'id'>>;

export type ProductFilters = {
    search?: string;
};