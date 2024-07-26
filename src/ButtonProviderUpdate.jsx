import { useState } from 'react'

import IconUpdate from './IconUpdate'

export default function ButtonProviderUpdate ({ provider }) {
  const [loading, loadingSet] = useState()

  const doUpdate = async () => {
    loadingSet(true)
    await fetch(`/providers/${provider.id}/update`)
    loadingSet(false)
  }

  return <button onClick={doUpdate} className='btn btn-outline btn-ghost'>{loading ? <span className='loading loading-spinner' /> : <IconUpdate />} Update</button>
}
