import * as React from 'react'
import { Checkbox } from 'yaara-law'

export function Default() {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#5b5650' }}>
      <Checkbox />
      <span>קראתי את מדיניות הפרטיות ומסכים/ה לקבל עדכונים מהמשרד</span>
    </label>
  )
}

export function Checked() {
  const [checked, setChecked] = React.useState(true)
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#5b5650' }}>
      <Checkbox checked={checked} onCheckedChange={(c) => setChecked(c === true)} />
      <span>קראתי את מדיניות הפרטיות ומסכים/ה לקבל עדכונים מהמשרד</span>
    </label>
  )
}

export function Disabled() {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#5b5650' }}>
      <Checkbox disabled />
      <span>קראתי את מדיניות הפרטיות ומסכים/ה לקבל עדכונים מהמשרד</span>
    </label>
  )
}
