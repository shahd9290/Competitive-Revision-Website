import {SidebarMenu} from "@/components/ui/SidebarMenu";

const Quiz = () => {
    return(
        <div>
            <h1>Quiz Page</h1>
        </div>
    )
}


/**
 * A wrapper component for the `Quiz` component with a sidebar menu.
 */
const Page = () => {

    return (
        <div>
            <SidebarMenu>
                <Quiz/>
            </SidebarMenu>
        </div>
    )
}

export default Page