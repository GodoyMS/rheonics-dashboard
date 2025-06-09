"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { user } from "@/constants/user"
import { User, Settings, CreditCard, LogOut, Bell, HelpCircle, ChevronDown } from "lucide-react"
import Link from "next/link"

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  variant="ghost" className="relative h-12   cursor-pointer rounded-lg">
           <div className="flex flex-col gap-0 items-start">
            <div className="text-xs">{user.name}</div> 
            <div className=" text-[10px] font-light text-muted-foreground">Admin</div>
           </div>
          <Avatar className="h-8 cursor-pointer w-8">
            <AvatarImage src={user.image} alt="User avatar" />
            <AvatarFallback>GM</AvatarFallback>
          </Avatar>
          <ChevronDown/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <Link href={"/login"}>
             <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
            </Link>
         
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
