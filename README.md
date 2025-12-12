# 🗓️ Local Storage Scheduler
<img width="556" height="106" alt="image" src="https://github.com/user-attachments/assets/7c2a9504-74fe-4239-84a4-cdf306eedc8f" />

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-111827?style=for-the-badge&logo=radixui&logoColor=white)

> Privacy‑first, offline‑capable schedule management app for students.  
> Built with **Next.js + React + TailwindCSS + shadcn/ui**.  
> 100% client‑side, no accounts, no tracking, manage date via JSON.

---

# 📔 Table of Contents
- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Data Management](#data-management)
- [Subject Management](#subject-management)
- [Schedule Table Management](#schedule-table-management)
- [Time Slot Management](#time-slot-management)
- [Conflict Detection](#conflict-detection)
- [Text Generation & Export](#text-generation--export)
- [Accessibility Features](#accessibility-features)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Contribution](#contribution)

---

## 📖 Overview
<details>
<summary>Click to expand</summary>

**Local Storage Scheduler** is a privacy‑first, offline‑capable schedule management application designed for students.  
All data is stored in the browser’s `localStorage`.

**Philosophy:**
- 🔒 Your data, your control
- ⚠️ Conflict‑first design
- ♿ Accessibility‑focused
- 📤 Export freedom (JSON import/export)

</details>

---

## 🧩 Core Concepts
<details>
<summary>Click to expand</summary>



### Subjects
- Name, Stub Code, Color, Default Teacher, Default Room

  <img width="1674" height="876" alt="image" src="https://github.com/user-attachments/assets/527e6cff-bdaa-43c4-976d-0b5df8271f2a" />


### Schedule Tables
- Name, Creation date, Last updated, Collection of time slots

  
  <img width="1576" height="644" alt="image" src="https://github.com/user-attachments/assets/fa2cabb7-b85c-4404-b9ce-a57a79d08d03" />

### Time Slots
- Day, Start/End time, Subject, Room, Teacher, Notes


  <img width="687" height="699" alt="image" src="https://github.com/user-attachments/assets/009a57e2-f40e-4e4b-8391-b4ac19811d62" />


</details>

---

## 📂 Data Management
<details>
<summary>Click to expand</summary>
  <img width="285" height="178" alt="image" src="https://github.com/user-attachments/assets/a2ca0613-8eb6-4307-a4fe-56bf0973f7b5" />

<img width="432" height="127" alt="image" src="https://github.com/user-attachments/assets/7c1ed6ec-9a1b-440e-89e5-fe62663c0700" />

- **Import Data**: Upload JSON, validate, confirm overwrite  
- **Export Data**: Download JSON backup (`scheduler-data-YYYY-MM-DD.json`)  
- **Clear All Data**: Wipe everything with confirmation  

</details>

---

## 📚 Subject Management
<details>
<summary>Click to expand</summary>
<img width="1092" height="588" alt="image" src="https://github.com/user-attachments/assets/952e0879-e3a7-4733-817e-ec4114435fb3" />

- Create, Edit, Delete subjects  
- Color palette (orange, teal, purple, pink)  
- Subject cards show name, stub, teacher, room  

</details>

---

## 📅 Schedule Table Management
<details>
<summary>Click to expand</summary>
<img width="547" height="278" alt="image" src="https://github.com/user-attachments/assets/8d849b24-a564-479c-b17c-0442f4945e5c" />


- Create new schedules (semester, quarter, session)  
- Switch via dropdown  
- Edit names, delete schedules (with confirmation)  

</details>

---

## ⏰ Time Slot Management
<details>
<summary>Click to expand</summary>
<img width="1533" height="613" alt="image" src="https://github.com/user-attachments/assets/f0b99c51-1062-418a-9e1a-19608a590537" />

- Grid layout: Time (vertical), Days (horizontal)  
- Add/Edit/Delete slots with validation  
- Conflicts checked automatically  

</details>

---

## ⚠️ Conflict Detection
<details>
<summary>Click to expand</summary>
<img width="383" height="570" alt="image" src="https://github.com/user-attachments/assets/c261cbc2-fbba-403a-92ea-406ff9b4becd" />

- Overlaps on same day = conflict  
- Visual indicators: red background, warning icon  
- Conflict counter at top  
- Workflow: edit times/days to resolve  

</details>

---

## 📝 Text Generation & Export
<details>
<summary>Click to expand</summary>
<img width="657" height="802" alt="image" src="https://github.com/user-attachments/assets/aab9d014-fd71-4807-9698-fe0d89dba27d" />

- **Detailed Format** (multi‑line)  
- **Inline Format** (compact)  
- Options: toggle room/teacher/codes/notes, time format, spacing  
- Actions: Copy to clipboard, Download `.txt`  
- Live preview  

</details>

---

## ♿ Accessibility Features
<details>
<summary>Click to expand</summary>
<img width="1271" height="553" alt="image" src="https://github.com/user-attachments/assets/fbf0d01e-7fd4-4e6d-bd41-1b36754f4dda" />

- Font size adjustment (small → extra large)  
- High contrast mode (WCAG AAA)  
- Reduced motion (no animations)  
- Screen reader support (ARIA, semantic HTML, NVDA/JAWS/VoiceOver tested)  

</details>

---

## ⌨️ Keyboard Shortcuts
<details>
<summary>Click to expand</summary>

| Shortcut | Action |
|----------|--------|
| Alt+1 | Schedule tab |
| Alt+2 | Subjects tab |
| Alt+3 | Guide tab |
| Alt+4 | Settings tab |
| Ctrl/⌘+K | Keyboard shortcuts dialog |
| Esc | Close dialog |
| Tab / Shift+Tab | Navigate |
| Enter | Activate |
| Space | Toggle |

</details>

---

## 🤝 Contribution
<details>
<summary>Click to expand</summary>

### Getting Started
- Fork the repo, clone, install dependencies, run dev build.  
- Report issues with browser/version, repro steps, screenshots, console errors.  
- Submit feature PR requests with description, use case, mockups.

### Technical Details
- **Frameworks**: Next.js 16, React 19.2, TypeScript  
- **Styling**: TailwindCSS v4, shadcn/ui, dark mode orange accent  
- **State**: Context API + localStorage
- **Libraries**: date-fns, lucide-react, sonner  
- **Storage**: `localStorage` key `scheduler-app-state`  
- **Components**: `/components/subjects/*`, `/components/schedule/*`, `/components/settings/*`   
- **Performance**: Lazy loading, memoization, debounced writes, virtual scrolling  
- **Future Enhancements**: Themes, drag‑and‑drop, iCal export, conflict resolution suggestions  

### License
MIT License — open source, free to use and contribute.

</details>

---
