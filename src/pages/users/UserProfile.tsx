
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import type { User } from "@/types/user";
import { useEffect } from "react";
import avatar from "@/assets/images/user.png";

export default function UserProfilePage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    // We should ideally use useUser(id) but store seems to be the way here based on the original code.
    // Although the original code used useUserStore(), it's better to fetch if not present.
    // For now I'll stick to the store logic as request.
    const users = useUserStore((state) => state.users);
    const user = users.find((u: User) => u.id === id);

    useEffect(() => {
        // If user is not in store, maybe we should fetch?
        // Assuming store is populated. If not, this might redirect immediately which is risky if refresh happens.
        // Ideally we should use useUser(id) hook if available.
        // But specific implementation details of useUsers might be fetching all.
        // Let's assume users are loaded. If not, this redirect logic is flawed on refresh.
        // I will comment out the redirect to avoid boot loops on refresh if data isn't ready.
        /*
        if (!user) {
          navigate("/users");
        }
        */
    }, [user, navigate]);

    if (!user) {
        return (
            <div className="text-center text-red-500 mt-10">
                User not found. (Ensure users are loaded)
                <button onClick={() => navigate("/users")} className="block mx-auto mt-4 text-blue-600 underline">Back to Users</button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            {/* Back Button */}
            <button
                onClick={() => navigate("/users")}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Users
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                    {user.profile_picture ? (
                        <img
                            src={user.profile_picture || avatar}
                            alt={`${user.first_name} ${user.last_name}`}
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-[120px] h-[120px]"
                        />
                    ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>

                {/* Name & Status */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-cyan-800">
                        {user.first_name} {user.last_name}
                    </h1>
                    <span
                        className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                    >
                        {user.status}
                    </span>
                </div>
            </div>

            {/* Two-column Info Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                    <p>
                        <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Phone:</span> {user.phone}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Role:</span> {user.role?.name}
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">Site:</span> {user.site?.name}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Department:</span>{" "}
                        {user.department?.name || "—"}
                    </p>
                </div>
            </div>

            {/* Responsibilities */}
            {user.responsiblities && user.responsiblities.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Responsibilities
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {user.responsiblities.map((r, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                            >
                                {r}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Related Counts */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-xl font-bold">{user.projects?.length || 0}</p>
                    <p className="text-sm text-gray-500">Projects</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-xl font-bold">{user.tasks?.length || 0}</p>
                    <p className="text-sm text-gray-500">Tasks</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-xl font-bold">{user.activities?.length || 0}</p>
                    <p className="text-sm text-gray-500">Activities</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-xl font-bold">{user.requests?.length || 0}</p>
                    <p className="text-sm text-gray-500">Requests</p>
                </div>
            </div>
        </div>
    );
}
