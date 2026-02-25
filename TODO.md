# Alkapro Library Facilities Flow Update

## Task: Update Library Facilities Flow Section to use API data

### Progress Tracker:

- [x] **Step 1**: Update TypeScript Interface in `src/lib/alkapro-library-api.ts`
  - [x] Add `facilities_flow` interface definition
  - [x] Add `FacilitiesFlowStep` interface
  - [x] Update main `AlkaproLibraryData` interface

- [x] **Step 2**: Update Page Component in `src/app/alkapro-library/page.tsx`
  - [x] Import new icon components (UserPlus, MapPin, ShieldCheck, Key)
  - [x] Update Library Facilities Flow Section to use `data?.facilities_flow`
  - [x] Update icon mapping for new step icons
  - [x] Update fallback data structure
  - [x] Update title and description to use API data

- [ ] **Step 3**: Testing and Verification
  - [ ] Test the changes work correctly
  - [ ] Verify icon mapping displays properly
  - [ ] Confirm API data is being used

### API Data Structure Reference:
```json
"facilities_flow": {
  "title": "Alur Peminjaman Buku",
  "description": "Langkah-langkah mudah untuk peminjaman buku di perpustakaan Alkapro Library",
  "steps": [
    {
      "step_number": "01",
      "title": "Siswa atau peminjam datang langsung ke perpustakaan...",
      "description": "...",
      "icon": "user-plus"
    },
    // ... more steps
  ]
}
