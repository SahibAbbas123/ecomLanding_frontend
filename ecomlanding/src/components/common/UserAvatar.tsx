//this is /Users/sahibabc/ecomLanding/ecomlanding/src/components/common/UserAvatar.tsx
"use client";
import { User } from "lucide-react";
import { getInitials, getAvatarColor } from "../../lib/utils/avatar";
import { motion, AnimatePresence } from "framer-motion";

export default function UserAvatar({ user, size = 32 }) {
    if (!user)
        return (
            <span className="inline-flex items-center justify-center rounded-full bg-gray-100" style={{ width: size, height: size }}>
                <User className="text-gray-400" style={{ width: size * 0.7, height: size * 0.7 }} />
            </span>
        );
    if (user.avatarUrl) {
        return (
            <span className="inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-100" style={{ width: size, height: size }}>
                <img src={user.avatarUrl} alt="Profile" className="object-cover w-full h-full" />
            </span>
        );
    }
    const initials = getInitials(user.name || user.email);
    const color = getAvatarColor(user.email);
    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={user.email}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="inline-flex items-center justify-center rounded-full font-bold text-white"
                style={{ background: color, width: size, height: size }}
            >
                {initials}
            </motion.span>
        </AnimatePresence>
    );
}