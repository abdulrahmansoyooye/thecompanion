# 🧪 Unit Testing `getAssistantConfig`

## What does `getAssistantConfig` do?

At its core, `getAssistantConfig` is a **config builder** for an AI tutor session.

You pass in:
- a `companion` (the tutor setup)
- a `user` (the student)

…and it returns a structured object that controls:
- the assistant’s name
- the first message shown to the user
- voice + transcription settings
- AI model configuration (including system instructions)

**In simple terms:**  
> It prepares everything the AI needs before a session starts.

---

## 🛠️ How I approached testing

I focused on **unit testing the logic only**—not UI, not API calls.

### Tools used:
- **Jest** → test runner + assertions  
- **ts-jest** → TypeScript support  

### Strategy:
I treated the function like a **black box**:
- Provide inputs  
- Verify outputs  

No mocking was needed since the function is pure (which is ideal).

---

## ✅ Key things I tested

I didn’t just test the “happy path”—I covered edge cases too.

---

### 1. Default values (fallbacks)

What happens if some data is missing?

- If `companion.name` is empty → fallback to `"AI Tutor"`
- If `speakingStyle` is missing → fallback to `"Friendly"`

👉 Ensures the app doesn’t break with incomplete data.

---

### 2. User name handling

The function extracts the first name:

```ts
user?.name?.split(" ")[0]Tested scenarios:

"John Doe" → "John"
"John" → "John"
undefined user → no crash

👉 Small logic, but easy to break if untested.

3. Dynamic message generation

The system message includes:

topic
subject
speaking style

Verified that all values are correctly injected into the output.

👉 This directly affects how the AI behaves.

4. Static configuration

Validated key constants:

transcriber → "deepgram"
voice → "alloy"
model → "gpt-4o-mini"

👉 Prevents accidental regressions.

5. Edge cases

Tested less predictable inputs:

user = null
user = undefined
missing optional fields

👉 Goal: ensure nothing crashes silently.

🐛 Issues I found (and fixed)
Risky name extraction
user?.name?.split(" ")[0]

Problem:

If user.name is empty or undefined → unreliable output

Fix:

const firstName = user?.name?.split(" ")?.[0] || "there";

Now the message becomes:

“Hello, there…”

👉 Safer and more user-friendly.

📊 Results
✅ Stable for normal inputs
✅ Handles missing/undefined data safely
✅ Produces consistent config output
⚠️ Minor edge-case improvement applied

Overall:

The function is well-structured, predictable, and easy to test.

💭 Final Ouput
<img width="1115" height="446" alt="image" src="https://github.com/user-attachments/assets/77936d37-9269-40f1-afc6-9345da18ff99" />

Clear input → output relationship
Next steps:
Test custom hooks
Test API logic
Test UI behavior
🚀 Key takeaway

Extract logic into small, pure functions like this—you’ll thank yourself when it’s time to test.
