import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="w-full h-full min-h-40 grid place-content-center text-center">
      <LoaderCircle className="animate-spin mx-auto" />
      Loading...
    </div>
  )
}

export default Loader