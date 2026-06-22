import React, { useEffect, useRef, useState } from "react";

function VoiceCommand({ addTask, darkMode }) {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
      console.log("🎤 Voice started");
    };

    recognition.onend = () => {
      setListening(false);
      console.log("🛑 Voice stopped");
    };

    recognition.onerror = (event) => {
      setListening(false);

      console.error("Speech Error:", event);

      if (event.error === "not-allowed") {
        alert("❌ Microphone permission denied.");
      } else {
        alert(`❌ Speech Error: ${event.error}`);
      }
    };

    recognition.onresult = async (event) => {
      try {
        const transcript =
          event.results[0][0].transcript.trim();

        console.log("VOICE RECEIVED:", transcript);

        if (!transcript) {
          alert("No voice detected");
          return;
        }

        await addTask({
          title: transcript,
          description: "Created via Voice",
          dueDate: "",
          assignedEmail: "",
          priority: "Low",
        });

        alert(`✅ Task Added: ${transcript}`);
      } catch (err) {
        console.error(err);
        alert("❌ Failed to save task");
      }
    };

    recognitionRef.current = recognition;
  }, [addTask]);

  const startListening = () => {
    if (!recognitionRef.current) {
      alert(
        "Speech Recognition not supported. Use Google Chrome."
      );
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
  className="mb-3"
  style={{
    width: "100%",
    maxWidth: "100%",
  }}
>

      <button
        onClick={startListening}
        className="btn btn-warning w-100"
      >
        {listening
          ? "🎙 Listening..."
          : "🎤 Add Task via Voice"}
      </button>

     <small
  className="d-block mt-2 text-center text-md-start"
        style={{
          color: darkMode ? "#ffffff" : "#000000",
          fontWeight: "500",
        }}
      >
        Speak task title after clicking button
      </small>

      {!supported && (
        <div className="mt-2 text-danger">
          Browser does not support Speech Recognition.
          Open in Google Chrome.
        </div>
      )}
    </div>
  );
}

export default VoiceCommand;