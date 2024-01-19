import {Tabs, TabList, Tab} from "@chakra-ui/react"

export default function NavBar() : React.ReactNode {
   return (
     <Tabs>
       <TabList>
         <Tab>
           Home
         </Tab>
         <Tab>
           Other
         </Tab>
         <Tab>
           Etc...
         </Tab>
       </TabList>
     </Tabs>
   )
}
