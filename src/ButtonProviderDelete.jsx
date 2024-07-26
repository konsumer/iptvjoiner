import { useRef, useState } from 'react'

import IconDelete from './IconDelete'

export default function ButtonProviderDelete({ provider, onSuccess }) {
  const r = useRef()
  const [error, errorSet] = useState()
  const [loading, loadingSet] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    errorSet()
    try {
      loadingSet(true)
      await fetch(`/providers/${provider.id}`, { method: 'DELETE' })
      loadingSet(false)
      r.current.close()
      onSuccess()
    } catch(e) {
      console.error(e)
      errorSet(e.message)
      loadingSet(false)
    }
  }

  return (
    <>
      <button className="btn btn-outline btn-error" onClick={() => r.current.showModal()}><IconDelete /> Delete</button>
      <dialog ref={r} className='modal'>
        <div className='modal-box'>

          {error && (
            <div role="alert" className="alert alert-error mb-2">
              <IconError />
              <span>{error}</span>
            </div>
          )}

          Are you sure you want to delete {provider.name}?

          <div className='modal-action'>
            <form method='dialog' className='flex gap-2'>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
              <button className='btn' onClick={() => errorSet()}>No</button>
              <button className='btn btn-error' onClick={handleSubmit}>{loading ? <span className="loading loading-spinner"></span> : <IconDelete />} Yes</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}