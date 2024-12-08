import {fireEvent, render, screen} from "@testing-library/react";
import Page from "@/app/dashboard/page";
import axios from "axios";
import '@testing-library/jest-dom'



jest.mock('axios')

it ("displays the sidebar", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data:{username:"user"}})
    render(<Page />)

    expect(await screen.findByRole('link', {name: /dashboard/i})).toBeInTheDocument()
    expect(await screen.findByRole('link', {name: /search/i})).toBeInTheDocument()
    expect(await screen.findByRole('link', {name: /logout/i})).toBeInTheDocument()

    const sidebar =  screen.getByRole('link', {name: ""});
    fireEvent.mouseEnter(sidebar);
    expect(screen.getAllByText(/Study App/i)[0]).toBeInTheDocument();
})

it ("displays the user profile", async ()=> {
    (axios.get as jest.Mock).mockResolvedValueOnce({data:{username:"user"}})
    render(<Page />)

    expect(await screen.findByText(/Hello, user!/i)).toBeInTheDocument()
    expect (screen.getByText(/Your Points: 0/i)).toBeInTheDocument()
})