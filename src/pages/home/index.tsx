export default function Hero() {

    const Topics = [
        {
            name: 'Frontend',
        },
        {
            name: 'Backend',
        },
        {
            name: 'Fullstack',
        },
        {
            name: 'DevOps',
        },
        {
            name: 'Data Science',
        },
        {
            name: 'Machine Learning',
        }
    ]

    return (
        <main className="flex min-h-screen flex-col items-center p-20 gap-16">
            <div className="flex flex-col gap-8 justify-center items-center" >
                <div className="text-2xl md:text-3xl font-title">
                    VortexAI
                </div>
                <div className="text-md md:text-lg">
                    Shaping the Future of Recruitment 🤖
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="text-lg md:text-2xl">
                    Please choose your topic for the Interview
                </div>
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {Topics.map((topic, index) => (
                            <div key={index} className="bg-zinc-800 p-2 rounded-lg">
                                {topic.name}
                            </div>
                        ))} 
                    </div>
                </div>
            </div>

        </main>
    )
}