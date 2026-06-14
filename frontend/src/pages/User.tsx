import { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/UserService";
import type { User, UserPayload } from "../types/User";

function UserPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [form, setForm] = useState<UserPayload>({
        name: "",
        email: "",
        bio: "",
        avatar_url: "",
    });

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleCreate = async () => {
        setEditUser(null);
        setForm({
            name: "",
            email: "",
            bio: "",
            avatar_url: "",
        });
        setIsFormOpen(true);
    };

    const handleEdit = async (user: User) => {
        setEditUser(user);
        setForm({
            id: user.id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            avatar_url: user.avatarUrl,
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        const cfmed = confirm("Delete this user?")
        if (!cfmed) return;

        await deleteUser(id);
        await fetchUsers();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editUser) {
            await updateUser(form)
        } else {
            await createUser(form)
        }

        setIsFormOpen(false);
        await fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="w-full">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Team Members</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage users and their profile information.
                    </p>
                </div>

                <button
                    onClick={handleCreate}
                    className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white md:w-auto"
                >
                    Add User
                </button>
            </div>

            {users.length === 0 && !isFormOpen ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 12h18M3 17h18" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-700">No users found.</p>
                    <p className="mt-1 text-xs text-gray-400">Add your first team member to get started.</p>
                </div>
            ) : (
                !isFormOpen && (
                    <div className="space-y-3">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[auto_1fr_1.5fr_2fr_auto] md:items-center hover:bg-gray-100 rounded-md transition-colors">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-500 text-lg font-semibold text-white">
                                    {user.avatarUrl ? (
                                        <img
                                            src={user.avatarUrl}
                                            alt={user.name}
                                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        user.name.charAt(0)
                                    )}
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-slate-400 md:hidden">Name</p>
                                    <p className="font-semibold text-slate-900">{user.name}</p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-slate-400 md:hidden">Email</p>
                                    <p className="text-sm text-slate-600">{user.email}</p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-slate-400 md:hidden">Bio</p>
                                    <p className="text-sm text-slate-600">{user.bio || "No bio provided"}</p>
                                </div>

                                <div className="flex gap-2 md:justify-end">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            {isFormOpen && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold text-slate-900">
                        {editUser ? "Edit User" : "Add User"}
                    </h2>

                    {
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Name" className="w-full rounded-lg border border-slate-200 px-3 py-2"
                                required
                            />
                            <input
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="Email"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                                required
                            />
                            <input
                                value={form.bio}
                                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                placeholder="Bio"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                            />
                            <input
                                value={form.avatar_url}
                                onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
                                placeholder="Avatar Url"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                            />
                            <div className="flex gap-2">
                                <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="rounded-lg bg-slate-900 px-4 py-2 text-white">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    }
                </div>
            )}
        </div>
    );
}

export default UserPage;