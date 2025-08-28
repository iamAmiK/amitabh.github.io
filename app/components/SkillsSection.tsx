"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills, skillCategories } from "../data/skills";
import { GridWrapper } from "./GridWrapper";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="space-y-16">
      <div className="space-y-4">
        <GridWrapper>
          <div className="text-center text-lg font-medium text-indigo-600">
            <span>Skills & Technology</span>
          </div>
        </GridWrapper>
        <GridWrapper>
          <h2 className="mx-auto max-w-2xl text-balance text-center text-3xl font-medium leading-10 tracking-tight text-text-primary md:text-4xl">
            A look at my technical abilities and product knowledge
          </h2>
        </GridWrapper>
      </div>

      <GridWrapper>
        <div className="mx-auto max-w-4xl border-b border-dashed border-gray-300">
          <nav className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:gap-0 md:space-x-8">
            {skillCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap py-3 px-2 md:px-0 text-xs md:text-sm uppercase transition-colors ${
                  activeCategory === category
                    ? "text-slate-900 font-medium"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </GridWrapper>

      <GridWrapper>
        <div className="mx-auto max-w-4xl">
          <div className="divide-y divide-dotted divide-gray-300">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 items-start gap-6 py-6 md:grid-cols-4 md:gap-8 md:py-8"
              >
                <div className="md:col-span-1">
                  <h3 className="text-sm font-medium text-gray-900 md:text-base">
                    {skill.name}
                  </h3>
                </div>
                <div className="md:col-span-3">
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GridWrapper>
    </section>
  );
}
