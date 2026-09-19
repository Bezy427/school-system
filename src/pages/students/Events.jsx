import { useState, useEffect } from "react";
import LoadingState from "../../components/dashboard/LoadingState";
import SectionCard from "../../components/dashboard/SectionCard";
import { getEvents } from "../../services/api";

export default function StudentEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadEvents() {
            try {
                setLoading(true);

                const data = await getEvents();

                setEvents(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Failed to load events.");
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    School Events
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Keep up with upcoming school events and activities.
                </p>
            </div>

            {loading && <LoadingState />}

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {!loading && events.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {events.map((event) => (
                        <SectionCard key={event.id}>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {event.title}
                            </h2>

                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <p>
                                    <span className="font-medium text-gray-900">
                                        Date:
                                    </span> {" "}
                                    {event.date ?? "-"}
                                </p>

                                <p>
                                    <span className="font-medium text-gray-900">
                                        Time:
                                    </span>{" "}
                                    {event.startTime ?? "-"} -{" "}
                                    {event.endTime ?? "-"}
                                </p>

                                <p>
                                    <span className="font-medium text-gray-900">
                                        Location:
                                    </span>{" "}
                                    {event.lectures ?? "-"}
                                </p>
                                

                                {event.comments && (
                                    <p className="pt-2">
                                        {event.comments}
                                    </p>
                                )}
                            </div>
                        </SectionCard>
                    ))}
                </div>
            )}
        </div>
    )
}