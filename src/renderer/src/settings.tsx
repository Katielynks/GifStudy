import './assets/main.css'
import './assets/settings.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

type SettingFieldProps = {
  label: string
  children: React.ReactNode
}

function SettingField({ label, children }: SettingFieldProps): React.JSX.Element {
  return (
    <div className="setting-field">
      <label>{label}</label>
      {children}
    </div>
  )
}

type ModeCardProps = {
  title: string
  gifLabel: string
  soundLabel: string
  children: React.ReactNode
}

function ModeCard({
  title,
  gifLabel,
  soundLabel,
  children
}: ModeCardProps): React.JSX.Element {
  return (
    <section className="mode-card">
      <h2>{title}</h2>

      <div className="setting-grid">{children}</div>

      <div className="gif-layout">
        <div className="gif-controls">
          <SettingField label={gifLabel}>
            <input type="file" accept="image/gif,image/*" />
          </SettingField>

          <SettingField label="GIF width (percentage)">
            <input type="number" defaultValue={100} min={10} max={200} />
          </SettingField>

          <SettingField label="GIF height (percentage)">
            <input type="number" defaultValue={100} min={10} max={200} />
          </SettingField>
        </div>

        <div className="gif-preview-box"></div>
      </div>

      <SettingField label={soundLabel}>
        <input type="file" accept="audio/*" />
      </SettingField>
    </section>
  )
}

function SettingsApp(): React.JSX.Element {
  return (
    <main className="settings-page">
      <section className="settings-header">
        <h1>Study Shift</h1>
        <p>Customize the GIF, sound, size, and timer for each mode</p>
      </section>

      <ModeCard title="Study mode" gifLabel="Study GIF" soundLabel="Study sound">
        <SettingField label="Study duration, minutes">
          <input type="number" defaultValue={25} min={1} />
        </SettingField>

        <SettingField label="Break duration, minutes">
          <input type="number" defaultValue={5} min={1} />
        </SettingField>
      </ModeCard>

      <ModeCard title="Break mode" gifLabel="Break GIF" soundLabel="Break sound">
        <SettingField label="Break duration, minutes">
          <input type="number" defaultValue={5} min={1} />
        </SettingField>
      </ModeCard>

      <ModeCard title="Sleep time" gifLabel="Sleep GIF" soundLabel="Sleep sound">
        <SettingField label="Sleep time begin">
          <input type="time" defaultValue="22:00" />
        </SettingField>

        <SettingField label="Sleep time end">
          <input type="time" defaultValue="07:00" />
        </SettingField>
      </ModeCard>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsApp />
  </StrictMode>
)