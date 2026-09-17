export default function Unauthorized() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="text-center">
                <p className="text-sm font-medium text-red-600">
                    403
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                    Access Denied
                </h1>

                <p className="mt-3 text-gray-500">
                    You don't have permission to access this page.
                </p>
            </div>
        </main>
    )
}