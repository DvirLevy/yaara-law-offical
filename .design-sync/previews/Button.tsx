import { Button } from 'yaara-law'

export function Default() {
  return <Button>קביעת פגישה</Button>
}

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">קביעת פגישה</Button>
      <Button variant="ghost">קראו עוד</Button>
      <Button variant="link">מדיניות הפרטיות</Button>
    </div>
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button size="default">שליחה</Button>
      <Button size="pill">שליחה</Button>
      <Button size="sm">שליחה</Button>
    </div>
  )
}

export function Disabled() {
  return <Button disabled>שליחה</Button>
}
