import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Eye, Lock, FileText, Activity, Terminal, ShieldAlert, Cpu, ChevronRight, Menu, X, Play, Pause, Headphones, Radio, Volume2, Music, Mic2 } from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";

// The full screenplay lives in scripts/shadows-of-the-mind-master.md, which is the
// single source of truth. We import it raw and parse it into acts at load time so
// the app and the master document can never drift out of sync.
import masterScript from "./scripts/shadows-of-the-mind-master.md?raw";

interface Act {
  id: number;
  title: string;
  content: string;
}

// Split the master Markdown into acts. Each act is a "## ACT ..." section that runs
// until the next section (or the end of the file). We strip the Markdown scaffolding
// (bold markers, the trailing horizontal rule) so the reader and the AI prompt get
// clean screenplay text, and drop the draft annotation in parentheses from titles.
function parseActs(markdown: string): Act[] {
  return markdown
    .split(/^## /m)
    .slice(1)
    .map((section, index) => {
      const breakIdx = section.indexOf("\n");
      const heading = section.slice(0, breakIdx).trim();
      const content = section
        .slice(breakIdx + 1)
        .replace(/\n---\s*$/, "")
        .replace(/\*\*/g, "")
        .trim();
      return {
        id: index + 1,
        title: heading.replace(/\s*\(.*?\)\s*$/, ""),
        content,
      };
    });
}

const ACTS: Act[] = parseActs(masterScript);

function App() {
  const [currentAct, setCurrentAct] = useState(0);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const activeContent = ACTS[currentAct].content;

  // Initialize Audio Refs
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => {
        setIsPlaying(false);
        if (bgmRef.current) {
            // Fade out BGM logic could go here, for now just pause
            bgmRef.current.pause();
            bgmRef.current.currentTime = 0;
        }
      };
    }

    // Background Music (Dark Ambient Loop)
    if (!bgmRef.current) {
        bgmRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/10/25/audio_10795c738e.mp3");
        bgmRef.current.loop = true;
        bgmRef.current.volume = 0.2; // Keep background music subtle
    }
  }, []);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysis("");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following screenplay act.
        Provide a "Psychological Profile" of the main character (Marty) and the antagonist (Darla).
        Identify 3 key "Manipulation Tactics" used.
        Assess the "Reality Index" (how grounded is the scene vs paranoia).
        Output in a structured, technical surveillance report style.

        SCRIPT:
        ${activeContent}`,
        config: {
           systemInstruction: "You are ELYSIUM AI, a corporate surveillance system. Output strictly in technical, cold, observational logs.",
        }
      });

      setAnalysis(response.text);
    } catch (error) {
      console.error(error);
      setAnalysis("ERROR: CONNECTION TO ELYSIUM SERVERS FAILED.\nRETRYING ENCRYPTED HANDSHAKE...");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateAudiobook = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      bgmRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (audioSrc && !isGeneratingAudio) {
        audioRef.current?.play();
        bgmRef.current?.play();
        setIsPlaying(true);
        return;
    }

    setIsGeneratingAudio(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Detailed Prompt for Multi-Speaker Casting
      const prompt = `
      You are an expert audio drama producer.
      Convert the following Screenplay Act into a multi-character audio drama script and read it aloud.

      CASTING INSTRUCTIONS:
      - Use Speaker 'Narrator' for all Scene Headings (e.g., INT. PAWN SHOP) and Action Lines.
      - Use Speaker 'Marty' for the character MARTY.
      - Use Speaker 'Darla' for the character DARLA.
      - Use Speaker 'Extra' for any other characters (STEVE, NURSE, DOCTOR, PATIENT, ANCHOR).

      Perform the dialogue with emotion suitable for a psychological thriller.

      SCRIPT:
      ${activeContent}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: prompt,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            multiSpeakerVoiceConfig: {
                speakerVoiceConfigs: [
                    // Narrator: Deep, authoritative, "Elysium System" voice
                    {
                        speaker: 'Narrator',
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } }
                    },
                    // Marty: Young adult, slightly anxious/weary
                    {
                        speaker: 'Marty',
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
                    },
                    // Darla: Professional, calm, slightly detached/manipulative
                    {
                        speaker: 'Darla',
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                    },
                    // Extras: Rougher or distinct
                    {
                        speaker: 'Extra',
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } }
                    }
                ]
            }
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioUrl = `data:audio/mp3;base64,${base64Audio}`;
        setAudioSrc(audioUrl);
        if (audioRef.current) {
            audioRef.current.src = audioUrl;
            // Start BGM and Voice simultaneously
            audioRef.current.play();
            bgmRef.current?.play();
            setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Audio generation failed", error);
      alert("Audio stream interrupted by static. Please try again.");
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Reset audio when changing acts
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
    }
    if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
    }
    setAudioSrc(null);
    setIsPlaying(false);
    setAnalysis("");
  }, [currentAct]);


  return (
    <div className="min-h-screen bg-elysium-900 text-gray-300 font-mono flex flex-col overflow-hidden relative selection:bg-elysium-accent selection:text-elysium-900">

      {/* SCANLINES OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="scanline"></div>

      {/* HEADER */}
      <header className="h-16 border-b border-elysium-700 bg-elysium-800 flex items-center justify-between px-6 z-20 shadow-lg shadow-black/50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-elysium-accent rounded-full animate-pulse-slow shadow-[0_0_10px_#10b981]"></div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-widest text-elysium-accent leading-none">
              ELYSIUM<span className="text-gray-500">_ARCHIVES</span>
            </h1>
            <span className="text-[10px] text-gray-500 font-mono tracking-wider mt-1">AUTH: MARTIN GARZA JR</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-elysium-dim uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Level 5 Clearance</span>
            </div>
            <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>System Stable</span>
            </div>
            <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>AI Core: ONLINE</span>
            </div>
        </div>

        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-elysium-700 rounded text-elysium-accent transition-colors">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden relative z-10">

        {/* SCRIPT READER (LEFT) */}
        <main className={`flex-1 overflow-y-auto p-4 md:p-12 transition-all duration-500 ${sidebarOpen ? 'mr-0 md:mr-96' : ''} scroll-smooth`}>

          <div className="max-w-3xl mx-auto">
            {/* ACT NAVIGATION */}
            <div className="mb-12 flex flex-wrap gap-2 justify-center">
              {ACTS.map((act, idx) => (
                <button
                  key={act.id}
                  onClick={() => setCurrentAct(idx)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${
                    currentAct === idx
                      ? "border-elysium-accent text-elysium-accent bg-elysium-accent/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "border-elysium-700 text-elysium-dim hover:border-elysium-dim hover:text-gray-400"
                  }`}
                >
                  {act.title}
                </button>
              ))}
            </div>

            {/* SCRIPT CONTENT */}
            <div className="bg-elysium-800 border border-elysium-700 p-8 md:p-16 shadow-2xl relative min-h-[800px]">
               {/* Watermark */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-bold text-elysium-900 opacity-20 rotate-[-45deg] pointer-events-none select-none">
                 CONFIDENTIAL
               </div>

               <div className="mb-12 text-center border-b border-elysium-700/50 pb-8 relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-100 tracking-[0.2em] mb-3 uppercase">Shadows of the Mind</h2>
                  <div className="text-elysium-accent text-xs md:text-sm tracking-[0.3em] uppercase">Written by Martin Garza Jr</div>
               </div>

               <div className="font-mono whitespace-pre-wrap leading-relaxed text-sm md:text-base text-gray-400 font-medium relative z-10">
                 {activeContent}
               </div>
            </div>
          </div>
        </main>

        {/* SIDEBAR (RIGHT) - TOOLS & AUDIO */}
        <aside
            className={`fixed top-16 right-0 bottom-0 w-full md:w-96 bg-elysium-800 border-l border-elysium-700 transform transition-transform duration-300 ease-in-out z-30 flex flex-col ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            {/* TABS / HEADER */}
            <div className="p-4 border-b border-elysium-700 flex items-center gap-2 bg-elysium-900/50">
                <Terminal className="w-4 h-4 text-elysium-accent" />
                <span className="text-xs font-bold tracking-widest text-elysium-accent">NEURAL INTERFACE</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">

                {/* AUDIOBOOK PLAYER MODULE */}
                <div className="bg-elysium-900 border border-elysium-700 p-4 rounded-sm relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                         <Headphones className="w-12 h-12 text-elysium-accent" />
                     </div>
                     <h3 className="text-elysium-accent text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Radio className="w-4 h-4" />
                        Audio Log Playback
                     </h3>

                     <div className="space-y-4">
                        <div className="text-xs text-gray-500">
                            Subject: {ACTS[currentAct].title}<br/>
                            Status: {isGeneratingAudio ? "DECRYPTING AUDIO STREAM..." : isPlaying ? "PLAYING" : "READY"}
                        </div>

                        {/* Visualizer Mockup */}
                        <div className="h-12 flex items-center gap-1 justify-center bg-elysium-900/50 border border-elysium-700/50 p-2 relative">
                           {/* Soundscape Indicator */}
                           <div className="absolute top-1 left-2 text-[8px] text-elysium-accent flex items-center gap-1 opacity-70">
                                <Music size={8} /> AMBIENT LAYER: ON
                           </div>

                           {isGeneratingAudio ? (
                               <div className="flex gap-1 animate-pulse items-end h-full pb-1">
                                   <div className="w-1 h-3 bg-elysium-accent/50"></div>
                                   <div className="w-1 h-5 bg-elysium-accent/50"></div>
                                   <div className="w-1 h-2 bg-elysium-accent/50"></div>
                               </div>
                           ) : isPlaying ? (
                               Array.from({length: 20}).map((_, i) => (
                                   <div key={i} className="w-1 bg-elysium-accent/80" style={{
                                       height: `${Math.random() * 100}%`,
                                       animation: `pulse 0.${5 + i%5}s infinite`
                                   }}></div>
                               ))
                           ) : (
                               <div className="w-full h-[1px] bg-elysium-dim"></div>
                           )}
                        </div>

                        <button
                            onClick={generateAudiobook}
                            disabled={isGeneratingAudio}
                            className={`w-full py-4 flex items-center justify-center gap-3 uppercase tracking-widest text-sm font-bold transition-all
                            ${isGeneratingAudio
                                ? "bg-elysium-700 text-gray-500 cursor-wait"
                                : isPlaying
                                    ? "bg-elysium-alert text-black hover:bg-red-400"
                                    : "bg-elysium-accent text-black hover:bg-emerald-400"
                            }`}
                        >
                            {isGeneratingAudio ? (
                                "Compiling Voices..."
                            ) : isPlaying ? (
                                <>
                                    <Pause className="w-4 h-4" /> Pause Playback
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" /> Play Dramatization
                                </>
                            )}
                        </button>

                        {/* Volume/Metadata (Decorative) */}
                        <div className="flex justify-between items-center text-[10px] text-elysium-dim font-mono">
                            <div className="flex items-center gap-1"><Volume2 className="w-3 h-3"/> MIXED: 100%</div>
                            <div className="flex items-center gap-1"><Mic2 className="w-3 h-3"/> VOICES: 4</div>
                            <div className="flex items-center gap-1"><Music className="w-3 h-3"/> SFX: AUTO</div>
                        </div>
                     </div>
                </div>

                {/* PSYCH ANALYZER MODULE */}
                <div className="bg-elysium-900 border border-elysium-700 p-4 rounded-sm">
                    <h3 className="text-elysium-accent text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Subject Analysis
                    </h3>

                    {!analysis ? (
                        <div className="text-center py-8">
                            <div className="text-xs text-elysium-dim mb-4">Awaiting target selection...</div>
                            <button
                                onClick={runAnalysis}
                                disabled={isAnalyzing}
                                className="border border-elysium-dim text-elysium-dim px-6 py-2 text-xs uppercase hover:border-elysium-accent hover:text-elysium-accent transition-colors disabled:opacity-50"
                            >
                                {isAnalyzing ? "Processing..." : "Run Psych Profile"}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in duration-500">
                            <div className="text-[10px] font-mono whitespace-pre-wrap text-emerald-400/80 leading-relaxed border-l-2 border-elysium-dim pl-3">
                                {analysis}
                            </div>
                            <button
                                onClick={() => setAnalysis("")}
                                className="w-full text-[10px] text-elysium-dim hover:text-white uppercase tracking-widest mt-4"
                            >
                                Clear Buffer
                            </button>
                        </div>
                    )}
                </div>

                {/* SYSTEM LOGS (DECORATIVE) */}
                <div className="mt-auto border-t border-elysium-700 pt-6">
                    <h4 className="text-[10px] uppercase text-elysium-dim mb-2">System Logs</h4>
                    <div className="font-mono text-[10px] text-gray-600 space-y-1">
                        <div>&gt; UPLINK ESTABLISHED...</div>
                        <div>&gt; ENCRYPTION KEY: VALID</div>
                        <div>&gt; MONITORING SUBJECT: MARTY</div>
                        <div>&gt; {new Date().toLocaleTimeString()} :: PACKET RECEIVED</div>
                    </div>
                </div>

            </div>
        </aside>

      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
