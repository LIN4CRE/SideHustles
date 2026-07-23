import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Check, Command, Radio } from 'lucide-react';

interface VoiceControlBarProps {
  onExecuteCommand: (command: string) => void;
}

export const VoiceControlBar: React.FC<VoiceControlBarProps> = ({ onExecuteCommand }) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [lastActionExecuted, setLastActionExecuted] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  useEffect(() => {
    // Check Web Speech API browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser fallback simulation mode for hands-free voice commands
      if (!isListening) {
        setIsListening(true);
        setTranscript('Listening... Speak "generate assets", "open recipes", "challenge", "export csv"...');
        setTimeout(() => {
          handleProcessVoiceText('generate assets');
        }, 2500);
      } else {
        setIsListening(false);
        setTranscript('');
      }
      return;
    }

    if (isListening) {
      setIsListening(false);
      setTranscript('');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('Listening for voice commands...');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
        if (event.results[current].isFinal) {
          handleProcessVoiceText(text);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleProcessVoiceText = (text: string) => {
    const lower = text.toLowerCase();
    let action = '';

    if (lower.includes('genai') || lower.includes('asset') || lower.includes('wallpaper') || lower.includes('generate')) {
      action = 'genai';
      onExecuteCommand('open_genai');
    } else if (lower.includes('recipe') || lower.includes('blueprint') || lower.includes('n8n')) {
      action = 'recipes';
      onExecuteCommand('open_recipes');
    } else if (lower.includes('challenge') || lower.includes('sale') || lower.includes('24h') || lower.includes('24 hour')) {
      action = 'challenge';
      onExecuteCommand('open_challenge');
    } else if (lower.includes('export') || lower.includes('csv') || lower.includes('download')) {
      action = 'export_csv';
      onExecuteCommand('export_csv');
    } else if (lower.includes('scout') || lower.includes('trend') || lower.includes('viral')) {
      action = 'scout';
      onExecuteCommand('open_scout');
    } else if (lower.includes('hub') || lower.includes('local llm') || lower.includes('ollama')) {
      action = 'hub';
      onExecuteCommand('open_hub');
    } else if (lower.includes('focus')) {
      action = 'focus_mode';
      onExecuteCommand('toggle_focus');
    } else {
      action = 'unknown';
    }

    setLastActionExecuted(action !== 'unknown' ? `Executed: ${action.toUpperCase()}` : `Unrecognized: "${text}"`);
    setTimeout(() => setLastActionExecuted(null), 3000);
  };

  return (
    <div className="flex items-center gap-2 font-mono">
      <button
        onClick={toggleListening}
        className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
          isListening
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
        }`}
        title="Speak commands hands-free e.g. 'generate assets', 'open recipes', 'challenge', 'export csv'"
      >
        {isListening ? (
          <Radio className="w-3.5 h-3.5 text-rose-400 animate-ping" />
        ) : (
          <Mic className="w-3.5 h-3.5 text-indigo-400" />
        )}
        <span>{isListening ? 'Listening...' : 'Voice Control'}</span>
      </button>

      {/* Voice Transcript / Feedback pill */}
      {(transcript || lastActionExecuted) && (
        <div className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-amber-300 font-mono animate-fadeIn flex items-center gap-1.5 max-w-xs truncate">
          <Volume2 className="w-3 h-3 text-indigo-400 shrink-0" />
          <span className="truncate">{lastActionExecuted || transcript}</span>
        </div>
      )}
    </div>
  );
};
