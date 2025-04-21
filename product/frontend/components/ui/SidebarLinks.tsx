import {
    IconArrowLeft,
    IconBooks,
    IconFileCertificate,
    IconFolders,
    IconHome,
    IconListCheck,
    IconLogout,
    IconSearch,
    IconUsersGroup
} from "@tabler/icons-react";
import React from "react";
/**
 * Original Documentation - https://ui.aceternity.com/components/sidebar
 */
export const userLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        ),
    },
    {
        label: "Search",
        href: "/subjects",
        icon: (
            <IconSearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        )
    },
    {
        label: "Logout",
        href: "/logout",
        icon: (
            <IconLogout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        ),
    },
];
export const adminLinks = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: (
            <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        ),
    },
    {
        label: "Questions",
        href: "/admin/questions",
        icon: (
            <IconListCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        )
    },
    {
        label: "Topics",
        href: "/admin/topics",
        icon: (
            <IconFolders className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        ),
    },
    {
        label: "Subjects",
        href: "/admin/subjects",
        icon: (
            <IconBooks className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        ),
    },
    {
        label: "Qualifications",
        href: "/admin/qualifications",
        icon: (
            <IconFileCertificate className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        ),
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: (
            <IconUsersGroup className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        ),
    },
    {
        label: "Logout",
        href: "/logout",
        icon: (
            <IconLogout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
        ),
    },
];