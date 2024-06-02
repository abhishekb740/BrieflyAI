import { useEffect, useState } from "react";

type Recording = {
    recordingUrl: string;
}

const Summary = () => {
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState<Recording>();
    const [audioUrl, setAudioUrl] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        const getRecording = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/getLatestRecording`);
                const data = await response.json();
                setRecording(data.recording);
            } catch (error) {
                console.error('Error fetching recording:', error);
            } finally {
                setLoading(false);
            }
        };
        getRecording();
    }, []);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/downloadRecording?mp4Url=${recording?.recordingUrl}`);
            const data = await response.json();
            const audioBlob = new Blob([Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            console.log(data.text);
            setText(data.text);
        } catch (error) {
            console.error('Error generating summary:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-8">
            <button onClick={handleDownload} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Summary'}
            </button>

            {audioUrl && (
                <audio controls src={audioUrl} />
            )}
            
            {text && (
                <div className="mt-4">
                    <h3>Summary:</h3>
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
};

export default Summary;
