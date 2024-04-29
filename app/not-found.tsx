import Link from "next/link"

function NotFoundPage() {
	return (
        <main className="flex h-dvh flex-col p-6">
            <div className="flex w-full h-dvh rounded-lg items-center justify-items-center bg-slate-200 shadow-lg p-4">
                <div className="w-full flex flex-col items-center justify-items-center">
                    <h1 className="text-2xl">Page not found: 404</h1>
                    <Link href="/" className="text-xl text-blue-500 underline">Home</Link>
                </div>
            </div>
        </main>
    )
}

export default NotFoundPage