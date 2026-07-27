import { Textarea } from 'yaara-law'

export function Default() {
  return <Textarea placeholder="איך נוכל לעזור?" required style={{ maxWidth: 420 }} />
}

export function Disabled() {
  return <Textarea placeholder="איך נוכל לעזור?" disabled style={{ maxWidth: 420 }} />
}
