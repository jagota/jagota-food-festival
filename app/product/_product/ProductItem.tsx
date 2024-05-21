import { IProductDB } from '@/apihandler/product.api';
import React from 'react';

type propData = {
    image:string,
    productName:string,
    desc:string,
    price:number,
    rating:number
}

interface ProductItemProps {
    product: IProductDB
 }


function ProductItem({product}:ProductItemProps) {
  return (
    <div className='flex flex-col h-[400px] md:min-w-[270px] w-[95%] shadow-xl rounded-md mx-auto'>
        <div className='h-[55%]'>
            <img src={`${product.PRODUCT_THUMBNAIL}`} alt="img1" className='object-cover h-full w-full'/>
        </div>
        <div className='h-[45%] p-[10px]'>
            <h4 className='text-xl font-bold'>{product.PRODUCT_CODE}</h4>
            <p>{product.PRODUCT_SHORT_CODE}</p>
            <div className='flex justify-between items-center pt-3'>
            <h3 className='text-blue-500 font-bold text-lg'>{product.PRODUCT_NAME_E}</h3>
            </div>
        </div>
    </div>
  )
}

export default ProductItem;
