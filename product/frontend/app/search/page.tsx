import {SidebarMenu} from "@/components/SidebarMenu";
import React from "react";

const Search = () => {
    return (
        <div>
            <h1>Search</h1>
        </div>
    );
};

const Page = () => {

    return (
        <div>
            <SidebarMenu>
                <Search/>
            </SidebarMenu>
        </div>
    )
}

export default Page