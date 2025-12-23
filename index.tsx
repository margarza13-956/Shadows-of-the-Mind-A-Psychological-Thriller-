import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Eye, Lock, FileText, Activity, Terminal, ShieldAlert, Cpu, ChevronRight, Menu, X, Play, Pause, Headphones, Radio, Volume2, Music, Mic2 } from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";

// --- FULL SCREENPLAY CONTENT CONSTANTS ---

const ACT_ONE = `ACT ONE – THE CONNECTION (FINAL)
INT. PAWN SHOP – DAY
A fluorescent light flickers, fighting to stay alive. The room hums with low electrical anxiety.
Cheap gold chains under scratched glass. Power tools with oil stains baked into their history. A cracked 4:3 TV spits relentless STATIC, loud enough to feel intentional.
Behind the counter stands MARTY (20s). Sharp posture. Exhausted eyes. The look of someone who’s alert because rest has proven unreliable.
He digs through a bin of junk electronics. Tangled chargers. Dead Nokias. A digital camera with a shattered screen.
He exhales. Rubs his temples. A man sorting through other people’s endings.
The BELL over the door rings. Clean. Precise.
DARLA (20s) steps inside.
She doesn’t glow. She doesn’t announce herself. She simply doesn’t belong.
Her clothes are simple, intentional. Her movements economical, like she’s already edited herself down to the essentials.
She pauses. Lets the room exist.
Her eyes drift. Not searching. Not nervous.
A blinking SECURITY CAMERA. A stack of boxes half-blocking the back exit. SAL, the owner, asleep in the office chair, mouth open.
Then Marty.
She crosses to a shelf of broken film cameras. Picks up an OLYMPUS TRIP 35. Turns it over, testing the weight. Her thumb brushes the shutter.
It sticks.
She frowns. Just for a second.
Marty notices her noticing.
He looks up. Their eyes meet.
She doesn’t rush to look away. She also doesn’t smile yet.
DARLA
Does this one work?
MARTY
Depends what you mean by work.
She finally smiles. Small. Real.
DARLA
Fair answer.
She brings the camera to the counter.
DARLA (CONT’D)
I like old things. They don’t pretend they’re new.
MARTY
They also don’t pretend they’re valuable.
DARLA
You think value is pretending?
He shrugs. Noncommittal. Defensive by habit.
MARTY
Most of the time.
She studies him now. Not intensely. Casually. Like she’s waiting for him to lie.
DARLA
How much?
MARTY
Fifty. As-is.
DARLA
As-is.
She rolls the words around, amused.
DARLA (CONT’D)
That’s brave. Most people want warranties on everything.
MARTY
Life doesn’t come with one.
The line surprises him as much as her.
She considers him for a beat longer than necessary.
DARLA
I’ll take it.
She slides a fifty across the glass. Their fingers brush. It’s nothing. It feels like something.
Marty rings it up. His hands hesitate once, then steady.
MARTY
Bag?
DARLA
No. I like knowing what I’m carrying.
She takes the camera, turns toward the door.
DARLA (CONT’D)
I’m Darla.
MARTY
Marty.
She nods, like she’s confirming a thought.
DARLA
Take care of the static, Marty.
The bell rings again. She’s gone.
The TV’s STATIC seems louder now.
Marty stares at the door longer than he means to.
EXT. PAWN SHOP – BACK ALLEY – LATER
A narrow alley. Dumpster. Wet cardboard. A NO LOITERING sign losing the argument.
Marty leans against the wall on break, cigarette lit but forgotten.
DARLA stands nearby, sipping a gas-station iced tea.
She didn’t sneak up. She didn’t announce herself.
DARLA
Those don’t help with the tired eyes.
MARTY
Neither does this place.
She nods. Accepts it.
DARLA
True.
A beat.
DARLA (CONT’D)
Camera’s shutter sticks. Thought about bringing it back.
MARTY
I can knock five bucks off.
DARLA
I don’t want it fixed.
He looks at her.
DARLA (CONT’D)
I like things that hesitate.
She watches his reaction. He gives her nothing.
DARLA (CONT’D)
What do you do when you’re not here?
MARTY
Recharge. Fail. Repeat.
She smiles, but there’s something careful in it.
DARLA
You don’t sound like someone who plans to stay small.
That lands. He stiffens.
MARTY
I don’t plan much.
DARLA
Neither do I.
She checks her watch.
DARLA (CONT’D)
I should go. But… if you ever want coffee somewhere quieter than this, I’d listen.
She starts to leave, then stops.
DARLA (CONT’D)
And Marty?
MARTY
Yeah?
DARLA
Don’t let places like this convince you they’re the whole world.
She leaves.
Marty exhales smoke he didn’t realize he was holding.
INT. MARTY’S CAR – NIGHT
Rain on metal. Close. Private.
Low indie-rock hums from the speakers.
Darla sits sideways in the passenger seat. Comfortable, not possessive.
MARTY
My dad hated the sky. Said wanting more was a waste of time.
He laughs, thin.
MARTY (CONT’D)
Guess that stuck.
Darla listens. Doesn’t interrupt.
DARLA
People fear what they can’t control.
MARTY
You sound like you’ve thought about that.
DARLA
I’ve had to.
She reaches for his hand. Pauses.
DARLA (CONT’D)
Is this okay?
He nods.
She takes it.
DARLA (CONT’D)
You don’t sound broken to me. Just… unused.
That’s the one. That’s the hook.
INT. MARTY’S APARTMENT – NIGHT
Quiet. Sparse.
A KNOCK.
Darla stands there with a small, wrapped object.
DARLA
I didn’t want to show up empty-handed.
He unwraps it.
Not a telescope.
A STAR CHART. Folded. Worn.
MARTY
This is—
DARLA
Not a promise. Just a reminder.
She steps inside.
DARLA (CONT’D)
Some things are worth looking up for.
Marty swallows.
INT. FRIEND’S HOUSE – NIGHT
Noise. Laughter. Steve’s voice too loud.
Steve mocks Marty. Half-joking. Half-not.
Marty laughs along. Then stops.
Darla watches. Says nothing.
Later, quietly:
DARLA
Does that ever get heavy?
MARTY
What?
DARLA
Being the punchline.
He doesn’t answer.
EXT. HOUSE – NIGHT
They stand under the open sky.
DARLA
I don’t believe people meet by accident.
MARTY
You believe in fate?
DARLA
I believe in recognition.
She kisses him.
It’s careful. Measured. Like she’s letting him think it’s his move.
Marty closes his eyes.
The static fades.
END OF ACT ONE`;

const ACT_TWO = `ACT TWO – THE SAFE HARBOR (REVISED)
INT. MARTY’S APARTMENT – LIVING ROOM – NIGHT (PAGES 30–35)
Three weeks later.
The apartment is noticeably different. Cleaner. Softer. Neutral colors. A lavender candle burns low, almost spent.
Marty sits cross-legged on the floor, organizing vinyl records. He looks healthier on the surface. Clean shave. Pressed shirt.
But his eyes twitch at small sounds. A low-grade vigilance.
From the kitchen, the steady CHOP-CHOP of a knife.
A KNOCK at the door.
Marty flinches. His hand goes instinctively to his chest.
DARLA (O.S.)
I’ve got it.
She opens the door.
STEVE, JOEY, and MIKE stand there, loud and already halfway inside their own jokes. Beer. Grease-stained bag of fast food.
STEVE
There he is. The man, the myth.
Steve brushes past Darla without noticing her, drops onto the couch. His shoes come dangerously close to the records.
STEVE (CONT’D)
Why does it smell like a yoga studio in here?
JOEY
My aunt’s house smells like this.
Marty forces a smile.
MARTY
Hey. What’s up.
Darla appears with glasses. Real ones. Water, not beer.
DARLA
Hi. I wasn’t sure what everyone wanted, so—
STEVE
(cracking a can)
Beer. Always beer.
The sound is harsh in the quiet room.
STEVE (CONT’D)
Controller, Marty. We’re already queued.
Marty hesitates. Looks at Darla.
She doesn’t intervene. Just watches.
Marty picks up the controller.
TIME CUT – LATER (PAGES 35–41)
The room is loud now. Gunfire. Shouting.
STEVE
Cover me! What are you doing?
Marty reacts a beat too slow.
STEVE (CONT’D)
Jesus, man. You asleep?
Steve shoves his shoulder, playful enough to pass. Sharp enough to land.
Marty stiffens. He sets the controller down.
MARTY
I’m done.
STEVE
What? We just started.
MARTY
I said I’m done.
Steve scoffs, standing.
STEVE
Guess priorities changed.
His eyes flick to Darla.
STEVE (CONT’D)
Later.
They leave the mess behind. Door shuts.
Silence floods back in.
Marty stands there, breathing too fast.
MARTY
I shouldnt have snapped.
Darla steps closer. Doesn’t touch him yet.
DARLA
How do you feel right now?
MARTY
Like… bad. Like I messed something up.
DARLA
You didn’t mess anything up.
She gently picks up one of the abandoned cans, sets it in the trash.
DARLA (CONT’D)
They didn’t notice you were uncomfortable. That matters.
Marty swallows.
MARTY
They’re just like that.
DARLA
Maybe.
(soft)
But you don’t have to be.
She opens her arms. He steps into them.
INT. KITCHEN – NIGHT – ONE WEEK LATER (PAGES 48–52)
Marty tears through drawers. Papers everywhere.
DARLA enters, groceries in hand.
DARLA
Hey. What’s going on?
MARTY
The rent check. It’s gone.
DARLA
(confused)
Gone?
MARTY
I remember putting it here.
She sets the bags down slowly.
DARLA
Marty… you mailed it.
He freezes.
MARTY
No. I didn’t.
DARLA
Tuesday. We walked together. It was raining.
He searches his memory. Finds nothing.
MARTY
I don’t remember that.
Darla’s brow furrows. Genuine concern.
DARLA
That’s… okay. You’ve been exhausted.
MARTY
What if it’s not exhaustion?
His voice cracks.
DARLA
Then we deal with it together.
She takes his hands.
DARLA (CONT’D)
Let me handle the details for a bit. Just until things settle.
Marty hesitates. Then nods.
INT. MARTY’S APARTMENT – NIGHT (PAGES 52–55)
Rain taps the windows.
The telescope stands by the blinds.
Marty peers outside.
MARTY
That van’s been there a while.
Darla stiffens. Not panic. Recognition.
DARLA
Which one?
He points.
DARLA (CONT’D)
It’s probably nothing.
She watches longer than necessary.
DARLA (CONT’D)
But… let’s lock up, okay?
Marty locks the door. Adds the chain.
DARLA
Just in case.
She leans into him. He relaxes.
INT. BEDROOM – NIGHT (LATER) (PAGES 55–60)
Dark. Quiet.
Marty stares at the ceiling. Darla sleeps beside him.
A faint SCRATCH.
Marty sits up.
Another scratch.
A whisper. Almost mechanical.
VOICE (O.S.)
We see you.
MARTY
Did you hear that?
Darla wakes, groggy.
DARLA
Hear what?
The sound stops.
MARTY
It was right there.
DARLA
Come here.
She pulls him close.
DARLA (CONT’D)
Your mind is replaying fear. That’s all.
Another faint WHINE.
Marty flinches.
DARLA
Shh.
She cups his ears gently. The sound fades.
MARTY
It stopped.
DARLA
Because you’re safe.
She holds him until his breathing slows.
Over his shoulder, her face remains calm. Focused. Controlled.
END OF ACT TWO`;

const ACT_THREE = `ACT THREE – THE SIEGE
INT. MARTY’S APARTMENT – DAY (Pages 60-64)
The windows are covered with blankets, plunging the room into suffocating twilight. The air reeks of old coffee and unwashed bodies.
Marty sits at his desk, pale and clammy, eyes wide and darting across three monitors. His leg bounces. Teeth grind.
ON SCREEN: a forum, black with green text: “TARGETED INDIVIDUALS GLOBAL SUPPORT.” Threads scroll by:
“Are your neighbors coughing when you leave the house?”
“Frequency Weapons: The Hum.”
“Street Theater: How they stage your reality.”
Marty mutters.
MARTY
Street theater… noise campaigns… it’s all a playbook.
He clicks a link: “CORPORATE PARTNERS OF THE SURVEILLANCE STATE.” Logos scroll. One catches his eye: ELYSIUM SECURITY SOLUTIONS.
MARTY (CONT’D)
Elysium…
Darla enters, wrapped in a blanket, looking fragile.
DARLA
Marty?
He spins the chair toward her, pointing at the logo.
MARTY
This company… it’s the tech. They’re doing it.
Darla freezes, a hand to her mouth.
DARLA
(whispering)
The silver shield… that’s his division. He… he doesn’t just work there. He ran ops. Psychological ops.
Marty’s face drains of color.
MARTY
We’re not fighting a guy. We’re fighting a corporation.
Darla slumps against him, trembling.
DARLA
He’s everywhere. Unlimited resources.
Marty grips her. Rage mixes with fear.
MARTY
Then we don’t break. We fight. Stay awake.
EXT. CITY STREET – DAY (Pages 64-70)
Marty walks fast, hoodie up, sunglasses on. Darla grips his elbow tight.
Red is everywhere—a car, a scarf, a billboard. Marty stops, hyperventilating.
MARTY
Red. Red. Red.
DARLA
It’s a color code…
A man checks his watch. Marty lunges at him.
MARTY
I see you!
The man jumps back, dropping his briefcase. Bystanders record. Darla steps between them, calm but firm.
DARLA
Focus on me. Only me. Don’t give them the show.
Marty blinks, sweat dripping. He trusts her.
DARLA (CONT’D)
Safe harbor. Let’s go.
EXT. GROCERY STORE PARKING LOT – LATER (Pages 70-74)
A couple argues loudly nearby.
WOMAN
You think I don’t see you following me?!
DRIVER
I don’t know who you are!
Marty freezes.
MARTY
Did you hear that?
DARLA
Street theater. Ignore it.
The couple drives off. Marty stares, reality fracturing.
MARTY (whispering)
Nothing is real.
DARLA
I am. I’m real.
INT. MARTY’S APARTMENT – NIGHT (Pages 74-78)
The apartment is chaos. Pizza boxes stacked, conspiracy board on the wall. Marty curls on the floor.
Car alarm. Dog barks. Car door slams. Repeat.
MARTY
Make it stop…
Darla sits beside him, stroking his hair.
DARLA
They want to exhaust you. If you heal, you fight.
She pulls a remote from her pocket, kisses his forehead.
CLICK. Silence.
MARTY
How…?
DARLA
(softly)
I’m your shield.
Marty exhales, finally still.
INT. APARTMENT – DAY (Pages 78-82)
Marty, baseball bat in hand, paces. Loud knocks.
MARTY
Get away from the door!
DARLA
Go! Lock it!
Marty swings. Hole in the wall. Dust falls. Footsteps flee.
Darla approaches, wrapping her arms around him.
DARLA
You’re brave.
MARTY
I… scared them.
Her kiss is reward and anchor.
INT. APARTMENT – NIGHT (THE BREAKING POINT) (Pages 82-90)
Marty sits amidst wreckage, exhausted.
MARTY
It never ends…
Darla sits beside him, calm.
DARLA
No. But there is a way out. A place where the static can’t reach us.
She pulls a coil of rope from the closet, heavy and industrial.
MARTY
What are you doing?
DARLA
We’re leaving. Together.
She hands him the rope. Marty takes it, trembling, eyes on the ceiling beam.
DARLA
Be brave. For me.
He ties the knot. She stands beside him, holding his arm.
He steps onto the chair. The rope around his neck.
DARLA (softly)
I’ll be right behind you.
Marty closes his eyes. Kicks the chair.
SMASH CUT TO BLACK.
END OF ACT THREE`;

const ACT_FOUR = `ACT FOUR – THE VERDICT
INT. INTERROGATION ROOM – NIGHT (Pages 85–90)
The room is smaller than before. Or it feels smaller.
Bare concrete. One table. Two chairs. A CAMERA mounted in the corner. Red light on.
MARTY sits alone. Hair longer. Eyes hollow but alert. Wrists uncuffed for the first time.
The door opens.
DARLA enters. No folder. No badge. Just her.
She closes the door softly. The click echoes.
DARLA
You look better.
MARTY
You stopped calling.
DARLA
I was instructed to.
She sits across from him. Not too close. Not too far.
MARTY
By who?
DARLA
(smiles gently)
You already know the answer to that.
Silence.
Marty leans back, studies her.
MARTY
They showed me the footage.
DARLA
Which footage?
MARTY
The edits. The missing hours. The moments where I look like I’m… inventing things.
DARLA
And?
MARTY
And it’s convincing.
She nods. Almost proud.
DARLA
Truth has never survived good editing.
MARTY
You drugged me.
DARLA
We monitored you.
MARTY
You isolated me.
DARLA
You were already isolated.
MARTY
You made me doubt my own memories.
DARLA
That part worked especially well.
He exhales sharply. A laugh escapes him. Bitter.
MARTY
So what now? You erase me?
DARLA
No. That would make you important.
She leans forward slightly.
DARLA (CONT’D)
We let you live.
That lands harder.
INT. OBSERVATION ROOM – SAME TIME (Pages 90–94)
Behind one-way glass, three FIGURES watch.
A LAWYER.
A PSYCHOLOGIST.
A MAN IN A SUIT who never speaks.
On a monitor: Marty and Darla.
PSYCHOLOGIST
Subject exhibits cognitive coherence despite prolonged destabilization.
LAWYER
Which is inconvenient.
SUIT
Is he dangerous?
PSYCHOLOGIST
Only if believed.
SUIT
Then make sure he isn’t.
They watch as Darla reaches across the table. Not touching him. Almost.
INT. INTERROGATION ROOM – CONTINUOUS (Pages 94–98)
DARLA
You have a choice.
MARTY
That’s funny. You never offered me those before.
DARLA
Public trial. Media attention. Years of appeals. Every detail of your life dissected until even you’re not sure what happened.
MARTY
And the other option?
DARLA
You cooperate. You acknowledge emotional distress. Memory fragmentation. You accept treatment.
MARTY
And you walk away.
DARLA
I already have.
He stares at her.
MARTY
Was any of it real?
She hesitates. Just a fraction too long.
DARLA
Does it matter?
MARTY
It does to me.
She softens. Or performs softness.
DARLA
I cared about you… as much as the role allowed.
MARTY
So none.
DARLA
Enough.
She stands.
DARLA (CONT’D)
This is the last time we speak without glass between us.
She heads for the door.
MARTY
Darla.
She stops. Doesn’t turn.
MARTY (CONT’D)
You ever lose sleep?
A beat.
DARLA
I’m very good at compartmentalizing.
She exits.
The door locks.
Marty is alone again.
INT. COURTROOM – DAY (Pages 98–104)
Cold. Efficient. Almost empty.
Marty sits beside a PUBLIC DEFENDER who won’t meet his eyes.
Across the room, ELYSIUM’S LEGAL TEAM. Calm. Smiling.
The JUDGE reads.
JUDGE
The court finds the defendant not criminally liable due to documented psychological instability.
Marty looks up. Confused.
JUDGE (CONT’D)
The defendant is remanded to state psychiatric care for an indefinite period.
A murmur. Then silence.
The gavel hits.
BANG.
Marty’s face falls—not relief. Understanding.
They didn’t lose.
They buried him.
INT. HOLDING CORRIDOR – DAY (Pages 104–108)
Marty is escorted down a hallway. White walls. No windows.
He passes DARLA behind glass. Already on a phone call. Already somewhere else.
She doesn’t look at him.
He stops walking.
MARTY
(shouting)
You’re going to do it again!
Guards tighten their grip.
MARTY (CONT’D)
Another one! Another me!
Darla finally glances up. Their eyes meet.
Her look says everything.
Yes.
And better next time.
Marty is dragged away.
INT. TRANSPORT VAN – DAY (Pages 108–110)
Marty sits alone in the back. Hands cuffed. Window barred.
The city moves past him. Normal life. People laughing. Living.
He catches his reflection in the glass.
For a moment, he doesn’t trust it.
Then—
He smiles. Small. Controlled.
They can take his voice.
They can rewrite his story.
But they failed at one thing.
They didn’t break him.
The van drives on
END OF ACT FOUR`;

const ACT_FIVE = `ACT FIVE – THE AFTERMATH
FADE IN:
INT. STATE PSYCHIATRIC HOSPITAL – HALLWAY – DAY (SIX MONTHS LATER)
The hallway is spotless in a way that feels aggressive.
White walls. White floors. White doors with narrow wired-glass windows.
A fluorescent light flickers. Not broken. Just enough to be annoying.
A NURSE pushes a medication cart. The wheels squeak in a repeating rhythm. Too steady. Almost calming.
Behind the glass of the doors:
A MAN laughing alone at nothing.
A WOMAN whispering apologies to the floor.
A TEEN staring at his hands like they belong to someone else.
A TV mounted high on the wall plays the news. The volume is barely audible.
ANCHOR (ON TV)
…sources say the alleged “Elysium Files” have been officially discredited. Independent analysts confirm signs of advanced AI manipulation…
The Nurse doesn’t stop. She’s heard this before.
INT. COMMON ROOM – DAY
A dull space. Plastic furniture bolted to the floor.
MARTY sits alone at a table.
Healthier now. Weight back. Color in his face. Eyes calm in a way that makes people uneasy.
In front of him: a jigsaw puzzle. A peaceful mountain landscape.
A PATIENT approaches. Mid-30s. Nervous energy.
PATIENT
You’re him.
Marty doesn’t look up.
MARTY
People say a lot of things.
PATIENT
I saw the videos. Before they disappeared.
Marty places a piece carefully.
PATIENT (CONT’D)
They weren’t fake.
MARTY
Nothing ever is. It just gets relabeled.
The Patient leans closer.
PATIENT
I believe you.
Marty finally looks up. Holds his gaze.
MARTY
That’s dangerous.
The Patient blinks. Steps back. Walks away.
Marty returns to the puzzle.
INT. COMMON ROOM – LATER
DR. CHEN stands nearby, clipboard hugged to her chest.
DR. CHEN
Martin. You have a visitor.
Marty stiffens.
MARTY
No.
DR. CHEN
She’s been consistent. That matters.
MARTY
So did the truth.
A beat.
DR. CHEN
I’ll tell her not today.
She hesitates.
DR. CHEN (CONT’D)
But she’s patient.
Marty doesn’t answer.
INT. HOSPITAL LOBBY – DAY
DARLA sits alone.
Normal clothes. Soft posture. The mask is perfect.
A small gift bag rests at her feet.
Dr. Chen approaches.
DR. CHEN
He’s not ready.
DARLA
I understand.
She stands, composed.
DARLA (CONT’D)
Could you give him this? When it feels appropriate.
Dr. Chen nods.
DARLA
Thank you. For protecting him.
She walks toward the exit.
At the door, she pauses.
Looks back down the corridor.
For half a second, the mask drops.
There’s no sadness.
Only assessment.
She leaves.
EXT. HOSPITAL PARKING LOT – DAY
Darla gets into a modest rental car.
She exhales. Relaxes her face. Switches modes.
She makes a call.
DARLA
Still stable. No recanting. No outreach attempts.
(pause)
Yes. He’s accepted the narrative.
Another pause.
DARLA (CONT’D)
Moving on schedule.
She hangs up.
Opens an encrypted app.
ON SCREEN:
PROJECT: PHOENIX
STATUS: ACTIVE
SUBJECT: SHAWN
PHASE: ATTACHMENT
A live video feed shows SHAWN sitting alone in a dark room, speaking to a WOMAN off-screen.
Darla watches. Detached.
Satisfied.
She closes the app.
Drives away.
INT. WOMAN’S APARTMENT – NIGHT
Warm lighting. Soft music.
SHAWN paces, panicked.
SHAWN
I think they’re watching me.
The WOMAN pulls him into a hug.
WOMAN
I’m here. That’s what matters.
He clings to her.
SHAWN
I don’t know what’s real anymore.
WOMAN
Then don’t think. Just trust.
She holds him as the camera watches from somewhere unseen.
INT. HOSPITAL COMMON ROOM – NIGHT
Marty’s puzzle is finished.
A perfect image.
He stares at it.
Then reaches out.
Removes one piece from the center.
The picture breaks.
He slips the piece into his pocket.
Dr. Chen sets the gift bag on the table.
DR. CHEN
For when you’re ready.
She leaves.
Marty opens the bag. Pulls out the book.
Inside, handwritten:
“For when you’re ready to see the stars again.”
He closes it.
Places it beside the puzzle.
Doesn’t smile. Doesn’t react.
He stands. Walks to the window.
The reflection looks back.
MARTY
(quiet)
I remember.
ON THE TV (BACKGROUND)
ANCHOR (ON TV)
…a new social platform called “Mirror” promises authentic connection using advanced psychological compatibility…
Marty doesn’t turn.
FINAL IMAGE
A phone screen.
The MIRROR app installs.
A notification appears:
“SOMEONE UNDERSTANDS YOU.”
CUT TO BLACK.
No music.
Just the faint hum of servers.
THE END.`;

const ACTS = [
  { id: 1, title: "ACT ONE: The Connection", content: ACT_ONE },
  { id: 2, title: "ACT TWO: The Safe Harbor", content: ACT_TWO },
  { id: 3, title: "ACT THREE: The Siege", content: ACT_THREE },
  { id: 4, title: "ACT FOUR: The Verdict", content: ACT_FOUR },
  { id: 5, title: "ACT FIVE: The Aftermath", content: ACT_FIVE },
];

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
                        <div>> UPLINK ESTABLISHED...</div>
                        <div>> ENCRYPTION KEY: VALID</div>
                        <div>> MONITORING SUBJECT: MARTY</div>
                        <div>> {new Date().toLocaleTimeString()} :: PACKET RECEIVED</div>
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