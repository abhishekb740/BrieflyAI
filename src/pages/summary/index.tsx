import { useEffect, useState } from "react";
const Summary = () => {
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState();
    useEffect(() => {
        setLoading(true);
        const getRecording = async () => {
            setTimeout(async() => {
                const response = await fetch(`/api/getLatestRecording`);
                const data = await response.json();
                console.log(data.recording);
                setRecording(data.recording);
            }, 3000)
            setLoading(false);
        }
        getRecording();
    }, [])

    return (
        <div className="flex flex-col justify-center items-center p-8">
            <div>
                {loading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div>
                        {recording?.recordingUrl}
                    </div>
                )}
            </div>

        </div>
    )
}

export default Summary;