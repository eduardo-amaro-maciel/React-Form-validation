export default function ErrorMessage({ children}) {
    return (
        <p className="text-red-600 relative">
            {children}
        </p>
    )
}