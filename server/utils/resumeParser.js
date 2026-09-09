const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const KNOWN_SKILLS = [
  'React', 'React.js', 'Node.js', 'Express', 'Express.js', 'MongoDB', 'JavaScript',
  'TypeScript', 'Python', 'Java', 'C++', 'C', 'C#', '.NET', 'HTML', 'CSS', 'Tailwind CSS',
  'Bootstrap', 'SQL', 'PostgreSQL', 'MySQL', 'Git', 'GitHub', 'Docker', 'Kubernetes',
  'AWS', 'Azure', 'GCP', 'REST API', 'GraphQL', 'Redux', 'Next.js', 'Vue.js',
  'Angular', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Machine Learning',
  'Data Science', 'Figma', 'UI/UX', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy'
];

/**
 * Extract raw text from PDF or DOCX file
 */
async function extractTextFromFile(filePath, mimeType, originalName) {
  const ext = path.extname(originalName || filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);

  if (ext === '.pdf') {
    if (typeof pdfParse === 'function') {
      const data = await pdfParse(buffer);
      return data.text || '';
    } else if (pdfParse && pdfParse.PDFParse) {
      const parser = new pdfParse.PDFParse({ data: buffer });
      const data = await parser.getText();
      return data.text || '';
    } else {
      throw new Error('Unsupported pdf-parse module structure');
    }
  } else if (ext === '.docx' || ext === '.doc') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  } else {
    return buffer.toString('utf-8');
  }
}

/**
 * Parse structured entities from raw resume text
 */
function parseResumeData(text) {
  if (!text) text = '';
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // 1. Email Extraction
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // 2. Phone Extraction
  const phoneMatch = text.match(/(?:\+?\d{1,3}[\s-]?)?\(?\d{3,5}\)?[\s-]?\d{3,5}[\s-]?\d{3,5}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // 3. Name Extraction
  let name = '';
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const line = lines[i];
    if (
      !line.includes('@') &&
      !/\d{5,}/.test(line) &&
      !/resume|curriculum|cv|page/i.test(line) &&
      line.length > 2 &&
      line.length < 40
    ) {
      name = line.replace(/[^a-zA-Z\s]/g, '').trim();
      if (name) break;
    }
  }

  // 4. College/University Extraction
  let college = '';
  const collegeRegex = /(?:university|institute|college|academy|school|iit|nit|bits|vit|mit)\s+[^\n,.]+/i;
  const collegeMatch = text.match(collegeRegex);
  if (collegeMatch) {
    college = collegeMatch[0].trim();
  }

  // 5. Skills Extraction
  const detectedSkills = [];
  KNOWN_SKILLS.forEach(skill => {
    const escaped = escapeRegExp(skill);
    const startPattern = '(?<![a-zA-Z0-9])';
    let endPattern = '(?![a-zA-Z0-9])';

    if (skill === 'C') {
      endPattern = '(?![a-zA-Z0-9+#])';
    } else if (skill === 'C++') {
      endPattern = '(?![a-zA-Z0-9+])';
    } else if (skill === 'C#') {
      endPattern = '(?![a-zA-Z0-9#])';
    }

    const regex = new RegExp(`${startPattern}${escaped}${endPattern}`, 'i');
    if (regex.test(text) && !detectedSkills.includes(skill)) {
      detectedSkills.push(skill);
    }
  });

  // 6. Section Parsing (Education, Projects, Experience, Certifications)
  const sections = {
    education: [],
    projects: [],
    experience: [],
    certifications: []
  };

  let currentSection = null;

  lines.forEach(line => {
    const lower = line.toLowerCase();
    if (/^education|^academic/i.test(lower)) {
      currentSection = 'education';
      return;
    } else if (/^projects?|^key projects/i.test(lower)) {
      currentSection = 'projects';
      return;
    } else if (/^experience|^work experience|^internships?/i.test(lower)) {
      currentSection = 'experience';
      return;
    } else if (/^certifications?|^certificates?|^licenses/i.test(lower)) {
      currentSection = 'certifications';
      return;
    } else if (/^skills?|^technical skills|^summary|^achievements/i.test(lower)) {
      currentSection = null;
      return;
    }

    if (currentSection && line.length > 3) {
      sections[currentSection].push(line);
    }
  });

  return {
    rawText: text,
    name,
    email,
    phone,
    college,
    skills: detectedSkills,
    education: sections.education.slice(0, 5),
    projects: sections.projects.slice(0, 5),
    experience: sections.experience.slice(0, 5),
    certifications: sections.certifications.slice(0, 5)
  };
}

module.exports = {
  extractTextFromFile,
  parseResumeData
};

