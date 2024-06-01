import { useEffect, useState } from "react";
const Summary = () => {
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState();
    const [audioUrl, setAudioUrl] = useState("");

    useEffect(() => {
        setLoading(true);
        const getRecording = async () => {
            setTimeout(async () => {
                const response = await fetch(`/api/getLatestRecording`);
                const data = await response.json();
                console.log(data);
                setRecording(data.recording);
            }, 3000)
            setLoading(false);
        }
        getRecording();
    }, [])

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/downloadRecording?mp4Url=${recording?.recordingUrl}`);
            console.log(response);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
        } catch (error) {
            console.error('Error generating summary:', error);
        } finally {
            setLoading(false);
        }
    };
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


            <button onClick={handleDownload} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Summary'}
            </button>


            {audioUrl && (
                <audio controls src={audioUrl}>
                </audio>
            )}

        </div>
    )
}

export default Summary;