import UserProvider from "./UserContext"
import CourseContext from "./CourseContext"



const AppContextProvider = ({children}) =>{
    return(
   <UserProvider>
      <CourseContext>
          {children}
      </CourseContext> 
   </UserProvider>
  )
}
export default AppContextProvider;