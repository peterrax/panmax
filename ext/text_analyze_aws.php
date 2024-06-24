<?php
  error_reporting( E_ALL );
  ini_set( "display_errors", 1 );
?>
<?php

require '../vendor/autoload.php'; 
use Aws\Comprehend\ComprehendClient;

$client = new Aws\Comprehend\ComprehendClient([
    'version'     => '2017-11-27',
    'region'      => 'us-west-2',
    'profile'     => 'fk-comprehend',
]);
$review="Your Comprehend text";
//Detecting Sentiment
$result = $client->detectSentiment([
    "LanguageCode" => "en",
    "Text" => "$review",
]);

echo "<h1>DetectSentiment</h1><pre>";
print_r($result);
echo "</pre>";

echo "Sentiment: ".$result['Sentiment']."<br />";
echo "Positive: ".round($result['SentimentScore']['Positive']*100)."%<br />";
echo "Negative: ".round($result['SentimentScore']['Negative']*100)."%<br />";
echo "Neutral: ".round($result['SentimentScore']['Neutral']*100)."%<br />";
echo "Mixed: ".round($result['SentimentScore']['Mixed']*100)."%<br />";

?>