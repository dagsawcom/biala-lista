# Biała lista

Biała lista to wyszukiwarka podatników VAT, czyli wykaz podmiotów zarejestrowanych jako podatnicy VAT, niezarejestrowanych oraz wykreślonych i przywróconych do rejestru VAT lub Wykaz podatników VAT. Wykaz jest prowadzony przez szefa Krajowej Administracji Skarbowej (dalej „szef KAS”).

# Źródła

Projekt powstał na podstawie API ze strony https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka.
Kalendarz został pobrany z strony: https://kursjs.pl/kurs/date/date-calendar.
Do tworzenia plików PDF zsotał kod wykorzystany ze strony https://tcpdf.org/ i https://github.com/tecnickcom/tc-lib-pdf.

# Użyte technologie

![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

# Instalacja
```bash
# Sklonuj to repozytorium
$ git clone https://github.com/dagsawcom/biala-lista
```

# Edycja plków

Tu są podane nazwy plików które trzeba edytować

### index.php - główny katalog

```bash
Zamienić zawartość z `$files = "biala-lista/";` na `$files = "";` lub na `$files = "*inna nazwa katalogu na lokolnym serwerze";.
```

### app.js - Folderze "js"

```bash
Zamienić zawartość z `const fil = "biala-lista/";` na `const fil = "";` lub na `const fil = "*inna nazwa katalogu na lokolnym serwerze";.
```

### addpdf.inc.php - Folderze "include"

```bash
Dodać własną lokalizacje dla pliku `tcpdf_include.php` przed `$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);`.
```

# Strona na żywo

https://bl.scripts24.xyz/