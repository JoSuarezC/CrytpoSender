const Loader = () => {
  return (
    <div className="flex justify-center items-center py-3">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700">
        <p className="sr-only" role="alert">
          Loading. Please wait
        </p>
      </div>
    </div>
  )
}

export default Loader