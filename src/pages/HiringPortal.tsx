import { CheckCircle2, Clock, Mic, ShieldCheck, Sparkles, Video } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSeo } from "../lib/seo";

type Question = {
  id: string;
  category: "Aptitude" | "Logical" | "Reasoning";
  prompt: string;
  options: string[];
  answer: string;
};

const questionBank: Question[] = [
  {
    id: "apt-1",
    category: "Aptitude",
    prompt: "A project is completed by 6 people in 12 days. How many days will 9 people take at the same rate?",
    options: ["6 days", "8 days", "10 days", "18 days"],
    answer: "8 days",
  },
  {
    id: "apt-2",
    category: "Aptitude",
    prompt: "If a number is increased by 20% and becomes 240, what was the original number?",
    options: ["180", "190", "200", "220"],
    answer: "200",
  },
  {
    id: "apt-3",
    category: "Aptitude",
    prompt: "The average of 5 numbers is 18. If one number is removed, the average becomes 16. What is the removed number?",
    options: ["22", "24", "26", "28"],
    answer: "26",
  },
  {
    id: "apt-4",
    category: "Aptitude",
    prompt: "A product priced at 800 is sold at a 15% discount. What is the selling price?",
    options: ["640", "660", "680", "700"],
    answer: "680",
  },
  {
    id: "apt-5",
    category: "Aptitude",
    prompt: "A train travels 180 km in 3 hours. What is its speed?",
    options: ["45 km/h", "50 km/h", "60 km/h", "75 km/h"],
    answer: "60 km/h",
  },
  {
    id: "log-1",
    category: "Logical",
    prompt: "Find the next term: 3, 6, 12, 24, ?",
    options: ["30", "36", "42", "48"],
    answer: "48",
  },
  {
    id: "log-2",
    category: "Logical",
    prompt: "If all roses are flowers and some flowers fade quickly, which statement is definitely true?",
    options: ["All roses fade quickly", "Some roses fade quickly", "All roses are flowers", "No flowers are roses"],
    answer: "All roses are flowers",
  },
  {
    id: "log-3",
    category: "Logical",
    prompt: "Find the odd one out.",
    options: ["Circle", "Triangle", "Square", "Cube"],
    answer: "Cube",
  },
  {
    id: "log-4",
    category: "Logical",
    prompt: "Book is to reading as fork is to:",
    options: ["Writing", "Eating", "Cooking", "Drawing"],
    answer: "Eating",
  },
  {
    id: "log-5",
    category: "Logical",
    prompt: "If A = 1, B = 2, C = 3, what is the value of CAB?",
    options: ["312", "321", "123", "213"],
    answer: "312",
  },
  {
    id: "rea-1",
    category: "Reasoning",
    prompt: "A person walks 5 km north, then 3 km east. In which direction is the starting point from the person?",
    options: ["North-East", "South-West", "South-East", "North-West"],
    answer: "South-West",
  },
  {
    id: "rea-2",
    category: "Reasoning",
    prompt: "Statements: Some developers are testers. All testers are engineers. What follows?",
    options: [
      "Some developers are engineers",
      "All developers are engineers",
      "No engineers are developers",
      "All engineers are testers",
    ],
    answer: "Some developers are engineers",
  },
  {
    id: "rea-3",
    category: "Reasoning",
    prompt: "Which number completes the pattern: 2, 5, 10, 17, 26, ?",
    options: ["35", "36", "37", "38"],
    answer: "37",
  },
  {
    id: "rea-4",
    category: "Reasoning",
    prompt: "If TODAY is coded as UPEBZ, how is NIGHT coded?",
    options: ["OJHIU", "OJHIW", "MJFGS", "PKIJV"],
    answer: "OJHIU",
  },
  {
    id: "rea-5",
    category: "Reasoning",
    prompt: "Choose the pair that has the same relationship as Doctor : Hospital.",
    options: ["Teacher : School", "Driver : Road", "Chef : Food", "Writer : Pen"],
    answer: "Teacher : School",
  },
];

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function generateRoundOneQuestions() {
  const byCategory = ["Aptitude", "Logical", "Reasoning"].flatMap((category) =>
    shuffle(questionBank.filter((question) => question.category === category)).slice(0, 4),
  );
  return shuffle(byCategory).map((question) => ({ ...question, options: shuffle(question.options) }));
}

function readableSlug(value: string | null) {
  return String(value ?? "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function HiringPortal() {
  const [searchParams] = useSearchParams();
  const [candidate, setCandidate] = useState({
    name: readableSlug(searchParams.get("name")),
    email: searchParams.get("email") ?? "",
  });
  const [step, setStep] = useState<"intro" | "rules" | "test" | "result">("intro");
  const [permissionStatus, setPermissionStatus] = useState<"idle" | "granted" | "denied">("idle");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const questions = useMemo(() => generateRoundOneQuestions(), []);

  useSeo({
    title: "Hiring Assessment Portal | Luxmorai Technologies",
    description: "Luxmorai hiring assessment portal for shortlisted applicants.",
    path: "/hiring",
    robots: "noindex, nofollow",
  });

  function submitCandidate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCandidate({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
    });
    setStep("rules");
  }

  async function requestPermissions() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissionStatus("granted");
    } catch {
      setPermissionStatus("denied");
    }
  }

  function submitTest() {
    if (Object.keys(answers).length < questions.length) {
      return;
    }
    setStep("result");
  }

  const score = questions.filter((question) => answers[question.id] === question.answer).length;
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 60;
  const candidateDisplayName =
    candidate.name && candidate.name.trim().toLowerCase() !== candidate.email.trim().toLowerCase()
      ? candidate.name
      : "Assessment candidate";

  return (
    <section className="hiring-page">
      <div className="hiring-shell">
        <div className="hiring-hero">
          <p className="eyebrow">Luxmorai Hiring Portal</p>
          <h1>Round 1 assessment</h1>
          <p>Aptitude, logical ability, and reasoning screening for shortlisted applicants.</p>
        </div>

        {step === "intro" && (
          <form className="hiring-card hiring-form" onSubmit={submitCandidate}>
            <h2>Candidate verification</h2>
            <p>Enter the same name and email used in your application before starting the hiring assessment.</p>
            <input name="name" required defaultValue={candidate.name} placeholder="Full name" />
            <input name="email" required type="email" defaultValue={candidate.email} placeholder="Email address" />
            <button className="primary-button" type="submit">
              Continue
            </button>
          </form>
        )}

        {step === "rules" && (
          <div className="hiring-card">
            <h2>Rules and permissions</h2>
            <div className="hiring-rules">
              <span><ShieldCheck /> Do not switch tabs, refresh, copy questions, or take outside help.</span>
              <span><Video /> Camera permission is required for assessment integrity.</span>
              <span><Mic /> Microphone permission is required before starting.</span>
              <span><Clock /> Complete all questions in one sitting. Answers are auto-evaluated.</span>
            </div>
            <div className="hiring-permission-row">
              <button type="button" onClick={requestPermissions}>
                Request camera and mic permission
              </button>
              <strong className={permissionStatus}>{permissionStatus === "idle" ? "Not checked" : permissionStatus}</strong>
            </div>
            <button
              className="primary-button"
              disabled={permissionStatus !== "granted"}
              type="button"
              onClick={() => setStep("test")}
            >
              Start Test
            </button>
          </div>
        )}

        {step === "test" && (
          <div className="hiring-test-grid">
            <aside className="hiring-card hiring-progress">
              <p className="eyebrow">Candidate</p>
              <h2>{candidateDisplayName}</h2>
              <p>{candidate.email}</p>
              <strong>{Object.keys(answers).length}/{questions.length}</strong>
              <span>questions answered</span>
            </aside>
            <div className="hiring-card hiring-questions">
              {questions.map((question, index) => (
                <fieldset key={question.id}>
                  <legend>
                    <span>{index + 1}. {question.category}</span>
                    {question.prompt}
                  </legend>
                  <div className="hiring-options">
                    {question.options.map((option) => (
                      <label key={option}>
                        <input
                          checked={answers[question.id] === option}
                          name={question.id}
                          type="radio"
                          value={option}
                          onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <button className="primary-button" type="button" onClick={submitTest}>
                Submit Round 1
              </button>
              {Object.keys(answers).length < questions.length && (
                <p className="hiring-warning">Answer all questions before submitting.</p>
              )}
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="hiring-card hiring-result">
            <CheckCircle2 />
            <p className="eyebrow">Round 1 result</p>
            <h2>{score}/{questions.length} correct</h2>
            <strong>{percentage}%</strong>
            <p>
              {passed
                ? "You have cleared Round 1. Round 2 will be enabled by the recruitment team."
                : "Thank you for completing the assessment. The recruitment team will review your result."}
            </p>
            <span><Sparkles /> This score was evaluated automatically.</span>
          </div>
        )}
      </div>
    </section>
  );
}
