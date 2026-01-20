"use client";

import React, { useEffect, useState } from 'react';
import { User, Shield, LogOut, Trash2, Edit2, AlertCircle, ChevronRight, Settings as SettingsIcon, Sparkles } from 'lucide-react';
import { getSession, signOut, useSession } from 'next-auth/react';
import { getAllCompanions, removeCompanion } from '@/services/companion.services';
import { deleteAccount } from '@/services/user.services';
import CreateCompanionModal from '@/components/modals/CreateCompanionModal';
import { Companion } from '@/types/types';
import { toast } from 'sonner';

const SettingsPage = () => {
    const { data: session } = useSession();

    const [companions, setCompanions] = useState<Companion[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCompanion, setSelectedCompanion] = useState<any>(null);

    useEffect(() => {
        const fetchCompanions = async () => {
            try {
                const res = await getAllCompanions();
                if (res?.data) {
                    setCompanions(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch companions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanions();
    }, []);

    const handleDeleteCompanion = async (id: string) => {
        if (confirm("Are you sure you want to delete this companion? This action cannot be undone.")) {
            try {
                await removeCompanion(id);
                setCompanions(companions.filter(c => c.id !== id));
                toast.success("Companion deleted successfully");
            } catch (error) {
                // error is already toasted in service
            }
        }
    };

    const handleDeleteAccount = async () => {
        if (confirm("CRITICAL ACTION: Are you sure you want to delete your account? All your data, companions, and progress will be permanently removed. This cannot be undone.")) {
            try {
                await deleteAccount();
                toast.success("Account deleted successfully");
                signOut({ callbackUrl: '/sign-in' });
            } catch (error) {
                // error is already toasted in service
            }
        }
    };

    const handleEditCompanion = (companion: Companion) => {
        setSelectedCompanion(companion);
        setIsEditModalOpen(true);
    };

    return (
        <main className="max-w-4xl mx-auto py-10 px-4">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-[#FF5B37] rounded-2xl flex items-center justify-center text-white">
                    <SettingsIcon size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-0">Settings</h1>
                    <p className="text-gray-500 font-medium">Manage your account and companions</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Account Section */}
                <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                        <User size={20} className="text-[#FF5B37]" />
                        <h2 className="text-lg font-bold">Profile Information</h2>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                                {session?.user?.image ? (
                                    <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={32} className="text-gray-400" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">{session?.user?.name || "User"}</h3>
                                <p className="text-gray-500">{session?.user?.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => signOut()}
                                className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                                        <LogOut size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-gray-900">Sign Out</p>
                                        <p className="text-xs text-gray-500 font-medium">Clear your session</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                            </button>

                            <button
                                onClick={handleDeleteAccount}
                                className="flex items-center justify-between p-5 rounded-2xl border border-red-100 bg-red-50/30 hover:bg-red-50 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                                        <Trash2 size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-red-600">Delete Account</p>
                                        <p className="text-xs text-red-400 font-medium">Permanent action</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-red-200 group-hover:text-red-400 transition-colors" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Companions Section */}
                <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                        <Sparkles size={20} className="text-[#FF5B37]" />
                        <h2 className="text-lg font-bold">Manage Companions</h2>
                    </div>
                    <div className="p-8">
                        {loading ? (
                            <div className="flex justify-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5B37]"></div>
                            </div>
                        ) : companions.length === 0 ? (
                            <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-3xl">
                                <p className="text-gray-400 font-medium mb-4">No companions found</p>
                                <button
                                    onClick={() => (window as any).setIsModalOpen?.(true)}
                                    className="text-sm font-bold text-[#FF5B37] hover:underline"
                                >
                                    + Create your first companion
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {companions.map((companion) => (
                                    <div key={companion.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all">
                                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl border border-gray-100">
                                                {companion.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{companion.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-bold text-gray-500 uppercase tracking-tight">
                                                        {companion.subject}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-medium">Topic: {companion.topic}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditCompanion(companion)}
                                                className="flex-1 sm:flex-none p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all flex items-center justify-center gap-2 font-bold text-sm"
                                            >
                                                <Edit2 size={16} />
                                                <span className="sm:hidden">Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCompanion(companion.id)}
                                                className="flex-1 sm:flex-none p-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center justify-center gap-2 font-bold text-sm"
                                            >
                                                <Trash2 size={16} />
                                                <span className="sm:hidden">Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <div className="bg-amber-50 rounded-3xl p-6 flex items-start gap-4 border border-amber-100">
                    <AlertCircle className="text-amber-500 shrink-0 mt-1" size={20} />
                    <div>
                        <p className="text-amber-800 font-bold text-sm mb-1">Privacy Notice</p>
                        <p className="text-amber-700/80 text-xs leading-relaxed font-medium">
                            Your conversations are processed to improve your learning experience. You can delete individual companions or your entire account at any time to remove all associated data from our servers.
                        </p>
                    </div>
                </div>
            </div>

            {selectedCompanion && (
                <CreateCompanionModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedCompanion(null);
                    }}
                    editData={selectedCompanion}
                />
            )}
        </main>
    );
};

export default SettingsPage;
