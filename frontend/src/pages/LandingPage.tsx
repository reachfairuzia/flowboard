import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { DashboardSummary } from "../types/Dashboard";
import { getDashboardSummary } from "../services/dashboardService";

const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

function LandingPage() {
    const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);

    const fetchDashboard = async () => {
        try {
            const response = await getDashboardSummary();
            setDashboard(response);
        } catch (error) {
            console.error("Error fetching dashboard summary:", error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#f7f8f3]">
            <nav className="border-b border-gray-200 px-10 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                        FlowBoard
                    </div>
                    <Link
                        to="/dashboard"
                        className="text-sm text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors bg-white"
                    >
                        Open Dashboard →
                    </Link>
                </div>
            </nav>

            <main>
                <section className="mx-auto grid max-w-7xl items-center gap-16 px-10 py-12 lg:grid-cols-2">
                    <div>
                        <p className="mb-3 text-sm font-semibold text-cyan-700">
                            Team & Project Management
                        </p>

                        <p className="mb-5 text-5xl font-bold leading-tight">
                            FlowBoard — Optimize Team Workflows, Effortlessly.
                        </p>

                        <p className="mb-8 max-w-2xl text-lg text-gray-600">
                            FlowBoard helps you manage users, track project status,
                            and monitor progress from one clean dashboard.
                        </p>

                        <Link
                            to="/dashboard"
                            className="inline-block rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
                        >
                            Open Dashboard
                        </Link>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                        <div className="grid grid-cols-3 divide-x divide-gray-200">
                            <div className="p-6">
                                <p className="text-xs text-gray-500 mb-1 whitespace-nowrap">Users</p>
                                <p className="text-3xl font-semibold">{dashboard?.totalUsers ?? 0}</p>
                            </div>
                            <div className="p-6">
                                <p className="text-xs text-gray-500 mb-1 whitespace-nowrap">Projects</p>
                                <p className="text-3xl font-semibold">{dashboard?.totalProjects ?? 0}</p>
                            </div>
                            <div className="p-6">
                                <p className="text-xs text-gray-500 mb-1 whitespace-nowrap">In Progress</p>
                                <p className="text-3xl font-semibold">{dashboard?.inProgressProjects ?? 0}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto grid max-w-7xl gap-16 px-10 pb-12 md:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                            <ChartIcon />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">Project Tracking</h3>
                        <p className="text-sm text-gray-500">
                            Track project status, description, and progress in a simple interface.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                            <ZapIcon />
                        </div>
                        <h3 className="mb-2 text-lg font-bold">Dashboard Summary</h3>
                        <p className="text-sm text-gray-600">
                            View total users, projects, and status counts from the backend API.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                            <UserIcon />
                        </div>
                        <h3 className="mb-2 text-lg font-bold">User Profiles</h3>
                        <p className="text-sm text-gray-600">
                            Manage team member data and display a mocked current user profile.
                        </p>
                    </div>
                </section>
            </main>

            <footer className="mt-auto border-t border-gray-200 px-10 py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <span className="text-xs text-gray-400">© 2026 Fairuzia · FlowBoard</span>
                    <span className="text-xs text-gray-400">Built with React, TypeScript & ASP.NET Core</span>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage;