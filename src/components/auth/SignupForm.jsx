import React, { useState } from 'react';
import { useTournament } from '../../hooks/useTournament';
import { Camera, Info, IdCard } from 'lucide-react';

export default function SignupForm() {
  const { registerPlayer } = useTournament();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: 'Male',
    age: '',
    membership: '',
    freq_pickleball: 'Weekly',
    freq_cricket: 'Occasionally',
    freq_paddle: 'Weekly',
    password: '',
    confirmPassword: ''
  });

  const [photoPreview, setPhotoPreview] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setErrorMsg('Photo size should be under 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target.result);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!photoPreview) {
      setErrorMsg('Please upload a profile photo. It is compulsory for identity verification at the tournament courts.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (formData.password.length < 4) {
      setErrorMsg('Password should be at least 4 characters.');
      return;
    }

    const res = registerPlayer({
      ...formData,
      photo: photoPreview
    });

    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 font-medium flex items-center gap-2.5">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <span>
          Generates an unpredictable permanent ID (MP for Male, FP for Female). Photo upload is compulsory for physical identity verification at tournament courts.
        </span>
      </div>

      {/* Profile Photo Upload */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-heading">
          Upload Profile Photo (Compulsory) *
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-white overflow-hidden relative shadow-sm flex-shrink-0">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-slate-400 text-xs text-center px-1 flex flex-col items-center">
                <Camera className="w-5 h-5 mb-0.5 text-slate-400" />
                Photo
              </span>
            )}
          </div>
          <div className="flex-1 w-full">
            <input
              type="file"
              accept="image/*"
              required
              onChange={handlePhotoChange}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#2F2677] file:text-white hover:file:bg-[#231b61] cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              JPEG, PNG or WebP. This photo will appear on your entry pass and identity badge.
            </p>
          </div>
        </div>
      </div>

      {/* Demographic Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
            Full Name *
          </label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rahul Jain"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] text-sm bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
            Mobile Number *
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm font-semibold">
              +91
            </span>
            <input
              type="tel"
              required
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="10-digit mobile"
              className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] text-sm bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
            Gender *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                formData.gender === 'Male'
                  ? 'border-[#2F2677] bg-indigo-50/70 text-[#2F2677] font-bold'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
                className="text-[#2F2677]"
              />
              <span className="text-sm font-bold">Male</span>
            </label>
            <label
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                formData.gender === 'Female'
                  ? 'border-[#2F2677] bg-pink-50/70 text-pink-700 font-bold'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
                className="text-[#2F2677]"
              />
              <span className="text-sm font-bold">Female</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
            Age Group *
          </label>
          <select
            required
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2677] text-sm"
          >
            <option value="">Select Age Group</option>
            <option value="18-28">18 - 28 (1st Age Group)</option>
            <option value="29-40">29 - 40 (2nd Age Group)</option>
            <option value="41-50">41 - 50 (3rd Age Group)</option>
            <option value="50+">50+ (Senior Category)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
            Membership Category *
          </label>
          <select
            required
            name="membership"
            value={formData.membership}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2677] text-sm"
          >
            <option value="">Select JITO Membership</option>
            <option value="JITO FCP">JITO FCP</option>
            <option value="JITO Patron">JITO Patron</option>
            <option value="JBN">JBN (JITO Business Network)</option>
            <option value="JITO Youth Wing">JITO Youth Wing</option>
            <option value="JITO Ladies Wing">JITO Ladies Wing</option>
          </select>
        </div>
      </div>

      {/* Playing Frequencies */}
      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
          How often do you play each sport?
        </p>

        {/* Pickleball */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <i className="fa-solid fa-table-tennis-paddle-ball text-[#008F3D]" />
            Pickleball
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700">
            {['Daily', 'Weekly', 'Monthly', 'Occasionally', 'Never'].map((freq) => (
              <label key={`pb-${freq}`} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="freq_pickleball"
                  value={freq}
                  checked={formData.freq_pickleball === freq}
                  onChange={handleChange}
                />
                <span>{freq}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Box Cricket */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <i className="fa-solid fa-baseball-bat-ball text-[#E20111]" />
            Box Cricket
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700">
            {['Daily', 'Weekly', 'Monthly', 'Occasionally', 'Never'].map((freq) => (
              <label key={`cricket-${freq}`} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="freq_cricket"
                  value={freq}
                  checked={formData.freq_cricket === freq}
                  onChange={handleChange}
                />
                <span>{freq}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Paddle Ball */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <i className="fa-solid fa-racquet text-[#FDD900]" />
            Paddle Ball
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700">
            {['Daily', 'Weekly', 'Monthly', 'Occasionally', 'Never'].map((freq) => (
              <label key={`paddle-${freq}`} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="freq_paddle"
                  value={freq}
                  checked={formData.freq_paddle === freq}
                  onChange={handleChange}
                />
                <span>{freq}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Password Setup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
            Set Password *
          </label>
          <input
            type="password"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={4}
            placeholder="Min 4 characters"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] text-sm bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
            Confirm Password *
          </label>
          <input
            type="password"
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={4}
            placeholder="Re-type password"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] text-sm bg-white"
          />
        </div>
      </div>

      {errorMsg && (
        <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="w-full py-4 bg-[#008F3D] hover:bg-[#007532] text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Complete Sign-Up & Get Permanent ID</span>
        <IdCard className="w-5 h-5" />
      </button>
    </form>
  );
}
