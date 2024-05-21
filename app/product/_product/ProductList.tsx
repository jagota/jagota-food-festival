"use client"

import { IProductDB, getProducts } from "@/apihandler/product.api";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

interface IProps {
    types: string[]
}
export const ProductList = () => {
    let [products, setProduct] = useState<IProductDB[]>([]);
    useEffect(() => {
        async function fetchProducts() { 
            const {error, data = []} = await getProducts({});
            console.log("products", data);
            if (!error) {
                setProduct(data);
            }
        }
        fetchProducts();
    }, []);
    
    return (
        <div className='container mx-auto'>
            <div className='grid lg:grid-cols-3 xl:grid-cols-3 gap-[2rem] md:grid-cols-2 grid-cols-1'>
            {products && products.map((item, index) => {
                return <ProductItem key={index} product={item}/>
            })}
        </div>
        </div>
    )
}