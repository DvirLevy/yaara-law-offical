import { Label, Input, Textarea } from 'yaara-law'

export function NameField() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, maxWidth: 320 }}>
      <Label htmlFor="demo-name">שם מלא</Label>
      <Input id="demo-name" name="name" type="text" placeholder="שם מלא *" required />
    </div>
  )
}

export function MessageField() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, maxWidth: 420 }}>
      <Label htmlFor="demo-msg">הודעה</Label>
      <Textarea id="demo-msg" name="message" placeholder="איך נוכל לעזור?" required />
    </div>
  )
}
