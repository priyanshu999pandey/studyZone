import UserProvider from "./UserContext"
import CourseContext from "./courseContext";


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