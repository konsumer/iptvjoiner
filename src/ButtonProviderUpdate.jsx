import { useState } from 'react'

export default function ButtonProviderUpdate ({ provider }) {
  const [loading, loadingSet] = useState()

  const doUpdate = async () => {
    loadingSet(true)
    await fetch(`/providers/${provider.id}/update`)
    loadingSet(false)
  }

  return <button disabled={loading} onClick={doUpdate} className='btn btn-outline btn-ghost'>{loading ? <span className='loading loading-spinner' /> : <span class='w-[24px] h-[24px] icon-[carbon--chevron-up-outline]' />} Update</button>
}
