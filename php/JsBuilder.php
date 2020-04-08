<?php

class JsBuilder {
    //put your code here
    public function index()
    {
        $data = $this->getData();
        
        $file = file_get_contents('../js/main.js');
        
        $matches = $this->getMatches($file);
        
        if($matches) {
            for($i = 0; $i < count($matches[0]); $i++) {
                $file = str_replace($matches[0][$i], $data[$matches[1][$i]], $file);
            }
            $fileName="../storage/app/userscripts/sample.js";
            file_put_contents($fileName, $file);
            return;
        } 
        throw new Exception('No matches retrieved');
    }
    
    private function getData()
    {
        return [
            'fontSizeCtr' => 1.75,
            'fontSizeCtrInc' => .25,
            'letterSpaceCtr' => 4,
            'cursorUrl' => 'url(/accessibility/cursor.png)',
            'legibleFontFamily' => 'Arial',
            'borderFocusWidth' => 2,
            'borderFocusStyle' => 'dashed',
            'borderFocusColor' => '#ff0000',
            'voiceKey' => 5,
            'mainCssUrl' => '/accessibility/accessibility.css',
            'iconCssUrl' => '/accessibility/css/fa-all.css',
        ];
    }
    
    private function getMatches($string)
    {
        $pattern = '/{{ (\w*) }}/';
        preg_match_all('/{{ (\w*) }}/', $string, $matches);
        return $matches;
    }
}

$func = new JsBuilder();
$func->index();