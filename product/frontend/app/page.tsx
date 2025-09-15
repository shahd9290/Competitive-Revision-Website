'use client'
import {useState} from "react";
import axios from "axios";

export default function Home() {
    const apiUrl = process.env.API_URL;

    const [qualification, setQualification] = useState('');
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');

    const addQualification = async (event: {preventDefault: () => void;}) => {
        event.preventDefault();

        const payload = {
            "qualification": qualification
        }

        try {
            await axios.post(`${apiUrl}/api/qualification/add`, payload, {withCredentials:true}).then((response) => {alert(response.data)});

        }
        catch (error: any) {
            if (error.response && error.response.data) {
                alert(error.response.data || "An error occurred while trying to add qualification.");
            } else {
                alert("Unable to connect to server.");
            }
        }
    }

    const addSubject = async (event: {preventDefault: () => void;}) => {
        event.preventDefault();

        const payload = {
            "qualification": qualification,
            "name": subject
        }

        try {
            await axios.post(`${apiUrl}/api/subject/add`, payload).then((response) => {alert(response.data)});

        }
        catch (error: any) {
            if (error.response && error.response.data) {
                alert(error.response.data || "An error occurred while trying to add subject.");
            } else {
                alert("Unable to connect to server.");
            }
        }
    }

    const addTopic = async (event: {preventDefault: () => void;}) => {
        event.preventDefault();

        const payload = {
            "qualification": qualification,
            "subject": subject,
            "name": topic
        }

        try {
            await axios.post(`${apiUrl}/api/topic/add`, payload).then((response) => {alert(response.data)});

        }
        catch (error: any) {
            if (error.response && error.response.data) {
                alert(error.response.data || "An error occurred while trying to add topic.");
            } else {
                alert("Unable to connect to server.");
            }
        }
    }

    return (<main>
        <div>
            <h1 className="flex justify-center font-extrabold text-2xl">This page serves as a temporary frontend
                counterpart to the endpoints requires to add Subjects, Topics and Qualifications to the system.</h1>
            <h2 className="flex justify-center font-bold text-xl">The final product will have a dedicated section
                for
                these endpoints. I was not able to implement this for the interim submission.</h2>
            <br/>
            <div className="flex justify-center text-xl">
                <p>To add a Qualification, only the <b>Qualification</b> field needs to be filled.</p><br/>
            </div>
            <div className="flex justify-center text-xl">
                <p>To add a Subject, the <b>Qualification</b> and the <b>Subject</b> fields need to be filled.</p>
            </div>
            <div className="flex justify-center text-xl">
                <p>To add a Topic, the <b>Qualification</b>, the <b>Subject</b> and the <b>Topic</b> fields need to be
                    filled.</p>
            </div>
        </div>
        <br/>
        <div>
            <form>
                <div className="flex justify-center font-bold text-xl">
                    <div>
                        <label className="text-xl font-bold">Qualification: </label>
                        <input id="qualification" name="qualification" type="text" onChange={event => setQualification(event.target.value)}/>
                    </div>
                    <div>
                        <label className="text-xl font-bold">Subject: </label>
                        <input id="subject" name="subject" type="text" onChange={event => setSubject(event.target.value)}/>
                    </div>
                    <div>
                        <label className="text-xl font-bold">Topic: </label>
                        <input id="topic" name="topic" type="text" onChange={event => setTopic(event.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="flex justify-center gap-40">
                    <button className="text-xl font-bold bg-gray-300 rounded-2xl" onClick={addQualification}>Add Qualification</button>
                    <button className="text-xl font-bold bg-gray-300 rounded-2xl" onClick={addSubject}>Add Subject</button>
                    <button className="text-xl font-bold bg-gray-300 rounded-2xl" onClick={addTopic}>Add Topic</button>
                </div>
            </form>
        </div>
        <br/>
        <div className="flex justify-center font-bold text-xl">
            <p>Once done, you can click <a href="/create" className="underline">here</a> to navigate to the account creation page.</p>
        </div>
    </main>);
}
