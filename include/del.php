<?php
if ($name != "") {
$file = $_SERVER['DOCUMENT_ROOT'].'/pdf/'.$name.'.pdf';
if (!unlink($file)) {
   echo ("Error deleting $file");
} else {
   echo ("Deleted $file");
}
}
