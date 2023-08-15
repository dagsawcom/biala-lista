<?php
ini_set( 'display_errors', 'On' ); 
error_reporting( E_ALL );
if (array_key_exists('HTTPS', $_SERVER) && $_SERVER["HTTPS"] == "on") {
$htp = 'https';
} else {
$htp = 'http';
}
$htp0 = $htp."://";
//phpinfo();
$files = "biala-lista/";
$files1 = $_SERVER['DOCUMENT_ROOT'].'/'.$files;

?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <base href="<?php echo $htp0.$_SERVER["HTTP_HOST"]; ?>/">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="keywords" content="Wykaz podatników VAT, Wykaz podatników VAT z zapisem danych do pdf">
    <meta name="description" content="Darmowa biała lista z zapisywaniem danych do pdf">
    <title>Wykaz podatników VAT - wyszukiwarka</title>
    <link rel="Stylesheet" type="text/css" href="<?php echo $files; ?>css/app.css?t=<?php echo filemtime($files1.'css/app.css'); ?>" />
    <script src="<?php echo $files; ?>js/cal.js?t=<?php echo filemtime($files1.'js/cal.js'); ?>" async></script>
    <script src="<?php echo $files; ?>js/app.js?t=<?php echo filemtime($files1.'js/app.js'); ?>" async></script>
</head>
<body>
    <header></header>
    <section>
        <div class="containerAKMF"> 
            <div id="searchForm">
                <div class="container">
                    <div class="headerAK">
                        <h1 id="chow">Wykaz podatników VAT - wyszukiwarka</h1>
                        <h2 class="header">Wykaz podmiotów zarejestrowanych jako podatnicy VAT, niezarejestrowanych  oraz wykreślonych i przywróconych do rejestru VAT</h2>
                    </div>
                    <div class="headerAK">
                        <p><strong>Uwaga</strong></p>
                        <p>Korzystanie z serwisu jest limitowane, ponieważ jest korzystane przez API. Przy wykorzystaniu z serwisu możesz złożyć 10 zapytań o maksymalnie 30 podmiotów jednocześnie. Po wyczerpaniu tego limitu dostęp do API będzie zablokowany do godziny 0:00.</p>
                    </div>
                    <div class="radio-form-control mt49">
                        <fieldset>
                            <legend>
                                <label for="opt1" class="radio-control-container" title="Numer konta">
                                    <input type="radio" name="rdo" id="opt1" class="hidden1 radioAK" data-type="bank-account" value="bank-account" aria-label="Wpisz numer konta" title="Wpisz numer konta" checked="checked"/>
                                    <span class="control-label" title="Wpisz numer konta"></span>Numer konta
                                </label>

                                <label for="opt2" class="radio-control-container" title="NIP">
                                    <input type="radio" name="rdo" id="opt2" class="hidden1 radioAK" data-type="nip" value="nip" aria-label="Wpisz numer nip" title="Wpisz numer nip" />
                                    <span class="control-label" title="Wpisz numer nip"></span>NIP
                                </label>

                                <label for="opt3" class="radio-control-container" title="REGON">
                                    <input type="radio" name="rdo" id="opt3" class="hidden1 radioAK" data-type="regon" value="regon" aria-label="Wpisz numer REGON" title="Wpisz numer REGON" />
                                    <span class="control-label"></span>REGON
                                </label>
                            </legend>
                        </fieldset>
                    </div>
                    <div class="m-12">
                        <div id="pole" class="form-container-selecta sizeInputForBigSize">
                            <label>
                                <span class="hiden">Null</span>
                                <input type="text" id="inputType" name="labelr" class="input-form" autocomplete="off"/>
                            </label>
                        </div>
                        <div id="datep" class="form-container-selecta sizeInputForBigSize">
                            <input type="text" class="input-form dateInput" id="date" name="date" />
                        </div>
                        <div class="sendButtonAKa">
                            <button id="searchButton" type="submit" class="btn btn-primaryAk searchButtonClick">Szukaj</button>
                        </div>
                    </div>                        
                </div>
                <div id="result">
                    <div id="filepdf" class="container" style="display: none;">
                        <div class="m-12">
                            <div class="form-container-selecta sizeInputForBigSize" style="position: relative;">
                                <label>
                                    <span class="hiden">Null</span>
                                    <input type="text" id="files" name="files" class="input-form dateInput" placeholder="Nazwa przyszłego pliku">
                                </label>
                            </div>
                            <div class="sendButtonAKa">
                                <button type="submit" id="searchButton2" class="btn btn-primaryAk searchButtonClick">Generuj PDF</button>
                            </div>
                        </div>
                    </div>

                    <div id="searchResultBox" style="display: none;"></div>

                    <div id="errorBox" style="display: none;"></div>
                </div>
            </div>
        </div>
    </section>
    <?php /*echo dirname( __FILE__ );*/ ?>
    <footer></footer>
</body>
</html>