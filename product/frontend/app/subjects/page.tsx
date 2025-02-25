'use client'
import {SidebarMenu} from "@/components/ui/SidebarMenu";
import {useEffect, useState} from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import axios from "axios";

/**
 * Fetches the user's qualification and loads relevant subjects.
 * Displays the subjects and topics in a grid layout.
 *
 * @author Danyal Shah
 */
const Search = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [subjects, setSubjects] = useState([]);
    const [userQual, setUserQual] = useState("");

    useEffect(() => {
        /**
         * Fetches the user's qualification on component load.
         */
        const qual = async () => {
            const response = await axios.get(`${apiUrl}/api/user/get-qualification`, {withCredentials:true})
            return response.data;
        }

        qual().then(data => {
            setUserQual(data.name);
        });
    },[])

    useEffect(() => {
        /**
         * Fetches subjects associated with the user's qualification.
         */
        if (!userQual) return;

        const subjects = async () => {
            const response = await axios.get(`${apiUrl}/api/subject/get-all?qualification=${userQual}`, {withCredentials:true});
            setSubjects(response.data)
        }

        subjects();
    }, [userQual]);

    return (
        <BentoGrid className="max-w-7xl mx-auto flex justify-center items-center h-screen w-screen">
            {subjects.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.name}
                    topics={item.topics}
                />
            ))}
        </BentoGrid>
    );
}

/**
 * A wrapper component for the `Search` component with a sidebar menu.
 */
const Page = () => {

    return (
        <div>
            <SidebarMenu role="ROLE_USER">
                <Search/>
            </SidebarMenu>
        </div>
    )
}

export default Page