'use client'
import {SidebarMenu} from "@/components/SidebarMenu";
import {useEffect, useState} from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import axios from "axios";

export function Search() {

    const [subjects, setSubjects] = useState([]);
    const [userQual, setUserQual] = useState("");

    useEffect(() => {
        const qual = async () => {
            const response = await axios.get("http://localhost:8080/api/user/get-qualification", {withCredentials:true})
            return response.data;
        }

        qual().then(data => {
            setUserQual(data.name);
        });
    },[])

    useEffect(() => {
        if (!userQual) return;

        const subjects = async () => {
            const response = await axios.get(`http://localhost:8080/api/subject/get-all?qualification=${userQual}`, {withCredentials:true});
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
                />
            ))}
        </BentoGrid>
    );
}
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