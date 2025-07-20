# Produktkonfigurator (React + TypeScript)

## Testaufgabe für Frontend Developer (React, TypeScript)

### Aufgabenstellung 1: Produktkonfigurator

Implementieren Sie einen Produktkonfigurator:

**Anforderungen:**
- Produktvarianten: Farbe, Größe, Material (insgesamt 3 Kategorien)
- Die Auswahl beeinflusst den Endpreis (z.B.: Rot +10€, Größe XL +15€ usw.)
- Anzeige des Endpreises
- Zustand muss steuerbar sein (über Zustand oder useState)
- Datenstruktur — Array von Objekten mit Varianten

**Extra:**
- Verwenden Sie TypeScript
- Gute Organisation der Komponentenstruktur
- Optimieren Sie Re-Renders (memo/useMemo bei Bedarf)

---

### Aufgabenstellung 2: Tabelle mit Filterung und Zustandsspeicherung

Erstellen Sie eine Benutzertabelle mit folgenden Funktionen:

**Anforderungen:**
- Sortierung nach Name und E-Mail
- Filterung nach Land (Dropdown)
- Speicherung der Filter und Sortierung im localStorage
- Laden der Daten aus einer öffentlichen API oder Mock (z.B. https://jsonplaceholder.typicode.com/users)

**Bonus:**
- Paginierung
- Verwenden Sie useReducer oder Zustand für Filter/Sortierung
- Optimieren Sie das Rendering (React.memo, Virtual Scroll)

---

### Aufgabenstellung 3: Formular mit Validierung und dynamischen Feldern

Erstellen Sie ein Buchungsformular mit folgenden Anforderungen:

**Anforderungen:**
- Felder: Name, E-Mail, Telefon (jeweils mit Validierung)
- Möglichkeit, mehrere Passagiere hinzuzufügen (dynamische Liste: Name + Alter)
- Validierung für jeden Passagier
- Speichern des Formularfortschritts in localStorage
- Unter dem Formular wird eine Liste aller Reservierungen angezeigt (aus localStorage)
- Reservierungen können einzeln gelöscht werden

**Verwenden Sie:**
- React Hook Form oder eigene Lösung
- TypeScript
- Präsentieren Sie Ihre Logik beim Hinzufügen von Passagieren (key, Performance, etc.)

---

## Projektstruktur & Optimierungen
- Zustand-Management mit [Zustand](https://github.com/pmndrs/zustand)
- Typisierung aller Datenstrukturen
- Komponenten sind mit React.memo und useMemo optimiert falls nötig

---

## Starten des Projekts

```bash
npm install
npm start
```

Die App läuft dann auf [http://localhost:3000](http://localhost:3000)
