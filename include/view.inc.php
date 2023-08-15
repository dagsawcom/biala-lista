<?php

class fileView {
    public $cat;
    public $catImg;
    public $fileSave;
    public $file;

    public function __construct($cat, $catImg, $file) {
        $this->cat = $cat;
        $this->catImg = $catImg;
        $this->file = $file;
    }
    public function ViewFile() {
        $c = $this->cat;
        $ci = $this->catImg;
        $f0 = $this->file;
        //echo "$c = $ci = $f0";
        if (!empty($f0)) {
            $filef = "$c/include/files.inc.php";
            include $filef;  
            $targetFile1 = "$c$ci";
            $files = new files($targetFile1);
            $data = $files->filesAll();
            $f = str_replace("_"," ",$f0);
            //print_r($data);
            if ($data != 0) {        
            
                $lp = count($data);
                for ($x=0; $x<$lp; $x++) {
                    $filet = $data[$x][0];
                    $filet1 = $f.".".$data[$x][1];
                    if ($filet == $filet1) {
                        $targetFile = "$targetFile1/$filet1";
                    }
                }
            
                $filename = basename($targetFile);
                $file_extension = strtolower(substr(strrchr($filename,"."),1));
                switch( $file_extension ) {
                    case "gif": $ctype="image/gif"; break;
                    case "png": $ctype="image/png"; break;
                    case "jpeg":
                    case "jpg": $ctype="image/jpeg"; break;
                    case "svg": $ctype="image/svg+xml"; break;
                    case "pdf": $ctype="application/pdf"; break;
                    default:
                }

                header('Content-type: ' . $ctype);
                //header("Content-Disposition:attachment;filename=\"$filet1\"");
                readfile($targetFile);
                
            } else {
                http_response_code(404);
            }

        } else {
            http_response_code(404);
        }
    }
}

$fileView = new fileView($c, $cp, $fn1);
$fileView->ViewFile();