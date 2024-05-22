import { ICustomerToDB } from "@/interfaces/Customer.interface"

interface Props {
    customer: ICustomerToDB
}
const CustomerItem = ({ customer }: Props) => {
    return (
        <div className="text-sm leading-6">
    <figure className="relative flex flex-col-reverse bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
            <p>I may not show it but i cant live without {product}.</p>
        </blockquote>
        <figcaption className="flex items-center space-x-4">
            <img src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb2RlcnxlbnwwfDB8fHwxNzEwMTY0NjIzfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="" className="flex-none w-14 h-14 rounded-full object-cover" loading="lazy" decoding="async">
            <div className="flex-auto">
                <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
                    John Doe
                </div>
                <div className="mt-0.5 dark:text-slate-300">
                    Web Developer
                </div>
            </div>
        </figcaption>
    </figure>
</div>
    )
}

export { CustomerItem }