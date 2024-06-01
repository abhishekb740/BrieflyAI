import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
    const [roomId, setRoomId] = useState<string>("");
    const router = useRouter();
    const startMeeting = async () => {
        const response = await fetch("https://api.huddle01.com/api/v1/create-room", {
            method: "POST",
            body: JSON.stringify({
                title: "Huddle01 Room",
            }),
            headers: {
                "Content-type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
            },
        });
        const data = await response.json();
        const roomId = data?.data?.roomId;
        console.log(roomId);
        setRoomId(roomId);
    }
    useEffect(() => {
        startMeeting();
    },[])

    const handleSubmit = () => {
        router.push(`/${roomId}`);
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-20 gap-16">
            <div className="flex flex-col gap-8 justify-center items-center" >
                <div className="text-2xl md:text-3xl font-title font-bold">
                    Briefly.AI
                </div>
                <div className="text-md font md:text-xl">
                    Transforming minutes into meaningful summaries.
                </div>
            </div>
            <div className="flex flex-col gap-16 justify-center items-center">
                <div className="text-lg md:text-2xl">
                    Start your meeting now
                </div>
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSubmit}>
                        Start Meeting
                    </button>
                </div>
            </div>
        </main>
    )
}