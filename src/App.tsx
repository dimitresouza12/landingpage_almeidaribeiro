import { useRef, useState } from 'react'

import {
  ContactChooser,
  type ContactTopic,
} from './components/ContactChooser'
import {
  AreasMarquee,
  AttorneyProfiles,
  ContactSection,
  Faq,
  Footer,
  Header,
  Hero,
  HowItWorks,
} from './components/InstitutionalSections'
import { useLenis } from './lib/useLenis'
import { PracticeExplorer } from './components/PracticeExplorer'

function App() {
  const [topic, setTopic] = useState<ContactTopic>()
  const [chooserOpen, setChooserOpen] = useState(false)
  const mainContentRef = useRef<HTMLElement>(null)

  useLenis()

  function openContact(nextTopic?: ContactTopic) {
    setTopic(nextTopic)
    setChooserOpen(true)
  }

  return (
    <div className="page-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={() => mainContentRef.current?.focus()}
      >
        Pular para o conteúdo
      </a>

      <Header onContact={() => openContact()} />

      <main id="main-content" ref={mainContentRef} tabIndex={-1}>
        <Hero onContact={() => openContact()} />
        <AreasMarquee />
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
