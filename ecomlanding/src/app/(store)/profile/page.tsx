//this is /Users/sahibabc/ecomLanding/ecomlanding/src/app/profile/page.tsx
"use client";
import { useAuthStore } from "../../../lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import UserAvatar from "../../../components/common/UserAvatar";
import { toast } from "sonner";
import ConfirmModal from "../../../components/common/ConfirmModal";
import AddressBook from "../../../components/profile/AddressBook";
import ChangePassword from "../../../components/profile/ChangePassword";

export default function ProfilePage() {
    const { user, setAvatar, removeAvatar, logout } = useAuthStore();
    const [name, setName] = useState(user?.name ?? "");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pwOpen, setPwOpen] = useState(false);

    if (!user) {
        router.replace("/");
        return null;
    }

    return (
        <div className="max-w-lg mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
            <div className="flex flex-col items-center gap-4 mb-8">
                <UserAvatar user={user} size={72} />
                <button
                    className="text-sm text-teal-600 hover:underline"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Change Profile Photo
                </button>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                                if (ev.target?.result) setAvatar(ev.target.result as string);
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />
                {user.avatarUrl && (
                    <button
                        className="text-sm text-gray-500 hover:underline"
                        onClick={removeAvatar}
                    >
                        Remove Profile Photo
                    </button>
                )}
            </div>
            <form
                className="space-y-4"
                onSubmit={e => { e.preventDefault(); setConfirmOpen(true); }}
            >
                <div>
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                        className="w-full border rounded px-4 py-2"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        className="w-full border rounded px-4 py-2 bg-gray-100"
                        type="email"
                        value={user.email}
                        readOnly
                        disabled
                    />
                </div>
                <button
                    type="button"
                    onClick={() => setPwOpen(true)}
                    className="text-teal-600 hover:underline text-sm"
                >
                    Change Password
                </button>
                {pwOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                        <div className="bg-white rounded-xl p-6">
                            <ChangePassword onClose={() => setPwOpen(false)} />

                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white font-semibold rounded px-4 py-2 hover:bg-teal-700 transition"
                >
                    Save Changes
                </button>
            </form>

            <ConfirmModal
                open={confirmOpen}
                title="Save changes?"
                message="Are you sure you want to update your profile information?"
                onConfirm={() => {
                    useAuthStore.setState(prev => ({
                        user: prev.user ? { ...prev.user, name } : null,
                    }));
                    setConfirmOpen(false);
                    toast.success("Profile updated!");
                }}
                onCancel={() => setConfirmOpen(false)}
            />
            {/* <AddressBook></AddressBook> */}
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <
                    button
                    onClick={() => router.push('/profile/orders')}
                    className="w-full bg-teal-600 text-white font-semibold rounded px-4 py-2 hover:bg-teal-700 transition"
                >
                    View Order History
                </button>
            </div>

            <div className="mt-8 text-center">
                <button
                    className="text-red-500 hover:underline"
                    onClick={() => { logout(); router.replace("/"); toast("Signed out!", { icon: "👋" }); }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}