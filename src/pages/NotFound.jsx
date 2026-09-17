export default function NotFound() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="items-center">
                <p className="text-sm font-medium text-gray-500">
                    404
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                    Page not found
                </h1>

                <p className="mt-2 text-gray-500">
                    The page you're looking for doesn't exist. You may have mistyped the address, or the page may have moved.
                </p>
            </div>
        </main>
    )
}