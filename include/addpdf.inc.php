<?php
if ($f !== "" && $d !== "") {
//============================================================+
// File name   : example_061.php
// Begin       : 2010-05-24
// Last Update : 2014-01-25
//
// Description : Example 061 for TCPDF class
//               XHTML + CSS
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: XHTML + CSS
 * @author Nicola Asuni
 * @since 2010-05-25
 */

// Include the main TCPDF library (search for installation path).
require_once($_SERVER['DOCUMENT_ROOT'].'/pdf/examples/tcpdf_include.php');
//echo $_SERVER['DOCUMENT_ROOT'].'/pdf/examples/tcpdf_include.php';
//require_once('/home1/scriptss/pdf/examples/tcpdf_include.php');
//require_once('/xampp/htdocs/pdf/examples/tcpdf_include.php');
// create new PDF document
//define ('PDF_PAGE_ORIENTATION', 'P');
//define ('PDF_UNIT', 'mm');
//define ('PDF_PAGE_FORMAT', 'A4');
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

//$data=json_decode(file_get_contents('php://input'),1);


$html2b = explode('class="twofirst1">',$h);
$html2c = explode('</td><td id="serh" ',$html2b[1]);
$html2ba = explode('<div class="container" id="tableOne">',$h);



$html2d = $html2b[0].'class="twofirst1">Stan na dzień: '.$d.'</td><td id="serh" '.$html2c[1];
$html2g = str_replace('</span><span style="display: block;">',"<br>",$html2d);
$html2bf = explode('<div class="container boxSearc">',$html2g);
$html2bf0 = explode('toLeftBox">',$html2g);
$html2bf1 = explode('</div>',$html2bf0[1]);

$html2 = $html2bf[0]."<div class=\"container boxSearc\"><div class=\"row\">".$html2bf1[0]."</div></div></div>";
// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetTitle($fn);


// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/pol.php')) {
	require_once(dirname(__FILE__).'/lang/pol.php');
	$pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('times', '', 10);
$pdf->SetMargins(5, 5, 5);
$pdf->SetAutoPageBreak(TRUE, 5);
// add a page
$pdf->AddPage();

/* NOTE:
 * *********************************************************
 * You can load external XHTML using :
 *
 * $html = file_get_contents('/path/to/your/file.html');
 *
 * External CSS files will be automatically loaded.
 * Sometimes you need to fix the path of the external CSS.
 * *********************************************************
 */

// define some HTML content with style
$html = "
<!-- EXAMPLE OF CSS STYLE -->
<style>
.container {
    /*width: 1140px;*/
    
}
td {
	display:table-cell;
    vertical-align: middle;
     margin-top: auto;
 margin-bottom: auto;
}

table {
	display:block;
  padding: 6px 2px;
  vertical-align: middle;
   margin-top: auto;
 margin-bottom: auto;

}

	table td {
height: 20px;

}
table.tableHeaderAK tr td {
    background-color: #238500;
    border-radius: 2px 2px 0 0;
    height: 20px;
    margin: 0;
    padding: 15px 14px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    border-left: 1px solid #238500;
    border-right: 1px solid #238500;
    border-bottom: 1px solid #eee;
    }
    
 h4 {
    color: #fff;
    font-size: 10px;
    line-height: 22px;
    padding: 15px 14px;
    margin: 0;
    font-weight: Bold;
	font-size: 12px;
	font-family: Arial;

 }
table.tableAK {
    width: 100%;
    min-height: 20px;
    border-collapse: collapse;    
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
    border-bottom: 1px solid #eee;
	font-size: 8.25px;
	font-family: Arial,Helvetica,sans-serif;
     position: absolute;
  top: 50%; transform: translateY(-50%);
}
.tableAK td.twofirst {
    border-collapse: collapse;
	width: 379px;
    border-right: 1px solid #eee;
    margin: 0;
    padding: 500px 500px;
    justify-content: center;
    align-items: center;
  

}
.tableAK td.twofirst1 {
    border-collapse: collapse;
	width: 379px;
    padding: 500px 500px;
    margin: 0;
  

}
.tableAK td.twosecond {
	width: 185px;
     min-height: 20px;
   position: absolute;
  top: 50%; transform: translateY(-50%);
    text-align: right;
    /*position: relative; height: 400px; margin: 0 auto; background: #3f5d6f; */


}
div.count1  {
    
   line-height: 6px;
   
 
}

.tableAK td.tableAKa  {
	width: 1.5px;
    
}
.tableAK td.counta1  {
	width: 1.5px;
background-color: #2f6eb5;
}
.tableAK td.countSpecial1  {
	width: 1.5px;
background-color: #ef7f00;
}
div.rtext {
    text-align: right;
}
div.sendButtonAK, div.form-container-select  {
    display: none;
}
table.modal-content {
margin: 0;

 border-right: 1px solid #eee;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    
}
table.modal-content tr td.modal-header{
    margin-bottom: 0;
    line-height: 1.5;
    text-align: center;
    width: 100%;
    color: #015497;
    font-size: 11px!important;
    line-height: 19px!important;
    margin: 0!important;
    font-family: 'Open Sans';
    text-transform: uppercase;
    font-weight: 600!important;
    padding: 0 30px;
    word-wrap: break-word;
    word-break: break-word;
}

span.spanbr {
    display: block;
}

.boxSearc {

text-align: center;

/*line-height: 0px!important;*/
margin: 0!important;
    
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
        
    }
    .toLeftBox {
        margin-top: 1px!important; 
        margin-left: -1px!important;
    }

</style>".$html2." ";
//echo $html;
// output the HTML content
$pdf->writeHTML($html, true, false, true, false, '');

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
// $pdf->Output('example_061.pdf', 'I');
//echo $_SERVER['DOCUMENT_ROOT'].'/test/'.$fn.'.pdf';
//echo "$c$cp/$fn.pdf";
$pdf->Output("$fn.pdf", 'I');
$pdf->Output("$c$cp/$fn.pdf", 'F');
//http_response_code(200);
//============================================================+
// END OF FILE
//============================================================+
}