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
    <div className='flex flex-col h-[300px] md:min-w-[100px] w-[95%] shadow-xl rounded-md mx-auto'>
        <div className='h-[55%] overflow-hidden'>
            <img src={`${product.PRODUCT_THUMBNAIL}`} alt="img1" className='object-cover h-auto w-full'/>
        </div>
        <div className='h-[45%] p-[10px]'>
        <h3 className='text-blue-500 font-bold text-sm'>{product.PRODUCT_NAME_E} <span className='text-base text-gray-500 pl-1'>({product.PRODUCT_SHORT_CODE})</span></h3>
            {/* <p>{product.PRODUCT_SHORT_CODE}</p>
            <div className='flex justify-between items-center pt-3'>
            </div> */}
        </div>
    </div>
  )
}

export default ProductItem;
