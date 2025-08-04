import Link from "next/link"
import { Button } from "./ui/button"
import { StarsIcon } from "lucide-react"

const PricingPageButton = () => {
  return (
    <Button asChild variant={"outline"} className="hover:bg-gradient-to-r from-primary to-primary/50 hover:text-background transition duration-300">
        <Link href={"/pricing"}><StarsIcon className="mr-2"/> Upgrade to Pro</Link>
    </Button>
  )
}

export default PricingPageButton