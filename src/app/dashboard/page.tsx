import { auth } from "@clerk/nextjs"
const dashboardPage = () => {
    const {userId} = auth();
    
  return (
    <div> {userId}</div>
  )
}

export default dashboardPage