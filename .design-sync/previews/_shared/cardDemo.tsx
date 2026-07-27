import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from 'yaara-law'

export function FullCard() {
  return (
    <Card style={{ maxWidth: 420, padding: 32 }}>
      <CardHeader>
        <CardTitle style={{ fontSize: 22 }}>ייצוג דיירים בהתחדשות עירונית</CardTitle>
        <CardDescription>ליווי משפטי מלא לאורך כל הפרויקט, משלב החתימה ועד המסירה.</CardDescription>
      </CardHeader>
      <CardContent style={{ marginTop: 16 }}>
        <p style={{ margin: 0, color: 'var(--ink-soft, #5b5650)' }}>
          משרדנו מבטיח שהאינטרסים והזכויות שלכם נשמרים לאורך כל הדרך, מהחתימה על ההסכם ועד קבלת הדירה החדשה.
        </p>
      </CardContent>
      <CardFooter style={{ marginTop: 24 }}>
        <Button size="sm">קביעת פגישה</Button>
      </CardFooter>
    </Card>
  )
}

export function SimpleCard() {
  return (
    <Card style={{ maxWidth: 380, padding: 28 }}>
      <CardHeader>
        <CardTitle style={{ fontSize: 20 }}>נדל״ן ומקרקעין</CardTitle>
        <CardDescription>בדיקת נאותות, חוזי מכר ורכישה, וליווי עסקאות מורכבות.</CardDescription>
      </CardHeader>
    </Card>
  )
}
