import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createSkill } from "../../features/skills/skillsSlice";
import Dropdown from "../../components/Dropdown";

const CATEGORIES = [
  "Frontend Development",
  "Backend Development",
  "Blockchain",
  "Database",
  "DevOps",
  "Design",
  "Language Learning",
  "Business Skills",
  "Creative Arts",
  "Other",
] as const;

type Category = (typeof CATEGORIES)[number];

export default function NewSkillPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isCreating, error } = useAppSelector((s: any) => s.skills);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("Backend Development");
  const [description, setDescription] = useState("");

  // backend: name must be 3-50 chars, category required
  const canSubmit = useMemo(() => name.trim().length >= 3, [name]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const res = await dispatch(
      createSkill({
        name: name.trim(),
        category,
        description: description.trim() ? description.trim() : undefined,
      }) as any
    );

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/app", { replace: true });
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">New skill</h1>
        <p className="text-sm text-muted">
          Add a skill you want to track. You can log practice sessions under it later.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-border bg-card p-6 space-y-4"
      >
        <div className="space-y-1">
          <label className="text-sm">Skill name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-border transition"
            placeholder="JavaScript"
          />
          <p className="text-xs text-muted">Min 3 characters.</p>
        </div>

        <Dropdown<Category>
          label="Category"
          value={category}
          options={CATEGORIES.map((c) => ({ label: c, value: c }))}
          onChange={(v) => setCategory(v)}
        />

        <div className="space-y-1">
          <label className="text-sm">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[96px] resize-none rounded-xl border border-border bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-border transition"
            placeholder="What are you learning and why?"
            maxLength={500}
          />
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Max 500 characters.</span>
            <span>{description.length}/500</span>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => navigate("/app")}
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm hover:bg-border/20 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!canSubmit || isCreating}
            className="rounded-xl border border-border bg-text px-4 py-2 text-sm font-medium text-bg transition disabled:opacity-50 active:scale-[0.98] hover:cursor-pointer"
          >
            {isCreating ? "Creating..." : "Create skill"}
          </button>
        </div>
      </form>
    </div>
  );
}
