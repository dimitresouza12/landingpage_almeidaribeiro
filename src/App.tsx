import { useState } from 'react'

import {
  ContactChooser,
  type ContactTopic,
} from './components/ContactChooser'
import {
  AttorneyProfiles,
  ContactSection,
  Faq,
  Footer,
  Header,
  Hero,
  HowItWorks,
} from './components/InstitutionalSections'
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

      <Header onContact={() => openContact()} />

      <main id="main-content">
        <Hero onContact={() => openContact()} />
        <PracticeExplorer onContact={openContact} />
        <AttorneyProfiles />
        <HowItWorks />
        <Faq />
        <ContactSection />
      </main>

      <Footer />

      <ContactChooser
        open={chooserOpen}
        onClose={() => setChooserOpen(false)}
        topic={topic}
      />
    </div>
  )
}

export default App
