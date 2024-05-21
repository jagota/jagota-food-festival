'use client'
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
    const { user } = useAuth();
    if (!user)  return null;
    return (
        <div>
            <p>
            Header
            </p>
        </div>
    );
}