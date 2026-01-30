import { api } from "../../lib/api";

export type SkillCategory =
  | "Frontend Development"
  | "Backend Development"
  | "Blockchain"
  | "Database"
  | "DevOps"
  | "Design"
  | "Language Learning"
  | "Business Skills"
  | "Creative Arts"
  | "Other";

export type CreateSkillPayload = {
  name: string;
  category: SkillCategory;
  description?: string;
};

export type Skill = {
  _id: string;
  user_id: string;
  name: string;
  description?: string;
  category: SkillCategory;
  status: "Active" | "Archived";
  current_stage: "Beginner" | "Intermediate" | "Advanced"; // from backend
  createdAt: string;
  updatedAt: string;
};

type CreateSkillResponse = {
  success: boolean;
  data: Skill;
  meta?: any;
};

export async function createSkillService(payload: CreateSkillPayload) {
  const clean: CreateSkillPayload = {
    name: payload.name.trim(),
    category: payload.category,
    ...(payload.description?.trim()
      ? { description: payload.description.trim() }
      : {}),
  };

  const { data } = await api.post<CreateSkillResponse>("/api/skills", clean);
  return data;
}
