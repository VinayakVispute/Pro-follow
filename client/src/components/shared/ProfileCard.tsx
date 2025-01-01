import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"



const user = {
    fullName: "Vinayak Vispute",
    email: "vinayakvispute4@gmail.com",
    imageUrl: "https://res.cloudinary.com/dkawvablj/image/upload/v1735590810/ProFollow/eizlfxie8tvgsou1bspw.png"
}


const ProfileInfo: React.FC = () => {
    const { imageUrl, fullName, email } = user
    return (
        <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={imageUrl} alt={fullName} />
                <AvatarFallback>{fullName.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{fullName}</span>
                <span className="text-xs text-gray-500">{email}</span>
            </div>
        </div>
    )
}

export default ProfileInfo

