import asyncio
import edge_tts
import os

# Define the conversation
dialogue = [
    {"voice": "en-US-ChristopherNeural", "text": "Thanks for calling Axiostudio Restaurant. How can I help you today?"},
    {"voice": "en-US-JennyNeural", "text": "Hi, I was wondering if you have any tables available for four people tonight around 7:30 PM?"},
    {"voice": "en-US-ChristopherNeural", "text": "Let me check the system for you. Yes, we do have a table for four available at 7:30 PM. May I have your name to secure the reservation?"},
    {"voice": "en-US-JennyNeural", "text": "Sure, it's Sarah. Oh, also, do you guys have any gluten-free options on the menu?"},
    {"voice": "en-US-ChristopherNeural", "text": "Absolutely, Sarah. Our menu is fully dynamic, and our chefs can prepare entirely gluten-free versions of our signature dishes, including our sea bass and risottos."},
    {"voice": "en-US-JennyNeural", "text": "Oh that sounds perfect. We'll see you at 7:30 then."},
    {"voice": "en-US-ChristopherNeural", "text": "Perfect. You are all set for four guests at 7:30 tonight. We'll send a confirmation text shortly. Have a great evening!"}
]

async def generate():
    files = []
    for i, line in enumerate(dialogue):
        filename = f"temp_{i}.mp3"
        print(f"Generating {filename}...")
        communicate = edge_tts.Communicate(line["text"], line["voice"], rate="+5%")
        await communicate.save(filename)
        files.append(filename)
    
    # Concatenate the MP3s
    print("Combining audio...")
    with open("public/demo-audio.mp3", "wb") as outfile:
        for fname in files:
            with open(fname, "rb") as infile:
                outfile.write(infile.read())
            os.remove(fname)
            
    print("Done! Saved to public/demo-audio.mp3")

if __name__ == "__main__":
    asyncio.run(generate())
