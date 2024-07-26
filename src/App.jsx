import { useState, useEffect } from 'react'
import cx from 'classnames'

import ButtonChannelAdd from './ButtonChannelAdd'
import ButtonProviderAdd from './ButtonProviderAdd'
import ButtonProviderUpdate from './ButtonProviderUpdate'
import ButtonProviderDelete from './ButtonProviderDelete'
import ButtonProviderEdit from './ButtonProviderEdit'

function PageProviders () {
  const [providers, providersSet] = useState([])

  const updateProviders = () => fetch('/providers').then(r => r.json()).then(providersSet)

  useEffect(() => {
    updateProviders()
  }, [])

  return (
    <>
      <ButtonProviderAdd className='mb-4' onSuccess={updateProviders} />
      <div className={cx('grid gap-4 grid-cols-1', { 'lg:grid-cols-2': providers?.length > 1 })}>
        {providers.map(p => (
          <div key={p.id} className='card bg-neutral text-neutral-content'>
            <div className='card-body'>
              <h2 className='card-title'>{p.name}</h2>
              <div className='card-actions justify-end'>
                <ButtonProviderUpdate provider={p} />
                <ButtonProviderDelete provider={p} onSuccess={updateProviders} />
                <ButtonProviderEdit provider={p} onSuccess={updateProviders} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function PageChannels () {
  const [channels, channelsSet] = useState([])

  const updateChannels = () => fetch('/channels').then(r => r.json()).then(channelsSet)

  useEffect(() => {
    updateChannels()
  }, [])

  return (
    <>
      <ButtonChannelAdd />
    </>
  )
}

function App () {
  const [tab, tabSet] = useState(0)

  return (
    <>
      <div className='navbar bg-base-100'>
        <a className='m-2 text-6xl cursor-pointer' hre='/'>iptvjoiner</a>
      </div>
      <div className='m-4'>
        <div role='tablist' className='tabs tabs-bordered'>
          <a role='tab' className={cx('tab', { 'tab-active': tab === 0 })} onClick={() => tabSet(0)}>Providers</a>
          <a role='tab' className={cx('tab', { 'tab-active': tab === 1 })} onClick={() => tabSet(1)}>Channels</a>
        </div>
      </div>
      <div className='p-2 mx-2'>
        {tab === 0 && <PageProviders />}
        {tab === 1 && <PageChannels />}
      </div>
    </>
  )
}

export default App
