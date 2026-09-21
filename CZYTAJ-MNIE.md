# Malinka — sala zabaw w Warce

Gotowa, responsywna strona w języku polskim.

Technologia: Astro 5, Tailwind CSS 4, GSAP / ScrollTrigger, Lenis.

## Uruchomienie

Wymagany Node.js 22.12 lub nowszy.

1. Rozpakuj projekt i otwórz jego folder w terminalu.
2. Wykonaj `npm ci`.
3. Wykonaj `npm run dev` i otwórz adres wyświetlony w terminalu.

Wersja do publikacji: `npm run build`.
Gotowe pliki strony powstają w folderze `dist` i mogą być umieszczone na hostingu stron statycznych.

## Zawartość

- Animowana maskotka 3D oparta na przekazanym logo.
- Animacje przy przewijaniu, interakcje z maskotką i konfetti.
- Cennik: wtorek–czwartek, piątek–niedziela oraz grupy od 10 dzieci.
- Urodziny na wyłączność, atrakcje i opinie przekazane przez właściciela.
- Demonstracja karty lojalnościowej: 5 pieczątek i 6. wejście gratis.
- Menu mobilne, obsługa klawiatury oraz opcja ograniczenia ruchu.
- Kontakt telefoniczny, e-mail i link do trasy w Mapach Google.

Ceny pochodzą z przekazanego cennika. Nie podano godzin otwarcia ani cen urodzin, dlatego strona zachęca do kontaktu w sprawie dostępności i szczegółów. Archiwalne ogłoszenie z 20 września nie jest prezentowane jako aktualne. Nie opublikowano niezweryfikowanej zbiorczej oceny Google.

Karta lojalnościowa na stronie jest demonstracją, nie zastępuje fizycznych pieczątek.

## Pliki do edycji

- `src/pages/index.astro` — treść i struktura.
- `src/styles/global.css` — wygląd i responsywność.
- `src/scripts/main.js` — animacje, ceny i interakcje.
- `public/images` — materiały marki i ilustracja.

Projekt jest zarejestrowany w Sites. `.openai/hosting.json` zachowuje identyfikator, aby można było wznowić publikację tego samego projektu. Publikacja w tej sesji nie została ukończona z powodu blokady zapisu historii projektu przez Windows.
