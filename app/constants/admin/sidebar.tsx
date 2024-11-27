import {Box, Cat, Layers2, LayoutDashboard, LibraryBig, PackageOpen, ShoppingCart, Star, User} from 'lucide-react'

export const sideMenuList = [
    {
        name:"Dashboard",
        link:"/admin",
        icon:<LayoutDashboard className='h-5 w-5'/>
    },
    {
        name:"Products",
        link:"/admin/products",
        icon:<PackageOpen className='h-5 w-5'/>
    },{
        name:"Categories",
        link:"/admin/categories",
        icon:<Layers2 className='h-5 w-5'/>
    },{
        name:"Brands",
        link:"/admin/brands",
        icon:<Cat className='h-5 w-5'/>
    },{
        name:"Orders",
        link:"/admin/orders",
        icon:<ShoppingCart className='h-5 w-5'/>
    },
    {
        name:"Customers",
        link:"/admin/customers",
        icon:<User className='h-5 w-5'/>
    },
    {
        name:"Reviews",
        link:"/admin/reviews",
        icon:<Star className='h-5 w-5'/>
    },
    {
        name:"Collections",
        link:"/admin/collections",
        icon:<LibraryBig className='h-5 w-5'/>
    }
]