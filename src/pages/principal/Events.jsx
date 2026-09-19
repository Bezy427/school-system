import { useState, useEffect, useMemo } from "react";
import { getEvents, createEvent, deleteEvent } from "../../services/api";
import EventForm from "../../components/events/EventForm";
import EventTable from "../../components/events/EventTable";
import SectionCard from "../../components/dashboard/SectionCard";
import LoadingState from "../../components/dashboard/LoadingState";

const initialForm = {
    title: "",
    lectures: "",
    date: "",
    startTime: "",
    endTime: "",
    comments: "",
};

export default function Exams() {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const [form, setForm] = useState(true);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {
        loadEvents();
    }, []);
    
    async function loadEvents() {
        try {
            setLoading(true);
            setError("");

            const data = await getEvents();
            
            setEvents(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "Failed to load events.");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function openCreateForm() {
        setEditingEvent(null);
        setForm(initialForm);
        setError("");
        setShowForm(true);
    }

    function closeForm() {
        if (saving) return;

        setShowForm(false);
        setEditingEvent(null);
        setForm(initialForm);
    }

    function openEditForm(event) {
        setEditingEvent(event);

        setForm({
            title: event.title || "",
            lectures: event.lectures || "",
            date: event.date || "",
            startTime: event.startTime || "",
            endTime: event.endTime || "",
            comments: event.comments || "",
        });

        setShowForm(true);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setSaving(true);
        setError("");

        try {
            if (editingEvent) {
                throw new Error(
                    "Event updates are not available because the documented backend API does not provide an update endpoint."
                );
            }

            const eventData = {
                title: form.title,
                lectures: form.lectures,
                date: form.date,
                startTime: form.startTime,
                endTime: form.endTime,
                comments: form.comments,
            };

            const createdEvent = await createdEvent(eventData);

            if (createdEvent) {
                setEvents((current) => [...current, createdEvent]);
            } else {
                await loadEvents();
            }

            setForm(initialForm);
            setShowForm(false);
            setEditingEvent(null);
        } catch (err) {
            setError(err.message || "Failed to save event.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) return;

        setDeletingId(id);
        setError("");

        try {
            await deleteEvent(id);

            setEvents((event) => 
                current.filter((event) => event.id !== id)
            );
        } catch (err) {
            setError(err.message || "Failed to delete event.");
        } finally {
            setDeletingId(null);
        }
    }

    const filteredEvent = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) return events;
                  
        return events.filter((event) => {
            return [
                event.title,
                event.lectures,
                event.date,
                event.startTime,
                event.endTime,
                event.startTime,
                event.comments,
            ]
                .filter(Boolean)
                .some((value) => 
                    String(value).toLowerCase().includes(query)
                );
        });
    }, [events, searchTerm]);

    if (loading) {
        return <LoadingState />
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Events
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage school events and schedules.
                    </p>
                </div>

                {!showForm && (
                    <button
                        type="button"
                        onClick={openCreateForm}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        Add Event
                    </button>
                )}
            </div>

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {showForm && (
                    <EventForm  
                        form={form}
                        onChange={handleChange}
                        onSubmit={handleSubmit} 
                        onCancel={closeForm} 
                        saving={saving}
                        edting={Boolean(editingEvent)}
                    />
                )}

                {!showForm && (
                    <SectionCard title="All Events">
                        <div className="mb-5">
                            <input 
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search events..."
                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                            />
                        </div>

                        {loading ? (
                            <LoadingState message="Loading events..." />
                        ) : (
                            <EventTable
                                events={filteredEvent}
                                onDelete={handleDelete}
                                deletingId={deletingId} 
                            />
                        )}
                    </SectionCard>
                )}
        </div>
    );
}    