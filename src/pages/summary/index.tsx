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
                setTimeout(async() => {
                    const response = await fetch(`/api/getLatestRecording`);
                    const data = await response.json();
                    setRecording(data.recording);
                }, 2500)
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
        <div className="flex flex-col items-center p-8 h-screen">
            <button onClick={handleDownload} disabled={loading}>
                {loading ? 'Please wait we are importing your conversation!' : 'Generate Summary'}
            </button>
            <div className="flex w-full mt-8">
                <div className="w-3/5 p-4">
                    {text && (
                        <div>
                            <h3 className="font-bold italic">Summary</h3>
                            <textarea
                                value={text}
                                className="w-full text-white bg-black border border-neutral-300"
                                style={{
                                    height: 'auto',
                                    overflowX: 'hidden',
                                    overflowY: 'auto',
                                    minHeight: '250px',
                                }}
                                readOnly
                            />
                        </div>
                    )}
                </div>
                <div className="w-2/5 p-4 flex flex-col justify-evenly items-center">
                    <div className="font-semibold text-2xl">
                        Too Lazy to read? Listen to the summary instead!
                    </div>
                    {audioUrl && (
                        <audio controls src={audioUrl} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Summary;