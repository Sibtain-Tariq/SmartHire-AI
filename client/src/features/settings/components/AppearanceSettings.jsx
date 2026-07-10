import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Moon, Sun, Monitor, LayoutTemplate, Type, Zap, Maximize } from 'lucide-react';
import Toggle from '../../../components/ui/Toggle';
import { useTheme } from '../../../context/ThemeProvider';

const MOCK_PREFS = {
  accentColor: 'indigo',
  fontSize: 'medium',
  compactMode: false,
  sidebarBehavior: 'expanded',
  animations: true
};

const ACCENT_COLORS = [
  { id: 'indigo', hex: 'bg-indigo-600', label: 'Indigo' },
  { id: 'emerald', hex: 'bg-emerald-600', label: 'Emerald' },
  { id: 'rose', hex: 'bg-rose-600', label: 'Rose' },
  { id: 'amber', hex: 'bg-amber-600', label: 'Amber' },
  { id: 'sky', hex: 'bg-sky-600', label: 'Sky' }
];

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [prefs, setPrefs] = useState(MOCK_PREFS);
  const [resolvedTheme, setResolvedTheme] = useState('light');

  useEffect(() => {
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };
    
    updateResolvedTheme();
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateResolvedTheme);
      return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
    }
  }, [theme]);

  const handleToggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));
  const handleChange = (key, val) => setPrefs(p => ({ ...p, [key]: val }));

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          Appearance
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Customize the look and feel of your workspace.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Col: Controls */}
        <div className="flex flex-col gap-8">
          
          {/* Theme */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1 flex items-center gap-2"><Palette size={14}/> Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'light', icon: Sun, label: 'Light' },
                { id: 'dark', icon: Moon, label: 'Dark' },
                { id: 'system', icon: Monitor, label: 'System' }
              ].map(t => {
                const isSelected = theme === t.id;
                return (
                  <button 
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      isSelected ? `border-${prefs.accentColor}-500 bg-${prefs.accentColor}-50 text-${prefs.accentColor}-700` : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <t.icon size={24} />
                    <span className="text-xs font-bold">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Accent Color */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Accent Color</h3>
            <div className="flex flex-wrap gap-3">
              {ACCENT_COLORS.map(color => (
                <button
                  key={color.id}
                  onClick={() => handleChange('accentColor', color.id)}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 ${color.hex} ${
                    prefs.accentColor === color.id ? 'ring-4 ring-slate-200 ring-offset-2' : ''
                  }`}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          {/* Typography & Layout */}
          <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
            
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Type size={18} className="text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">Font Size</span>
                  <span className="text-xs font-medium text-slate-500">Adjust the base text size.</span>
                </div>
              </div>
              <select 
                value={prefs.fontSize}
                onChange={(e) => handleChange('fontSize', e.target.value)}
                className="w-32 appearance-none rounded-xl border border-slate-200 bg-slate-50 p-2 text-sm font-semibold text-slate-700 focus:outline-none"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <LayoutTemplate size={18} className="text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">Sidebar Behavior</span>
                  <span className="text-xs font-medium text-slate-500">Default navigation state.</span>
                </div>
              </div>
              <select 
                value={prefs.sidebarBehavior}
                onChange={(e) => handleChange('sidebarBehavior', e.target.value)}
                className="w-32 appearance-none rounded-xl border border-slate-200 bg-slate-50 p-2 text-sm font-semibold text-slate-700 focus:outline-none"
              >
                <option value="expanded">Expanded</option>
                <option value="collapsed">Collapsed</option>
              </select>
            </div>

          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Maximize size={18} className="text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">Compact Mode</span>
                  <span className="text-xs font-medium text-slate-500">Reduce spacing in lists and tables.</span>
                </div>
              </div>
              <Toggle checked={prefs.compactMode} onChange={() => handleToggle('compactMode')} activeColor={prefs.accentColor} />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Zap size={18} className="text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">Enable Animations</span>
                  <span className="text-xs font-medium text-slate-500">Smooth transitions and effects.</span>
                </div>
              </div>
              <Toggle checked={prefs.animations} onChange={() => handleToggle('animations')} activeColor={prefs.accentColor} />
            </div>
          </div>

        </div>

        {/* Right Col: Live Preview */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Live Preview</h3>
          <div className={`flex flex-col rounded-2xl border transition-colors duration-500 overflow-hidden shadow-sm h-full min-h-[300px] ${
            resolvedTheme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            
            {/* Preview Header */}
            <div className={`px-6 py-4 border-b flex items-center justify-between ${resolvedTheme === 'dark' ? 'border-slate-800' : 'border-slate-200 bg-white'}`}>
              <div className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded-md bg-${prefs.accentColor}-600 flex items-center justify-center`}>
                  <Zap size={12} className="text-white" />
                </div>
                <span className={`font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'} ${prefs.fontSize === 'small' ? 'text-sm' : prefs.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>SmartHire App</span>
              </div>
              <div className={`h-8 w-8 rounded-full ${resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`} />
            </div>

            {/* Preview Body */}
            <div className={`p-6 flex flex-1 flex-col gap-${prefs.compactMode ? '3' : '6'}`}>
              <div className={`h-4 w-1/3 rounded ${resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`} />
              
              <div className="flex gap-4">
                {prefs.sidebarBehavior === 'expanded' && (
                  <div className={`hidden sm:flex flex-col gap-2 w-32 shrink-0 border-r pr-4 ${resolvedTheme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div className={`h-6 w-full rounded bg-${prefs.accentColor}-100`} />
                    <div className={`h-6 w-full rounded ${resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`} />
                    <div className={`h-6 w-full rounded ${resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`} />
                  </div>
                )}
                
                <div className={`flex-1 rounded-xl p-4 border flex flex-col gap-4 ${resolvedTheme === 'dark' ? 'border-slate-800 bg-slate-800/50' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div className={`h-3 w-24 rounded ${resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />
                    <div className={`h-6 w-16 rounded-full bg-${prefs.accentColor}-600`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className={`h-2 w-full rounded ${resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`} />
                    <div className={`h-2 w-5/6 rounded ${resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`} />
                    <div className={`h-2 w-4/6 rounded ${resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`} />
                  </div>
                  
                  {/* Animation Demo */}
                  {prefs.animations && (
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className={`mt-2 h-8 w-full rounded border-2 border-dashed flex items-center justify-center text-xs font-bold border-${prefs.accentColor}-400 text-${prefs.accentColor}-600 bg-${prefs.accentColor}-50/10`}
                    >
                      Animated Element
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
