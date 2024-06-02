import { useEffect, useState } from "react";

type Recording = {
    recordingUrl: string;
}

const Summary = () => {
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState<Recording>();
    const [audioUrl, setAudioUrl] = useState("");
    const [text, setText] = useState("");
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [firstTime, setFirstTime] = useState(false);

    useEffect(() => {
        const getRecording = async () => {
            setLoading(true);
            try {
                setTimeout(async () => {
                    const response = await fetch(`/api/getLatestRecording`);
                    const data = await response.json();
                    console.log(data);
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
        setDownloadLoading(true);
        try {
            const response = await fetch(`/api/downloadRecording?mp4Url=${recording?.recordingUrl}`);
            const data = await response.json();
            const audioBlob = new Blob([Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            setFirstTime(true);
            console.log(data.text);
            setText(data.text);
        } catch (error) {
            console.error('Error generating summary:', error);
        } finally {
            setDownloadLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-8 min-h-screen bg-black text-white">
            {!firstTime && <button
                onClick={handleDownload}
                disabled={downloadLoading}
                className={`px-4 py-2 rounded-md text-white ${downloadLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {downloadLoading ? 'Please wait, we are generating your summary!' : 'Generate Summary'}
            </button>}
            <div className="flex flex-col md:flex-row w-full mt-8 space-y-8 md:space-y-0 md:space-x-8">
                {text && <div className="w-full md:w-3/5 p-4 bg-gray-900 rounded-md min-h-[70vh]">
                    {text && (
                        <div>
                            <h3 className="font-bold italic mb-4">Summary</h3>
                            <textarea
                                value={text}
                                className="w-full p-4 bg-black border border-neutral-600 rounded-md"
                                style={{
                                    height: 'auto',
                                    overflowX: 'hidden',
                                    overflowY: 'auto',
                                    minHeight: '50vh',
                                }}
                                readOnly
                            />
                        </div>
                    )}
                </div>}
                {audioUrl && <div className="w-full md:w-2/5 p-4 flex flex-col justify-center gap-8 items-center bg-gray-900 rounded-md min-h-[70vh]">
                    <div className="font-semibold text-2xl mb-4 text-center">
                        {audioUrl && (
                            <div className="flex flex-col pb-6">
                                <span>
                                    Too Lazy to read?
                                </span>
                                Listen to the summary instead!
                            </div>
                        )}
                    </div>
                    {audioUrl && (
                        <audio controls src={audioUrl} className="w-full mb-12" />
                    )}
                </div>}
            </div>
           {firstTime && <div className="flex flex-row justify-center gap-4 items-center mt-8">
                <div className="font-semibold text-lg">
                    Not Satisfied with the response?
                </div>
                <div>
                    <button
                        onClick={handleDownload}
                        disabled={downloadLoading}
                        className={`px-4 py-2 rounded-md text-white ${downloadLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {downloadLoading ? 'Please wait, we are regenerating your summary!' : 'Re-Generate Summary'}
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default Summary;