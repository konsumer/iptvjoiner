import { useRef, useState } from 'react'
import cx from 'classnames'

export default function ButtonProviderEdit ({ className, provider, onSuccess }) {
  const r = useRef()
  const [error, errorSet] = useState()
  const [m3u, m3uSet] = useState(provider.m3u || '')
  const [epg, epgSet] = useState(provider.epg || '')
  const [name, nameSet] = useState(provider.name || '')
  const [loading, loadingSet] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    errorSet()
    try {
      if (!name) {
        throw new Error('Name is required.')
      }

      if (!m3u) {
        throw new Error('M3U URL is required.')
      }

      loadingSet(true)
      const newRecord = await fetch(`/providers/${provider.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ m3u, epg, name })
      }).then(r => r.json())
      r.current.close()
      onSuccess(newRecord)
      loadingSet(false)
      m3uSet('')
      epgSet('')
      nameSet('')
    } catch (e) {
      loadingSet(false)
      errorSet(e.message)
    }
  }

  return (
    <>
      <button className={cx('btn btn-outline btn-secondary', className)} onClick={() => r.current.showModal()}><span class='w-[24px] h-[24px] icon-[carbon--edit]' /> Edit</button>
      <dialog ref={r} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Edit Provider</h3>

          {error && (
            <div role='alert' className='alert alert-error mb-2'>
              <span class='w-[24px] h-[24px] icon-[carbon--error-filled]' />
              <span>{error}</span>
            </div>
          )}

          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Name</span>
            </div>
            <input value={name} onChange={e => nameSet(e.target.value)} placeholder='Name of this provider' className='input input-bordered w-full' />
          </label>

          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>M3U URL</span>
            </div>
            <input value={m3u} onChange={e => m3uSet(e.target.value)} placeholder='M3U URL' className='input input-bordered w-full' />
          </label>

          <label className='form-control w-full mt-4'>
            <div className='label'>
              <span className='label-text'>EPG URL</span>
            </div>
            <input value={epg} onChange={e => epgSet(e.target.value)} placeholder='XMLTV EPG URL' className='input input-bordered w-full' />
          </label>

          <div className='modal-action'>
            <form method='dialog' className='flex gap-2'>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
              <button className='btn' onClick={() => errorSet()}><span class='w-[24px] h-[24px] icon-[carbon--arrow-left]' /> Cancel</button>
              <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <span className='loading loading-spinner' /> : <span class='w-[24px] h-[24px] icon-[carbon--edit]' />} Save</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
