'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, Trash2, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import html2canvas from 'html2canvas'

type Experience = { company: string; position: string; duration: string; description: string }
type Education = { institution: string; degree: string; year: string }

export default function CVBuilder() {
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '' })
  const [experiences, setExperiences] = useState<Experience[]>([{ company: '', position: '', duration: '', description: '' }])
  const [educations, setEducations] = useState<Education[]>([{ institution: '', degree: '', year: '' }])
  const [skills, setSkills] = useState([''])

  const handlePersonalInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const handleExperienceChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExperiences(prev => prev.map((exp, i) => i === index ? { ...exp, [e.target.name]: e.target.value } : exp))
  }, [])

  const handleEducationChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setEducations(prev => prev.map((edu, i) => i === index ? { ...edu, [e.target.name]: e.target.value } : edu))
  }, [])

  const handleSkillChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setSkills(prev => prev.map((skill, i) => i === index ? e.target.value : skill))
  }, [])

  const addExperience = useCallback(() => {
    setExperiences(prev => [...prev, { company: '', position: '', duration: '', description: '' }])
  }, [])

  const addEducation = useCallback(() => {
    setEducations(prev => [...prev, { institution: '', degree: '', year: '' }])
  }, [])

  const addSkill = useCallback(() => {
    setSkills(prev => [...prev, ''])
  }, [])

  const removeExperience = useCallback((index: number) => {
    setExperiences(prev => prev.filter((_, i) => i !== index))
  }, [])

  const removeEducation = useCallback((index: number) => {
    setEducations(prev => prev.filter((_, i) => i !== index))
  }, [])

  const removeSkill = useCallback((index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index))
  }, [])

  const downloadCV = useCallback(() => {
    const cvPreview = document.getElementById('cv-preview')
    if (cvPreview) {
      html2canvas(cvPreview).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = imgData
        link.download = 'my_cv.png'
        link.click()
      })
    }
  }, [])

  const CVPreview = useMemo(() => (
    <div id="cv-preview" className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">CV Preview</h2>
      <div className="prose max-w-none">
        <h3 className="text-xl font-semibold">{personalInfo.name}</h3>
        <p>{personalInfo.email} | {personalInfo.phone}</p>

        <h4 className="text-lg font-semibold mt-4">Experience</h4>
        {experiences.map((exp, index) => (
          <div key={index} className="mb-2">
            <h5 className="font-semibold">{exp.position} at {exp.company}</h5>
            <p className="text-sm">{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}

        <h4 className="text-lg font-semibold mt-4">Education</h4>
        {educations.map((edu, index) => (
          <div key={index} className="mb-2">
            <h5 className="font-semibold">{edu.degree}</h5>
            <p>{edu.institution}, {edu.year}</p>
          </div>
        ))}

        <h4 className="text-lg font-semibold mt-4">Skills</h4>
        <ul className="list-disc pl-5">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  ), [personalInfo, experiences, educations, skills])

  return (
    <div className="container mx-auto p-4 bg-indigo-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">CV Builder</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
              className="w-full"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="w-full"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
              className="w-full"
            />
          </div>

          <h2 className="text-xl font-semibold text-indigo-700 mt-6 mb-4">Experience</h2>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4 p-4 bg-indigo-100 rounded-lg"
            >
              <Input
                type="text"
                name="company"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full mb-2"
              />
              <Input
                type="text"
                name="position"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full mb-2"
              />
              <Input
                type="text"
                name="duration"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full mb-2"
              />
              <Textarea
                name="description"
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full mb-2"
              />
              <Button variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </motion.div>
          ))}
          <Button variant="outline" size="sm" onClick={addExperience} className="mt-2">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Experience
          </Button>

          <h2 className="text-xl font-semibold text-indigo-700 mt-6 mb-4">Education</h2>
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4 p-4 bg-indigo-100 rounded-lg"
            >
              <Input
                type="text"
                name="institution"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full mb-2"
              />
              <Input
                type="text"
                name="degree"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full mb-2"
              />
              <Input
                type="text"
                name="year"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full mb-2"
              />
              <Button variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </motion.div>
          ))}
          <Button variant="outline" size="sm" onClick={addEducation} className="mt-2">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Education
          </Button>

          <h2 className="text-xl font-semibold text-indigo-700 mt-6 mb-4">Skills</h2>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4 flex items-center"
            >
              <Input
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleSkillChange(index, e)}
                className="w-full mr-2"
              />
              <Button variant="destructive" size="sm" onClick={() => removeSkill(index)}>
                <Trash2 className="w-4 h-4" />
                <span className="sr-only">Remove Skill</span>
              </Button>
            </motion.div>
          ))}
          <Button variant="outline" size="sm" onClick={addSkill} className="mt-2">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {CVPreview}
          <Button onClick={downloadCV} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download CV
          </Button>
        </motion.div>
      </div>
    </div>
  )
}