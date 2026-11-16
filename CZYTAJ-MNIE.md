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

## Odkrywanie treści przez agentów

Wersja Markdown jest publikowana pod adresem `https://salazabawmalinka.pl/index.md` i wskazana w HTML jako alternatywna reprezentacja strony.

Obecna publikacja działa na GitHub Pages. GitHub Pages nie pozwala ustawiać własnych nagłówków odpowiedzi HTTP ani wybierać reprezentacji na podstawie nagłówka `Accept`. Sam link `rel="alternate"` w HTML nie zastępuje nagłówka HTTP `Link` i nie włącza negocjacji Markdown.

Aby spełnić te dwa wymagania bez przenoszenia plików źródłowych z GitHub Pages, trzeba umieścić przed domeną CDN lub reverse proxy z funkcją brzegową. Taka funkcja musi:

1. Dla odpowiedzi HTML dodawać nagłówek `Link` wskazujący mapę strony (`rel="sitemap"`) i wersję Markdown (`rel="alternate"; type="text/markdown"`).
2. Dla żądań strony z `Accept: text/markdown` zwracać treść z `/index.md` z typem `Content-Type: text/markdown` oraz `Vary: Accept`.
3. Przekazywać pozostałe żądania do obecnego hostingu GitHub Pages.

Rekordy DNS-AID należy dodać w panelu operatora DNS dla `salazabawmalinka.pl`. Ich nazwy i wartości trzeba wziąć z dokumentacji narzędzia, które przeprowadza kontrolę — nie są częścią plików witryny i nie należy zgadywać ich formatu. Zmiana DNS i konfiguracja CDN wymagają dostępu do tych usług.

Po skonfigurowaniu proxy sprawdź odpowiedzi:

```sh
curl -I https://salazabawmalinka.pl/
curl -I -H "Accept: text/markdown" https://salazabawmalinka.pl/
```

Pierwsza odpowiedź powinna zawierać `Link`; druga powinna zawierać `Content-Type: text/markdown` i `Vary: Accept`.

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
