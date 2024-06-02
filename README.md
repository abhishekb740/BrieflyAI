# Briefly.AI: AI-Assisted Meeting and Call Platform

## Project Description
This project is an AI-assisted meeting and call platform that integrates advanced audio and video call functionalities with AI-driven summarization capabilities. The platform leverages Huddle01's SDK for seamless video and audio communication, and it uses OpenAI's APIs (Whisper, GPT-3.5-turbo, and TTS-1) to generate both text and audio summaries of calls.

## Key Components

### Huddle01 SDK Integration
- **Video and Audio Call Capabilities**: Provides robust video and audio call functionalities.
- **High-Quality Communication**: Ensures high-quality and low-latency communication for users.

### OpenAI API Integration
- **Whisper API**: Transcribes audio from calls into text format.
- **GPT-3.5-turbo**: Generates detailed text summaries of the transcribed conversations.
- **TTS-1 API**: Converts the text summaries into audio format for users who prefer listening to the summary.

### FastAPI Framework
- **Backend Framework**: Handles HTTP requests and responses efficiently.
- **Endpoints**: Provides endpoints for uploading audio files, processing them, and returning the summarized output.

### Frontend Technologies
- **Next.js**: Used for server-side rendering and React-based components.
- **Tailwind CSS**: Utilized for efficient and responsive styling.
- **Dynamic.xyz**: Implemented for robust user authentication and authorization processes.

## How It's Made

This AI-assisted meeting and call platform was built using a combination of modern technologies to ensure robust functionality, scalability, and a seamless user experience.

### Core Components

- **Huddle01 SDK**: Provides high-quality video and audio call functionalities with low latency, directly integrated into the frontend for real-time communication.
- **Frontend Development**:
  - **Next.js**: Enables server-side rendering for faster load times and better SEO.
  - **Tailwind CSS**: Allows for efficient and responsive styling with its utility-first approach.
  - **Dynamic.xyz**: Offers secure and seamless login experiences, enhancing overall user security.
- **Backend Development**:
  - **FastAPI**: Powers the backend, handling HTTP requests and responses efficiently.
  - **Endpoints**: Created for uploading audio files, processing these files, and returning the summarized outputs.
  - **Processing Workflow**:
    - **Upload**: When an audio file is uploaded via the /talk or /text endpoints, it is temporarily saved.
    - **Transcription**: Transcribed into text using OpenAI's Whisper API.
    - **Summarization**: Text is processed by GPT-3.5-turbo to generate a detailed text summary.
    - **Text-to-Speech**: For users who prefer listening to summaries, the text is converted into audio format using OpenAI's TTS-1 API.

### Environment Variables for server folder
- **API Keys and Organization IDs**: Managed securely through environment variables.
  - `OPENAI_API_KEY`: For accessing OpenAI services.
  - `OPENAI_AI_ORG`: For the OpenAI organization ID.

### Environment Variables for client folder
- **API Keys and Project IDs**: Managed securely through environment variables.
  - `NEXT_PUBLIC_PROJECT_ID`
  - `NEXT_PUBLIC_API_KEY`

### Helper Functions
- **transcribe_audio**: For audio transcription.
- **get_chat_response**: For generating summaries.
- **load_messages**: For retrieving previous conversation contexts.
- **save_messages**: For storing conversation contexts.

## Integration and Collaboration

The integration of partner technologies significantly enhanced the platform:
- **Huddle01 SDK**: Ensured reliable communication.
- **OpenAI APIs**: Provided sophisticated AI capabilities for transcription, summarization, and text-to-speech conversion.
- **Next.js and Tailwind CSS**: Streamlined frontend development.
- **Dynamic.xyz**: Facilitated secure user authentication.

### Workflow Efficiency
- **Audio File Handling**: Efficient upload, processing, and cleanup of audio files.
- **AI-Driven Summarization**: Powerful summarization capabilities make this platform a robust and innovative solution for modern communication needs.

## Installation

### Prerequisites
- Node.js (for the frontend)
- Python 3.7+ (for the backend)
- Pip (Python package installer)

### Frontend Setup (Next.js Application)
1. Clone the repository:
   ```bash
   git clone https://github.com/abhishekb740/BrieflyAI
   cd client
   ```
2. Install dependencies:
  ```bash
   npm install
```   
3. Create a .env.local file in the client directory and add the necessary environment variables as mentioned above:
- `NEXT_PUBLIC_PROJECT_ID`
- `NEXT_PUBLIC_API_KEY`

4. Run the Next.js development server:
   ```bash
   npm run dev
   ```

### Backend Setup (FastAPI Server)
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a virtual environment and activate it
   
3. Install dependencies
  
4. Create a .env file in the server directory and add the necessary environment variables:
  - `OPENAI_API_KEY`: For accessing OpenAI services.
  - `OPENAI_AI_ORG`: For the OpenAI organization ID.

5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```

### Conclusion
This AI-assisted meeting and call platform is a state-of-the-art solution integrating advanced communication and AI technologies to provide users with seamless, high-quality calls and intelligent summarization capabilities.
