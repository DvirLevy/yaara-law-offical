import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Button,
} from 'yaara-law'

export function OpenDialog() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="link">מדיניות הפרטיות</Button>
      </DialogTrigger>
      <DialogContent style={{ maxWidth: 480 }}>
        <DialogHeader>
          <div>
            <DialogTitle>מדיניות פרטיות</DialogTitle>
            <DialogDescription>משרד עורכי דין יערה לוי</DialogDescription>
          </div>
        </DialogHeader>
        <div style={{ padding: '20px 32px', color: '#5b5650', lineHeight: 1.7 }}>
          המידע שתמסרו בטופס יצירת הקשר משמש את המשרד בלבד לצורך מתן מענה לפנייתכם, ולא יועבר לצד שלישי.
        </div>
        <DialogFooter>
          <Button size="sm">הבנתי</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
