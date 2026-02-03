import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Skill = {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  hoursThisWeek: number;
  streakDays: number;
};

type PracticeLog = {
  id: string;
  skillId: string;
  skillName: string;
  durationMinutes: number;
  note: string;
  date: string;
};

type EvidenceItem = {
  id: string;
  practiceLogId: string;
  title: string;
  type: "Link" | "Screenshot" | "Repo";
  value: string;
  createdAt: string;
};

export default function DashboardPage() {
  const navigate = useNavigate();

  const skills = useMemo<Skill[]>(
    () => [
      {
        id: "1",
        name: "JavaScript",
        level: "Intermediate",
        tags: ["backend", "api"],
        hoursThisWeek: 6,
        streakDays: 4,
      },
      {
        id: "2",
        name: "Node.js",
        level: "Intermediate",
        tags: ["express", "mongo"],
        hoursThisWeek: 5,
        streakDays: 3,
      },
      {
        id: "3",
        name: "TypeScript",
        level: "Beginner",
        tags: ["frontend", "types"],
        hoursThisWeek: 3,
        streakDays: 2,
      },
    ],
    [],
  );

  const practiceLogs = useMemo<PracticeLog[]>(
    () => [
      {
        id: "p1",
        skillId: "2",
        skillName: "Node.js",
        durationMinutes: 60,
        note: "Built auth middleware + tested protected routes.",
        date: "Today",
      },
      {
        id: "p2",
        skillId: "1",
        skillName: "JavaScript",
        durationMinutes: 45,
        note: "Reviewed async patterns and error handling.",
        date: "Yesterday",
      },
      {
        id: "p3",
        skillId: "3",
        skillName: "TypeScript",
        durationMinutes: 30,
        note: "Typed auth slice and services.",
        date: "2 days ago",
      },
    ],
    [],
  );

  const evidence = useMemo<EvidenceItem[]>(
    () => [
      {
        id: "e1",
        practiceLogId: "p1",
        title: "Auth endpoints tested",
        type: "Link",
        value: "Postman collection / Swagger screenshot",
        createdAt: "Today",
      },
      {
        id: "e2",
        practiceLogId: "p1",
        title: "Middleware implementation",
        type: "Repo",
        value: "Git commit: protect route + token handling",
        createdAt: "Today",
      },
      {
        id: "e3",
        practiceLogId: "p2",
        title: "Notes",
        type: "Screenshot",
        value: "Error handling notes screenshot",
        createdAt: "Yesterday",
      },
    ],
    [],
  );

  const totalMinutes = practiceLogs.reduce((a, p) => a + p.durationMinutes, 0);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  return (
    <div className="space-y-8">
      {/*  */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted mt-1">
            Track skills, log practice sessions, attach evidence, and view
            analytics.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate("/app/skills/new")}
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm hover:bg-border/20 transition hover:cursor-pointer"
          >
            Add new skill
          </button>
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active skills" value={String(skills.length)} />
        <StatCard label="Practice this week" value={`${totalHours}h`} />
        <StatCard label="Evidence items" value={String(evidence.length)} />
      </section>

      {/* Skills */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Skills</h2>
          <p className="text-sm text-muted">{skills.length} total</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Practice Logs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Practice logs</h2>
          <p className="text-sm text-muted">{practiceLogs.length} recent</p>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-12 gap-3 px-4 py-3 text-xs text-muted border-b border-border">
            <div className="col-span-4">Skill</div>
            <div className="col-span-3">Duration</div>
            <div className="col-span-5">Note</div>
          </div>

          {practiceLogs.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 gap-3 px-4 py-3 text-sm border-b border-border last:border-b-0"
            >
              <div className="col-span-4">
                <p className="font-medium">{p.skillName}</p>
                <p className="text-xs text-muted">{p.date}</p>
              </div>

              <div className="col-span-3">
                <span className="rounded-full border border-border bg-bg px-2 py-1 text-xs text-muted">
                  {p.durationMinutes} mins
                </span>
              </div>

              <div className="col-span-5 text-muted">{p.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Evidence</h2>
          <p className="text-sm text-muted">{evidence.length} items</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {evidence.map((ev) => (
            <EvidenceCard key={ev.id} item={ev} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold">{skill.name}</p>
          <p className="text-sm text-muted mt-1">{skill.level}</p>
        </div>

        <button
          type="button"
          className="rounded-xl border border-border px-3 py-1.5 text-sm hover:bg-border/20 transition"
        >
          View
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skill.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-bg px-2 py-1 text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MiniStat label="This week" value={`${skill.hoursThisWeek}h`} />
        <MiniStat label="Streak" value={`${skill.streakDays}d`} />
      </div>
    </div>
  );
}

function EvidenceCard({
  item,
}: {
  item: { title: string; type: string; value: string; createdAt: string };
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">{item.title}</p>
          <p className="text-xs text-muted mt-1">{item.createdAt}</p>
        </div>

        <span className="rounded-full border border-border bg-bg px-2 py-1 text-xs text-muted">
          {item.type}
        </span>
      </div>

      <p className="text-sm text-muted">{item.value}</p>

      <button
        type="button"
        className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm hover:bg-border/20 transition"
      >
        Open
      </button>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-bg px-3 py-2">
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-medium mt-1">{value}</p>
    </div>
  );
}
