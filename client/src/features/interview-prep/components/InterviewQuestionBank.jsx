import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronUp, Users, BrainCircuit, Code2, LayoutTemplate, Puzzle, Terminal, BookOpen, Clock } from 'lucide-react';

const MOCK_QUESTION_BANK = [
  {
    id: 'hr',
    category: 'HR Questions',
    icon: Users,
    count: 120,
    difficulty: 'Easy',
    roles: ['All Roles'],
    example: '"Tell me about yourself."',
    questions: [
      'Tell me about yourself.',
      'Why do you want to work here?',
      'Where do you see yourself in 5 years?',
      'What are your greatest strengths and weaknesses?'
    ]
  },
  {
    id: 'behavioral',
    category: 'Behavioral',
    icon: BrainCircuit,
    count: 85,
    difficulty: 'Medium',
    roles: ['All Roles'],
    example: '"Describe a difficult challenge you faced."',
    questions: [
      'Describe a difficult challenge you faced and how you overcame it.',
      'Tell me about a time you disagreed with a coworker.',
      'Describe a situation where you had to meet a tight deadline.',
      'Give an example of a time you showed leadership.'
    ]
  },
  {
    id: 'technical',
    category: 'Technical',
    icon: Code2,
    count: 150,
    difficulty: 'Medium',
    roles: ['Software Engineer', 'Frontend Engineer', 'Backend Engineer'],
    example: '"Explain REST APIs."',
    questions: [
      'Explain REST APIs and their core principles.',
      'What is the Virtual DOM in React?',
      'How does Event Delegation work in JavaScript?',
      'Explain the difference between SQL and NoSQL databases.'
    ]
  },
  {
    id: 'system-design',
    category: 'System Design',
    icon: LayoutTemplate,
    count: 40,
    difficulty: 'Hard',
    roles: ['Software Engineer', 'Backend Engineer', 'Architect'],
    example: '"Design a URL Shortener."',
    questions: [
      'Design a URL Shortener like Bitly.',
      'How would you design a rate limiter?',
      'Design a scalable chat application.',
      'Design Twitter / X timeline.'
    ]
  },
  {
    id: 'coding',
    category: 'Coding Questions',
    icon: Terminal,
    count: 200,
    difficulty: 'Hard',
    roles: ['Software Engineer', 'Data Scientist'],
    example: '"Reverse a Linked List."',
    questions: [
      'Reverse a Linked List.',
      'Find the Longest Substring Without Repeating Characters.',
      'Implement a Binary Search Tree.',
      'Merge two sorted arrays.'
    ]
  },
  {
    id: 'problem-solving',
    category: 'Problem Solving',
    icon: Puzzle,
    count: 65,
    difficulty: 'Medium',
    roles: ['Product Manager', 'Data Analyst', 'Software Engineer'],
    example: '"How would you estimate the number of windows in NYC?"',
    questions: [
      'How would you estimate the number of windows in NYC?',
      'Walk me through how you troubleshoot a sudden drop in user metrics.',
      'How do you prioritize competing feature requests?',
      'Design an experiment to test a new checkout flow.'
    ]
  }
];

export default function InterviewQuestionBank() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  // Extract unique roles & categories for filters
  const allRoles = ['All', ...new Set(MOCK_QUESTION_BANK.flatMap(q => q.roles))];
  const allCategories = ['All', ...MOCK_QUESTION_BANK.map(q => q.category)];
  const allDifficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredBank = MOCK_QUESTION_BANK.filter((bank) => {
    const matchesSearch = 
      bank.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.questions.some(q => q.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = difficultyFilter === 'All' || bank.difficulty === difficultyFilter;
    const matchesRole = roleFilter === 'All' || bank.roles.includes('All Roles') || bank.roles.includes(roleFilter);
    const matchesCategory = categoryFilter === 'All' || bank.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesRole && matchesCategory;
  });

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      
      {/* Header & Filters */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Question Bank</h2>
            <p className="text-sm font-medium text-slate-500">Browse and study our comprehensive database of interview questions.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 mt-2">
          
          <div className="lg:col-span-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="All" disabled className="text-slate-400">Difficulty</option>
              {allDifficulties.map(d => <option key={d} value={d}>{d === 'All' ? 'All Difficulties' : d}</option>)}
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="All" disabled className="text-slate-400">Role</option>
              {allRoles.map(r => <option key={r} value={r}>{r === 'All' ? 'All Roles' : r}</option>)}
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="All" disabled className="text-slate-400">Category</option>
              {allCategories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredBank.map((bank) => {
          const Icon = bank.icon;
          const isExpanded = expandedId === bank.id;

          return (
            <motion.div 
              key={bank.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
                isExpanded ? 'border-indigo-200 bg-white shadow-md' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              
              <button 
                onClick={() => setExpandedId(isExpanded ? null : bank.id)}
                className="flex flex-col p-6 text-left focus:outline-none bg-white relative"
              >
                
                <div className="flex items-start justify-between w-full mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{bank.category}</h3>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-0.5">
                        <Clock size={12} />
                        {bank.count} Questions
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getDifficultyColor(bank.difficulty)}`}>
                      {bank.difficulty}
                    </span>
                    {isExpanded ? <ChevronUp size={20} className="text-indigo-500" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">Example</span>
                  <p className="text-sm font-semibold text-slate-700 italic">
                    {bank.example}
                  </p>
                </div>

              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 mt-4">Preview Questions</h4>
                      <ul className="flex flex-col gap-3">
                        {bank.questions.map((q, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                              {idx + 1}
                            </span>
                            {q}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full mt-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-bold hover:bg-indigo-100 transition-colors">
                        View All {bank.count} Questions
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>

      {filteredBank.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <BookOpen size={48} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No questions found</h3>
          <p className="text-sm text-slate-500 max-w-sm mt-1">Try adjusting your filters or search query to find what you're looking for.</p>
        </div>
      )}

    </div>
  );
}
