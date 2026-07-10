import React from 'react';
import { User, Briefcase, Calendar, Mail, Phone, MapPin, Building2, Layout, Award, Settings } from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardContainer from '../../../components/dashboard/DashboardContainer';
import ProfileHeader from '../components/ProfileHeader';
import InfoCard, { InfoRow } from '../components/InfoCard';
import ActivityStats from '../components/ActivityStats';
import QuickActions from '../components/QuickActions';

const MOCK_USER_DATA = {
  profile: {
    name: 'Alex Morgan',
    initials: 'AM',
    role: 'Senior Frontend Engineer',
    bio: 'Passionate software engineer with a focus on building accessible, highly performant web applications using modern React and scalable backend services. Always eager to mentor junior developers and tackle complex architectural challenges.',
  },
  personalInfo: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@smarthire.ai',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    city: 'San Francisco, CA',
    currentRole: 'Senior Frontend Engineer',
    experienceLevel: 'Senior (5-8 years)',
    preferredIndustry: 'Technology / SaaS',
  },
  careerInfo: {
    targetRole: 'Lead Frontend Engineer / UI Architect',
    skills: 'React, TypeScript, Tailwind CSS, Node.js, GraphQL',
    resumeFocus: 'Architecture, Performance, Team Leadership',
    preferredLocations: 'San Francisco, New York, London',
    remotePreference: 'Hybrid or Fully Remote',
  },
  activity: {
    resumesAnalyzed: 14,
    atsReports: 8,
    jobMatches: 22,
    interviewsPracticed: 5,
    avgAtsScore: 86,
    avgMatchScore: 92,
  },
  account: {
    memberSince: 'March 15, 2024',
    status: 'Active',
    plan: 'Pro Plan',
    lastActivity: '2 hours ago',
  }
};

export default function UserProfilePage() {
  const { profile, personalInfo, careerInfo, activity, account } = MOCK_USER_DATA;

  return (
    <DashboardLayout>
      <DashboardContainer>
        
        <div className="flex flex-col gap-6 pb-12 w-full max-w-5xl mx-auto">
          
          <ProfileHeader user={profile} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              <InfoCard title="Personal Information" icon={User}>
                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  <InfoRow label="Full Name" value={personalInfo.fullName} icon={User} />
                  <InfoRow label="Email Address" value={personalInfo.email} icon={Mail} />
                  <InfoRow label="Phone Number" value={personalInfo.phone} icon={Phone} />
                  <InfoRow label="Location" value={`${personalInfo.city}, ${personalInfo.country}`} icon={MapPin} />
                  <InfoRow label="Current Role" value={personalInfo.currentRole} icon={Briefcase} />
                  <InfoRow label="Experience" value={personalInfo.experienceLevel} icon={Award} />
                  <InfoRow label="Industry" value={personalInfo.preferredIndustry} icon={Building2} />
                </div>
              </InfoCard>

              <InfoCard title="Career Information" icon={Layout}>
                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  <InfoRow label="Target Role" value={careerInfo.targetRole} />
                  <InfoRow label="Key Skills" value={careerInfo.skills} />
                  <InfoRow label="Resume Focus" value={careerInfo.resumeFocus} />
                  <InfoRow label="Locations" value={careerInfo.preferredLocations} />
                  <InfoRow label="Remote Work" value={careerInfo.remotePreference} />
                </div>
              </InfoCard>
              
              <ActivityStats activity={activity} />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <InfoCard title="Account Information" icon={Settings}>
                <InfoRow label="Member Since" value={account.memberSince} icon={Calendar} />
                <InfoRow label="Status" value={<span className="text-emerald-600 font-bold">{account.status}</span>} />
                <InfoRow label="Current Plan" value={<span className="text-indigo-600 font-bold">{account.plan}</span>} />
                <InfoRow label="Last Activity" value={account.lastActivity} />
              </InfoCard>

              <QuickActions />
            </div>

          </div>
          
        </div>
        
      </DashboardContainer>
    </DashboardLayout>
  );
}
