<?php
require 'vendor/autoload.php'; 
use Aws\Comprehend\ComprehendClient;
$client = new ComprehendClient([
            'credentials' => [
                'key' =>  'API_KEY',
                'secret' => 'SECRET_KEY'
            ],
            'region' => 'ap-northeast-2',
            'version' => 'latest'
        ]);

// detectEntities
$detectKeyPhrases = $client->detectKeyPhrases([
            'LanguageCode' => 'ko',
            'Text' => '오늘은 미술관에 가서 예쁜 미술 작품들을 잔뜩 보고 왔습니당. 특히 별이 빛나는밤은 너무도 멋진 작품이었습니다.'
        ]);

$first_keyphrase = $detectKeyPhrases['KeyPhrases'][0]['Text'];

$detectEntities = $client->detectEntities([
            'LanguageCode' => 'ko',
            'Text' => $first_keyphrase
        ]); 

$first_keyphrase_entity = $detectEntities['Entities'][0]['Type'];
if($first_keyphrase_entity == 'DATE'){
  $subject = $detectKeyPhrases['KeyPhrases'][1]['Text'];
}
echo $subject;
?>