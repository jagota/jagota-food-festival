import LetterAvatar from "@/components/LetterAvatar";
import { CustomerInterface } from "@/interfaces/Customer.interface";

interface Props {
  customer: CustomerInterface;
}


const renderItems = (items: string[]) => {
    return items.map((item, index) => {
        return (<p key={item}>{item}</p>);
    });
};
const renderBlock = (title: string, items: string[]) => {
    return (
        <div className="mt-6 text-slate-700 dark:text-slate-300 ">
            <h4 className="text-base text-slate-900 font-semibold">{title}</h4>
           <div className="flex flex-wrap gap-2">
            {renderItems(items)}
           </div>
        </div>
    )
};
const CustomerItem = ({ customer }: Props) => {
    const { interested_in, shop_type} = customer;
  return (
    <div className="text-sm leading-6">
      <figure
        className="relative flex flex-col bg-slate-200 rounded-lg p-6 
            dark:bg-slate-800 dark:highlight-white/5"
      >
        <figcaption className="flex space-x-4">
          <LetterAvatar name={customer.name} />
          <div className="flex-auto">
            <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
              {customer.name}
            </div>
            <div className="mt-0.5 dark:text-slate-300">{customer.mobile}</div>
            <div className="mt-0.5 dark:text-slate-300">
              {customer.province} - {customer.district}
            </div>
          </div>
        </figcaption>
        {interested_in.length > 0 && renderBlock("Interests", interested_in)}
        {shop_type.length > 0 && renderBlock("Customer Shop", shop_type)}
      </figure>
    </div>
  );
};

export { CustomerItem };
