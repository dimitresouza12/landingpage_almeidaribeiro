import { useState } from 'react'

import {
  ContactChooser,
  type ContactTopic,
} from './components/ContactChooser'
import { PracticeExplorer } from './components/PracticeExplorer'

function App() {
  const [topic, setTopic] = useState<ContactTopic>()
  const [chooserOpen, setChooserOpen] = useState(false)

  function openContact(nextTopic?: ContactTopic) {
    setTopic(nextTopic)
    setChooserOpen(true)
  }

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>

      <main id="main-content">
        <h1>Advocacia para pessoas e empresas.</h1>
        <button type="button" onClick={() => openContact()}>
          Entrar em contato
        </button>
        <PracticeExplorer onContact={openContact} />
      </main>

      <ContactChooser
        open={chooserOpen}
        onClose={() => setChooserOpen(false)}
        topic={topic}
      />
    </div>
  )
}

export default App
