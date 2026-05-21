import "dotenv/config";
import mongoose from "mongoose";
import {
  format,
  subDays,
  startOfDay,
  addHours,
  addMinutes,
} from "date-fns";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import HabitLog from "../models/HabitLog.js";
import AIInsight from "../models/AIInsight.js";

const EMAIL = "saichithanya1@gmail.com";
const PASSWORD = "password123";
const NAME = "Sai Gaddam";

// `createdDaysAgo` staggers habit ages so it looks like Alex built up the
// routine over time — older anchor habits first, newest experiments last.
const HABITS = [
  {
    name: "Drink 2L of water",
    description: "Stay hydrated throughout the day.",
    category: "Health",
    frequency: "daily",
    targetDays: 7,
    color: "#0ea5e9",
    icon: "💧",
    probability: 0.95, // very consistent
    createdDaysAgo: 89,
    typicalHour: 8,
  },
  {
    name: "Morning run",
    description: "30-minute run before breakfast.",
    category: "Fitness",
    frequency: "daily",
    targetDays: 5,
    color: "#ef4444",
    icon: "🏃",
    probability: 0.7,
    pattern: "weekdays", // weekends weaker
    brokeStreakAt: 20, // forced gap to simulate a broken streak
    createdDaysAgo: 85,
    typicalHour: 6,
  },
  {
    name: "Read 20 minutes",
    description: "Fiction or non-fiction, no phone.",
    category: "Learning",
    frequency: "daily",
    targetDays: 7,
    color: "#6366f1",
    icon: "📚",
    probability: 0.82,
    createdDaysAgo: 80,
    typicalHour: 21,
  },
  {
    name: "Meditate",
    description: "10 minutes of breath-focused meditation.",
    category: "Mindfulness",
    frequency: "daily",
    targetDays: 7,
    color: "#8b5cf6",
    icon: "🧘",
    probability: 0.6,
    createdDaysAgo: 70,
    typicalHour: 7,
  },
  {
    name: "Journal",
    description: "Write 3 things I'm grateful for.",
    category: "Mindfulness",
    frequency: "daily",
    targetDays: 5,
    color: "#ec4899",
    icon: "✍️",
    probability: 0.75,
    pattern: "dropoff", // last 14 days mostly missed
    createdDaysAgo: 60,
    typicalHour: 22,
  },
  {
    name: "Strength training",
    description: "Push/pull/legs split.",
    category: "Fitness",
    frequency: "weekly",
    targetDays: 3,
    color: "#f59e0b",
    icon: "💪",
    probability: 0.55,
    pattern: "weekdays",
    createdDaysAgo: 45,
    typicalHour: 18,
  },
  {
    name: "No phone after 10pm",
    description: "Leave phone outside the bedroom.",
    category: "Health",
    frequency: "daily",
    targetDays: 6,
    color: "#10b981",
    icon: "😴",
    probability: 0.65,
    createdDaysAgo: 30,
    typicalHour: 22,
  },
  {
    name: "Side project — 1hr",
    description: "Ship something small every day.",
    category: "Productivity",
    frequency: "daily",
    targetDays: 6,
    color: "#14b8a6",
    icon: "🎯",
    probability: 0.78,
    createdDaysAgo: 21,
    typicalHour: 20,
  },
];

const todayKey = () => format(new Date(), "yyyy-MM-dd");

// Build a "completed at" Date for a given YYYY-MM-DD key.
// We anchor each habit to a typical hour and add a tiny per-habit minute
// offset so logs don't all land at the same minute.
const completionAt = (dateKey, hour, minuteOffset = 0) =>
  addMinutes(addHours(startOfDay(new Date(dateKey)), hour), minuteOffset);

const buildLogs = (habit, totalDays = 90) => {
  const logs = [];
  const today = new Date();
  const minuteOffset = (habit.name.length * 7) % 60;

  for (let i = 0; i < totalDays; i++) {
    // never generate a completion before the habit was created
    if (i > habit.createdDaysAgo) break;

    const d = subDays(today, i);
    const dow = d.getDay();
    const key = format(d, "yyyy-MM-dd");
    let p = habit.probability;

    if (habit.pattern === "weekdays") {
      if (dow === 0 || dow === 6) p *= 0.35;
    }
    if (habit.pattern === "dropoff") {
      if (i < 14) p *= 0.25;
    }
    if (
      habit.brokeStreakAt &&
      i >= habit.brokeStreakAt - 2 &&
      i <= habit.brokeStreakAt + 2
    ) {
      continue; // forced 5-day gap to guarantee a broken streak
    }

    // deterministic-ish seed so the dataset is repeatable
    const seed = Math.sin(i * 9301 + habit.name.length * 49297) * 233280;
    const rnd = seed - Math.floor(seed);
    if (rnd < p) {
      logs.push({
        completedDate: key,
        completedAt: completionAt(key, habit.typicalHour, minuteOffset),
      });
    }
  }
  return logs;
};

const run = async () => {
  await connectDB();

  let user = await User.findOne({ email: EMAIL });
  if (user) {
    console.log(`Found existing user ${EMAIL} — clearing their data...`);
    await Habit.deleteMany({ userId: user._id });
    await HabitLog.deleteMany({ userId: user._id });
    await AIInsight.deleteMany({ userId: user._id });
    user.name = NAME;
    user.avatar = NAME.charAt(0).toUpperCase();
    user.morningMotivation = true;
    user.password = PASSWORD; // re-hashed by pre-save hook
    await user.save();
  } else {
    user = await User.create({
      name: NAME,
      email: EMAIL,
      password: PASSWORD,
      avatar: NAME.charAt(0).toUpperCase(),
      morningMotivation: true,
    });
    console.log(`Created user ${EMAIL}`);
  }

  // ─── Habits with proper backdated createdAt/updatedAt ───────────────────
  const createdHabits = [];
  for (let i = 0; i < HABITS.length; i++) {
    const h = HABITS[i];
    const createdAt = addHours(
      startOfDay(subDays(new Date(), h.createdDaysAgo)),
      9 + (i % 6) // small variance so habits weren't all created at midnight
    );

    const habit = new Habit({
      userId: user._id,
      name: h.name,
      description: h.description,
      category: h.category,
      frequency: h.frequency,
      targetDays: h.targetDays,
      color: h.color,
      icon: h.icon,
      order: i,
    });
    habit.createdAt = createdAt;
    habit.updatedAt = createdAt;
    await habit.save({ timestamps: false });
    createdHabits.push({ habit, config: h });
  }

  // ─── Logs with createdAt/updatedAt matching completedDate ──────────────
  let totalLogs = 0;
  for (const { habit, config } of createdHabits) {
    const logs = buildLogs(config);
    if (!logs.length) continue;
    const docs = logs.map((l) => ({
      userId: user._id,
      habitId: habit._id,
      completedDate: l.completedDate,
      createdAt: l.completedAt,
      updatedAt: l.completedAt,
    }));
    await HabitLog.insertMany(docs, {
      ordered: false,
      timestamps: false,
    }).catch(() => {});
    totalLogs += docs.length;
  }

  // ─── Today's logs for the first 4 habits — checked off "now" ───────────
  const today = todayKey();
  const todayDoneHabits = createdHabits.slice(0, 4);
  const now = new Date();
  for (const { habit, config } of todayDoneHabits) {
    // anchor to typical hour earlier today (or now if we haven't reached it)
    const typical = completionAt(today, config.typicalHour);
    const ts = typical < now ? typical : now;
    await HabitLog.updateOne(
      { userId: user._id, habitId: habit._id, completedDate: today },
      {
        $setOnInsert: {
          userId: user._id,
          habitId: habit._id,
          completedDate: today,
          createdAt: ts,
          updatedAt: ts,
        },
      },
      { upsert: true, timestamps: false }
    );
  }

  console.log(`\n✅ Seed complete`);
  console.log(`   User:     ${EMAIL}`);
  console.log(`   Password: ${PASSWORD}`);
  console.log(`   Habits:   ${createdHabits.length}`);
  console.log(`   Logs:     ~${totalLogs}`);
  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error("Seed failed:", err);
  await mongoose.disconnect();
  process.exit(1);
});