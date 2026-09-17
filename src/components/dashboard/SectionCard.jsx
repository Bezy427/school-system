export default function SectionCard({ title, children, action }) {
    return (
        <section className="rounded-xl border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-5 py-4">
                <h2 className="font-semibold text-gray-900">
                    {title}
                </h2>

                {action}
            </div>

            <div className="p-5">
                {children}
            </div>
        </section>
    );
}