import SectionCard from "../../components/dashboard/SectionCard";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    My Profile
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View your account information.
                </p>
            </div>

            <SectionCard title="Account Information">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-500">
                            Username
                        </p>

                        <p className="mt-1 font-medium text-gray-900">
                            {user?.username || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Role
                        </p>

                        <p className="mt-1 font-medium text-gray-900">
                            {user?.role || "STUDENT"}
                        </p>
                    </div>
                </div>
            </SectionCard>
        </div>
    )
}