<?php
if ($name != "") {
$file = $_SERVER['DOCUMENT_ROOT'].'/test/'.$name.'.pdf';
if (!unlink($file)) {
   echo ("Error deleting $file");
} else {
   echo ("Deleted $file");
}
}
