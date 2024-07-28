import { useRef, useState } from 'react'
import cx from 'classnames'

import { randomPort } from './utils.js'

export default function ButtonProviderAdd ({ className, onSuccess }) {
  const r = useRef()
  const [error, errorSet] = useState()
  const [m3u, m3uSet] = useState('')
  const [epg, epgSet] = useState('')
  const [name, nameSet] = useState('')
  const [loading, loadingSet] = useState()
  const [port, portSet] = useState(false)

  const resetForm = () => {
    errorSet()
    loadingSet(false)
    m3uSet('')
    epgSet('')
    nameSet('')
    portSet(false)
  }

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

      const newRecord = await fetch('/providers', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ m3u, epg, name })
      }).then(r => r.json())

      r.current.close()
      onSuccess(newRecord)
      resetForm()
    } catch (e) {
      errorSet(e.message)
      loadingSet(false)
    }
  }

  const handlePortCheck = e => {
    if (e.target.checked) {
      portSet(randomPort())
    } else {
      portSet(false)
    }
  }

  return (
    <>
      <button className={cx('btn btn-outline btn-primary', className)} onClick={() => r.current.showModal()}><span className='w-[24px] h-[24px] icon-[carbon--add-large]' /> New</button>
      <dialog ref={r} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add New Provider</h3>

          {error && (
            <div role='alert' className='alert alert-error mb-2'>
              <span className='w-[24px] h-[24px] icon-[carbon--error-filled]' />
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

          <label className='form-control w-full mt-4'>
            <div className='label'>
              <span className='label-text'>Seperate Homerun for this provider?</span>
            </div>
            <input value={epg} onChange={e => epgSet(e.target.value)} placeholder='XMLTV EPG URL' className='input input-bordered w-full' />
          </label>

          <div className='form-control w-full mt-4'>
            <label className='label cursor-pointer'>
              <span className='label-text'>Seperate Homerun for this provider?</span>
              <input type='checkbox' className='toggle' checked={!!port} onChange={handlePortCheck} />
              {!!port && <input type='number' min='1024' max='49151' step='1' value={port} onChange={e => portSet(e.target.value)} className='input input-bordered w-full ml-2' />}
            </label>
          </div>

          <div className='modal-action'>
            <form method='dialog' className='flex gap-2'>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
              <button className='btn' onClick={resetForm}><span className='w-[24px] h-[24px] icon-[carbon--arrow-left]' /> Cancel</button>
              <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <span className='loading loading-spinner' /> : <span className='w-[24px] h-[24px] icon-[carbon--add-large]' />} Add</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
