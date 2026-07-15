import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Loader2, Image as ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import AvatarStorageService from '../../../services/AvatarStorageService'
import AuthService from '../../../services/AuthService'
import { useAuth } from '../../../hooks/useAuth'
import UserProfileService from '../../../services/UserProfileService'

export default function EditProfileModal({ isOpen, onClose, profile, onProfileUpdated }) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(profile?.avatar || '')
  const [selectedFile, setSelectedFile] = useState(null)
  
  const fileInputRef = useRef(null)
  const { session, refreshSession } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      fullName: profile?.fullName || ''
    }
  })

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Quick frontend validation for avatar
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      toast.error('File must be an image')
      return
    }

    setSelectedFile(file)
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
  }

  const onSubmit = async (data) => {
    try {
      setIsUploading(true)
      let avatarUrl = profile?.avatar

      // 1. Upload Avatar if changed
      if (selectedFile) {
        toast.loading('Uploading avatar...', { id: 'profile-update' })
        const uploadResult = await AvatarStorageService.uploadAndUpdateProfile(selectedFile)
        
        if (!uploadResult.success) {
          toast.error(uploadResult.error.message || 'Failed to upload avatar', { id: 'profile-update' })
          setIsUploading(false)
          return
        }
        avatarUrl = uploadResult.url
      }

      // 2. Update Full Name if changed (or if just updating avatar we need to push metadata)
      if (data.fullName !== profile?.fullName || selectedFile) {
        toast.loading('Updating profile...', { id: 'profile-update' })
        
        const metadataUpdate = {
          full_name: data.fullName,
        }
        
        // We actually only need to update the full name here because AvatarStorageService
        // already updated the avatar_url in the background! But for safety/sync, we push it if we have it.
        if (avatarUrl) {
          metadataUpdate.avatar_url = avatarUrl
        }

        const updateResult = await AuthService.updateUserMetadata(metadataUpdate)
        
        if (!updateResult.success) {
          toast.error(updateResult.error.message || 'Failed to update profile', { id: 'profile-update' })
          setIsUploading(false)
          return
        }
      }

      // 3. Refresh global auth session so Navbar and Context update
      await refreshSession()
      
      toast.success('Profile updated successfully!', { id: 'profile-update' })
      
      if (onProfileUpdated) {
        onProfileUpdated()
      }
      onClose()
    } catch (error) {
      toast.error('An unexpected error occurred.', { id: 'profile-update' })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/60"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-100/5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Edit Profile</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                
                {/* Avatar Upload Section */}
                <div className="mb-6 flex flex-col items-center">
                  <div className="relative group">
                    <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md dark:border-slate-800 dark:bg-slate-800">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Avatar Preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50">
                          {profile?.initials || 'U'}
                        </div>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 rounded-full bg-slate-900 p-2 text-white shadow-sm ring-2 ring-white transition hover:bg-slate-800 dark:bg-sky-600 dark:ring-slate-900 dark:hover:bg-sky-500"
                    >
                      <Upload size={14} />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/jpeg, image/png, image/webp" 
                      onChange={handleFileSelect} 
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">JPEG or PNG under 5MB</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      disabled={isUploading || isSubmitting}
                      {...register('fullName', { required: 'Full name is required' })}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-600"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile?.email || ''}
                      disabled
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none cursor-not-allowed dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400"
                    />
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Email cannot be changed directly.</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isUploading || isSubmitting}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading || isSubmitting}
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  >
                    {(isUploading || isSubmitting) ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
