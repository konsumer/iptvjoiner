import { useRef, useState } from 'react'
import cx from 'classnames'

export default function ButtonChannelAdd ({ className, onSuccess }) {
  const r = useRef()
  const [error, errorSet] = useState()
  const [loading, loadingSet] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    loadingSet(true)
    errorSet()

    loadingSet(false)
  }

  return (
    <>
      <button className={cx('btn btn-outline btn-primary', className)} onClick={() => r.current.showModal()}><span class='w-[24px] h-[24px] icon-[carbon--add-large]' /> New</button>
      <dialog ref={r} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add New Channel</h3>

          {error && (
            <div role='alert' className='alert alert-error mb-2'>
              <span class='w-[24px] h-[24px] icon-[carbon--error-filled]' />
              <span>{error}</span>
            </div>
          )}

          FORM HERE

          <div className='modal-action'>
            <form method='dialog' className='flex gap-2'>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
              <button className='btn' onClick={() => errorSet()}><span class='w-[24px] h-[24px] icon-[carbon--arrow-left]' /> Cancel</button>
              <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <span className='loading loading-spinner' /> : <span class='w-[24px] h-[24px] icon-[carbon--add-large]' />} Add</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
