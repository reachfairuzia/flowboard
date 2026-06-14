import {useState, useEffect} from "react";
import {getProfile} from "../services/ProfileService";
import type {User} from "../types/User";

function ProfilePage(){
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setProfile(response);
            } catch(error){
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
    return <div className="p-6">Loading profile...</div>;
    }
    return (
        <div className="space-y-6 bg-[#f7f8f3]">
            <h1 className="text-2xl font-bold text-gray-900">
                Your Profile - {profile.name}
            </h1>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col items-center text-center">
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl}
                                alt={`${profile.name}'s avatar`}
                                className="mb-4 h-24 w-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-500 text-6xl font-semibold text-white">
                            {profile.name.charAt(0)}
                        </div>
                        )}
                        

                        <h2 className="mt-2 text-xl font-semibold text-slate-900">
                            {profile.name}
                        </h2>
                        <p className="text-sm text-slate-600">{profile.email}</p>
                        <p className="mt-1 text-sm text-slate-500">{profile.bio}</p>
                    </div>
                </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <h2 className="mb-4 text-xl font-semibold text-slate-900">
                            Edit Profile
                        </h2>

                        <form className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    value = {profile.name}
                                    readOnly
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    value = {profile.email}
                                    readOnly
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Bio
                                </label>
                                <textarea
                                    value = {profile.bio ?? ""}
                                    readOnly
                                    placeholder="Add a short bio about yourself"
                                    rows={5}
                                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                type="button"
                                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            <p className="text-sm text-gray-600">
                *Using mocked user. Profile editing is disabled (no auth implemented)
            </p>
         </div>
    )
}

export default ProfilePage;