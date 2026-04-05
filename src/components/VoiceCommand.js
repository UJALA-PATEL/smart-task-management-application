import React, { useEffect, useRef } from "react";

function VoiceCommand({ addTask }) {
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Browser does not support Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      console.log("🎙 Voice recognition started");
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      console.log("🛑 Voice recognition stopped");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Voice Input:", transcript);

      if (transcript.startsWith("add task")) {
        try {
          const task = parseVoiceTask(transcript);
          if (task.title) {
            addTask(task);
            alert(`Task added via voice: ${task.title}`);
          }
        } catch (err) {
          console.error("Error parsing voice task:", err);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, [addTask]);

  const startRecognition = () => {
    if (!recognitionRef.current) return;
    if (isRecognizingRef.current) {
      recognitionRef.current.stop(); // stop current before starting again
      return;
    }
    recognitionRef.current.start();
  };

  const parseVoiceTask = (text) => {
    const task = { title: "", description: "", priority: "Low", dueDate: "" };

    const titleMatch = text.match(/title (.*?) (description|priority|due|$)/);
    if (titleMatch) task.title = titleMatch[1].trim();

    const descMatch = text.match(/description (.*?) (priority|due|$)/);
    if (descMatch) task.description = descMatch[1].trim();

    const prioMatch = text.match(/priority (low|medium|high)/);
    if (prioMatch) task.priority = prioMatch[1].charAt(0).toUpperCase() + prioMatch[1].slice(1);

    const dueMatch = text.match(/due (\d{4}-\d{2}-\d{2})/);
    if (dueMatch) task.dueDate = dueMatch[1];

    return task;
  };

  return (
    <div className="mb-3">
      <button onClick={startRecognition} className="btn btn-warning w-100">
        🎤 Add Task via Voice
      </button>
      <small className="text-muted d-block mt-1">
        Example: "add task title Buy Milk description 2 liters priority high due 2026-03-20"
      </small>
    </div>
  );
}

export default VoiceCommand;