"use client"

import { useState } from "react"
import { Briefcase, GraduationCap } from "lucide-react"
import { cn } from "../utils"
import { useTheme } from "./ThemeProvider"

export default function Qualification() {
  const [activeTab, setActiveTab] = useState("education")
  const { theme } = useTheme();

  return (
    <section id="qualification" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Qualification</h2>
          <p className="text-gray-600 dark:text-gray-400">My personal journey</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-12">
            <button
              onClick={() => setActiveTab("education")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400",
                activeTab === "education" && "text-gray-900 dark:text-gray-100 font-medium",
              )}
            >
              <GraduationCap className="w-5 h-5" />
              Education
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400",
                activeTab === "experience" && "text-gray-900 dark:text-gray-100 font-medium",
              )}
            >
              <Briefcase className="w-5 h-5" />
              Experience
            </button>
          </div>

          {activeTab === "education" && (
            <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-gray-300 dark:before:bg-gray-700">
              <div className="relative mb-12">
                <div className="absolute left-[-33px] top-0 w-4 h-4 bg-gray-800 dark:bg-gray-300 rounded-full z-10"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Master in Web Design</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Harvard University</p>
                <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                  <span>2018 - 2020</span>
                </div>
              </div>

              <div className="relative mb-12">
                <div className="absolute left-[-33px] top-0 w-4 h-4 bg-gray-800 dark:bg-gray-300 rounded-full z-10"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Bachelor in Design</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">New York University</p>
                <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                  <span>2014 - 2018</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-[-33px] top-0 w-4 h-4 bg-gray-800 dark:bg-gray-300 rounded-full z-10"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">High School Diploma</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Brooklyn High School</p>
                <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                  <span>2010 - 2014</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-gray-300 dark:before:bg-gray-700">
              <div className="relative mb-12">
                <div className="absolute left-[-33px] top-0 w-4 h-4 bg-gray-800 dark:bg-gray-300 rounded-full z-10"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Senior UI/UX Designer</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Google Inc.</p>
                <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                  <span>2020 - Present</span>
                </div>
              </div>

              <div className="relative mb-12">
                <div className="absolute left-[-33px] top-0 w-4 h-4 bg-gray-800 dark:bg-gray-300 rounded-full z-10"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">UI/UX Designer</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Apple Inc.</p>
                <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                  <span>2018 - 2020</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-[-33px] top-0 w-4 h-4 bg-gray-800 dark:bg-gray-300 rounded-full z-10"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Junior UI Designer</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Dribbble LLC.</p>
                <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                  <span>2016 - 2018</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
