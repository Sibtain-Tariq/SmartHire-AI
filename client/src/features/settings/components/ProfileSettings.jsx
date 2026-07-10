import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Briefcase, Award, Building2, User, Edit3, Save, X, FileText } from 'lucide-react';

const MOCK_PROFILE = {
  fullName: "Alex Morgan",
  email: "alex.morgan@smarthire.ai",
  phone: "+1 (555) 123-4567",
  country: "United States",
  currentRole: "Senior Frontend Engineer",
  experienceLevel: "Senior (5-8 years)",
  preferredIndustry: "Technology / SaaS",
  bio: "Passionate software engineer with a focus on building accessible, highly performant web applications using modern React and scalable backend services. Always eager to mentor junior developers and tackle complex architectural challenges.",
  avatarInitials: "AM"
};

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(MOCK_PROFILE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(MOCK_PROFILE);
    setIsEditing(false);
  };

  const InputField = ({ icon: Icon, label, name, type = "text", isTextArea = false }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
        {Icon && <Icon size={14} className="text-slate-400" />} {label}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          disabled={!isEditing}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-900 disabled:opacity-70 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-900 disabled:opacity-70 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Profile Information</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage your personal details and professional summary.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={handleCancel}
                className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              >
                <X size={16} /> Cancel
              </button>
              <button 
                disabled
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm opacity-50 cursor-not-allowed"
                title="Mock mode: Saving is disabled."
              >
                <Save size={16} /> Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Avatar */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative mb-4">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 border-4 border-white shadow-lg text-4xl font-black text-indigo-700">
              {formData.avatarInitials}
            </div>
            {isEditing && (
              <button 
                disabled
                className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md border border-slate-200 hover:text-indigo-600 transition-colors opacity-70 cursor-not-allowed"
                title="Avatar uploads will be supported in a future update."
              >
                <Camera size={18} />
              </button>
            )}
          </div>
          <button 
            disabled
            className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors cursor-not-allowed opacity-60"
          >
            Change Photo
          </button>
        </div>

        {/* Right Column: Form Fields */}
        <div className="flex-1 flex flex-col gap-6">
          
          <div className="grid sm:grid-cols-2 gap-6">
            <InputField icon={User} label="Full Name" name="fullName" />
            <InputField icon={Mail} label="Email Address" name="email" type="email" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <InputField icon={Phone} label="Phone Number" name="phone" />
            <InputField icon={MapPin} label="Location (Country)" name="country" />
          </div>

          <div className="my-2 border-t border-slate-100" />

          <div className="grid sm:grid-cols-2 gap-6">
            <InputField icon={Briefcase} label="Current Role" name="currentRole" />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Award size={14} className="text-slate-400" /> Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-900 disabled:opacity-70 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Junior (0-2 years)">Junior (0-2 years)</option>
                <option value="Mid-Level (3-5 years)">Mid-Level (3-5 years)</option>
                <option value="Senior (5-8 years)">Senior (5-8 years)</option>
                <option value="Lead/Staff (8+ years)">Lead/Staff (8+ years)</option>
              </select>
            </div>
          </div>

          <InputField icon={Building2} label="Preferred Industry" name="preferredIndustry" />
          
          <InputField icon={FileText} label="Professional Bio" name="bio" isTextArea={true} />

        </div>

      </div>
    </div>
  );
}
