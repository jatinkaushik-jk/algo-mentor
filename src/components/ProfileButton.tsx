import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from 'lucide-react'
import { LogOutButton } from './LogOutButton'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const ProfileButton = () => {
    const { data: session } = useSession();
  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              {session?.user ? (
                <Avatar>
                  <AvatarImage
                    src={session.user.image as string}
                    alt="user avatar"
                  />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="cursor-context-menu">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/settings">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/settings">Settings</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/contact">Support</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='py-0'><LogOutButton className='text-start p-0 font-normal '/></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default ProfileButton