<?php

class fileDelete {
  public $cat;
  public $catImg;
  public $fileName;

  public function __construct($cat, $catImg, $fileName) {
      $this->cat = $cat;
      $this->catImg = $catImg;
      $this->fileName = $fileName;
  }
  
  public function DeleteFile() {
    $c = $this->cat;
    $ci = $this->catImg;
    $fn = $this->fileName;
    if ($fn != "") {
      $file = "$c$ci/$fn.pdf";
      if (!unlink($file)) {
        echo "Error";
      } else {
        echo "Success";
        //http_response_code(404);
      }
    
    } else {
      http_response_code(404);

      //$error404 = $_SERVER['DOCUMENT_ROOT'].'/404.php';
      //include($error404); // provide your own HTML for the error page
      die();

    }
      
  }
}


$fileDelete = new fileDelete($c, $cp, $fn);
$fileDelete->DeleteFile();