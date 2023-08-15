<?php
$data=json_decode(file_get_contents('php://input'),1);

//print_r($data);
//print_r($_GET);
$q = isset($_GET['q']) ? $_GET['q'] : '';
$file = isset($_GET['file']) ? $_GET['file'] : '';
$html2a = isset($data['name']) ? $data['name'] : '';
$plik = isset($data['pli']) ? $data['pli'] : '';
$dat = isset($data['dat']) ? $data['dat'] : '';
$name = $plik." ".$dat;

$storeFolder = "/test" ;
$targetPath = dirname( __FILE__ ) ;
$filef = $targetPath;


class FilesC {
    public $typs;
    public $cat;
    public $catPdf;
    public $html;
    public $file;
    public $dates;
    public $fileName;
    public $fileName1;

    public function __construct($typs, $cat, $catPdf, $html, $file, $dates, $fileName, $fileName1) {
        $this->typs = $typs;
        $this->cat = $cat;
        $this->catPdf = $catPdf;
        $this->html = $html;
        $this->file = $file;
        $this->dates = $dates;
        $this->fileName = $fileName;
        $this->fileName1 = $fileName1;
    }
    
    public function files() {
        $t = $this->typs;
        $c = $this->cat;
        $cp = $this->catPdf;  
        $h = $this->html;
        $f = $this->file;
        $d = $this->dates;
        $fn = $this->fileName;
        $fn1 = $this->fileName1;
        /*
        if (count($fs) === 1) {
            $fs1 = $fs;
        } else {
            $fs1 = "";
        }*/
        //echo "$c/include/$t.inc.php";
        $file = "$c/include/$t.inc.php";
        include $file;
    }
}

$img = new FilesC($q, $filef, $storeFolder, $html2a, $plik, $dat, $name, $file);
if ($q === "addpdf" || $q === "del" || $q === "view")
$img->files();
else
echo "";
//ttp_response_code(404);