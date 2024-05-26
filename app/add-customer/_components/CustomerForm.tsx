import { PrimaryButton } from "@/components/ui/primary-button"
import { AboutSection } from "./AboutSection"
import { ContactSection } from "./ContactSection"
import { InterestSection } from "./InterestSection"
import { LocationSection } from "./LocationSection"
import { useCustomerForm } from "./context/CustomerContext"
import { Button } from "@/components/ui/button"

export const CustomerForm = () => {
    const { customer} = useCustomerForm()
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("submit", customer);
    }
    return (
        <form action="" className="overflow-hidden flex flex-col gap-10 w-full mb-10">
        <AboutSection />
        <ContactSection />
        <LocationSection />
        <InterestSection />
        <Button
            variant={"default"}
          onClick={handleClick}
        >Submit</Button>
      </form>
    )
}