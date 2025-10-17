# NexusTimer – Test Coverage Summary

## Prehľad vykonaných zmien

- Pridal som nové jednotkové testy pre vybrané časti programu, ktoré neboli dostatočne pokryté.
- Testy sú rozdelené do viacerých samostatných súborov pre lepšiu prehľadnosť a údržbu.
- V testoch som využil techniky test doubles (mock, stub), kde to bolo vhodné.
- Opravil som existujúce testy a mocky tak, aby boli užitočné a funkčné.
- Všetky testy aktuálne prechádzajú bez chýb.

## Rozdelenie testovacích súborov a ich obsah

### 1. `__tests__/formatTime.test.ts`

- Testuje funkciu `formatTime`, ktorá formátuje čas v milisekundách na reťazec.
- Zahŕňa testy na rôzne vstupy: minúty, sekundy, nulu, záporné hodnoty.

### 2. `__tests__/genId.test.ts`

- Testuje generovanie UUID cez funkciu `genId`.
- Používa mockovanie knižnice `uuid` na overenie správneho použitia test double.
- Overuje, že generované UUID sú reálne unikátne.

### 3. `__tests__/getBestTime.test.ts`

- Testuje funkciu `getBestTime`, ktorá vracia najlepší (najnižší) čas zo zoznamu.
- Zahŕňa testy na prázdne pole, chýbajúcu hodnotu, nesprávny typ.

### 4. `__tests__/unitExtra.test.ts`

- Obsahuje doplnkové testy pre rôzne utility:
  - `formatTime` – formátovanie času
  - `genId` – generovanie UUID
  - `getBestTime` – výber najlepšieho času
  - `formatDate` – formátovanie dátumu
  - Test double pre `getBestTime` s mockovaním knižnice `fast-sort` (overenie volania sort/asc)

### 5. Ďalšie existujúce testy

- Testy pre výpočet priemeru, odchýlky, najhoršieho času, atď. (napr. `getMean.test.js`, `getDeviation.test.js`, ...)
- Testy pokrývajú aj okrajové prípady a validáciu vstupov.

## Použité techniky

- **Unit testy** – overujú jednotlivé funkcie na rôznych vstupoch.
- **Test doubles** – mockovanie/stubovanie externých knižníc a funkcií.
- **Rozdelenie do viacerých súborov** – zlepšuje prehľadnosť a údržbu testov.

## Stav testov

- Všetky testy prechádzajú.
- Pokrytie zahŕňa základné utility, generovanie identifikátorov, formátovanie, výber najlepšieho času, validáciu vstupov a správanie pri chybách.

---

Ak chceš rozšíriť pokrytie alebo pridať ďalšie typy testov (napr. integračné, end-to-end), stačí povedať!
