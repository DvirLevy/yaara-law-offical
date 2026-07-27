import { Input } from 'yaara-law'

export function Default() {
  return <Input type="text" placeholder="שם מלא *" required style={{ maxWidth: 320 }} />
}

export function Email() {
  return <Input type="email" placeholder="דוא״ל" style={{ maxWidth: 320 }} />
}

export function Disabled() {
  return <Input type="text" placeholder="שם מלא *" disabled style={{ maxWidth: 320 }} />
}
