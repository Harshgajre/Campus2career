/**
 * Accurate Skill Categorizer
 * Correctly categorizes technical skills into:
 * Frontend, Backend, Database, Tools, Data & AI, or Other
 */
function categorizeSkill(skillName) {
  if (!skillName || typeof skillName !== 'string') return 'Other';
  const name = skillName.trim().toLowerCase();

  // 1. Frontend
  if (
    /^(react|react\.js|reactjs|next|next\.js|nextjs|vue|vue\.js|vuejs|angular|angularjs|html|html5|css|css3|tailwind|tailwind css|tailwindcss|bootstrap|javascript|js|typescript|ts|redux|redux toolkit|figma|ui\/ux|ui|ux|sass|scss|vite|jquery|svelte|xml|front-end|frontend|web design|responsive design)$/i.test(name) ||
    /react|tailwind|bootstrap|html|css|javascript|typescript|redux|figma|frontend/i.test(name)
  ) {
    return 'Frontend';
  }

  // 2. Database
  if (
    /^(mongodb|mongo|postgresql|postgres|mysql|sql|sqlite|redis|cassandra|oracle|firebase|supabase|dynamodb|mariadb|prisma|mongoose|neo4j|couchdb|database|rdbms|nosql)$/i.test(name) ||
    /mongo|postgres|mysql|sqlite|redis|cassandra|database/i.test(name)
  ) {
    return 'Database';
  }

  // 3. Tools & Cloud / DevOps
  if (
    /^(git|github|gitlab|docker|kubernetes|k8s|aws|azure|gcp|google cloud|ci\/cd|cicd|devops|linux|unix|bash|shell|powershell|nginx|apache|postman|vercel|netlify|heroku|jira|jenkins|terraform|ansible|tools)$/i.test(name) ||
    /docker|kubernetes|aws|azure|gcp|git|github|linux|cloud|devops|postman|vercel/i.test(name)
  ) {
    return 'Tools';
  }

  // 4. Data & AI / ML
  if (
    /^(machine learning|ml|data science|artificial intelligence|ai|deep learning|dl|tensorflow|pytorch|keras|pandas|numpy|scikit-learn|scikit|sklearn|opencv|nlp|natural language processing|computer vision|matplotlib|seaborn|tableau|power bi|data analysis|llm|genai)$/i.test(name) ||
    /machine learning|data science|tensorflow|pytorch|pandas|numpy|deep learning|nlp/i.test(name)
  ) {
    return 'Data & AI';
  }

  // 5. Backend
  if (
    /^(node|node\.js|nodejs|express|express\.js|expressjs|python|django|flask|fastapi|java|spring|spring boot|springboot|c\+\+|c#|\.net|dotnet|golang|go|rust|php|ruby|ruby on rails|rails|rest|rest api|restful api|graphql|microservices|grpc|socket\.io|kafka|rabbitmq|backend|back-end|c|kotlin|scala|c language)$/i.test(name) ||
    /node|express|python|django|flask|fastapi|java|spring|c\+\+|c#|\.net|golang|rust|php|ruby|graphql|backend/i.test(name)
  ) {
    return 'Backend';
  }

  return 'Other';
}

module.exports = {
  categorizeSkill,
};
