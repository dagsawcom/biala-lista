<?php

class files {
    public $catImg;

    public function __construct($catImg) {
        $this->catImg = $catImg;
    }

    public function filesAll() {
        $ci = $this->catImg;
        foreach (new DirectoryIterator($ci) as $file){
            if($file->isDot()) continue;
    
            $fileinfo[] = [
                $file->getFilename(),
                $file->getExtension(),
                $file->getMTime(),
                $file->getSize()
            ];
        }
        $fileinfo0 = isset($fileinfo) ? $fileinfo : 0;
        return $fileinfo0;
    }
}