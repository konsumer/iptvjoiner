import { useRef, useState } from 'react'

export default function ButtonProviderDelete ({ provider, onSuccess }) {
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
    } catch (e) {
      console.error(e)
      errorSet(e.message)
      loadingSet(false)
    }
  }

  return (
    <>
      <button className='btn btn-outline btn-error' onClick={() => r.current.showModal()}><span class='w-[24px] h-[24px] icon-[carbon--delete]' /> Delete</button>
      <dialog ref={r} className='modal'>
        <div className='modal-box'>

          {error && (
            <div role='alert' className='alert alert-error mb-2'>
              <span class='w-[24px] h-[24px] icon-[carbon--error-filled]' />
              <span>{error}</span>
            </div>
          )}

          Are you sure you want to delete {provider.name}?

          <div className='modal-action'>
            <form method='dialog' className='flex gap-2'>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
              <button className='btn' onClick={() => errorSet()}><span class='w-[24px] h-[24px] icon-[carbon--arrow-left]' /> No</button>
              <button disabled={loading} className='btn btn-error' onClick={handleSubmit}>{loading ? <span className='loading loading-spinner' /> : <span class='w-[24px] h-[24px] icon-[carbon--delete]' />} Yes</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
