import { UserProfile } from "@clerk/nextjs"

const profilePage = () => {
  return (
    <div className="container  ">
      <div className="flex justify-center pt-40 pb-10">
        <UserProfile />  
      </div>
    </div>
  )
}

export default profilePage