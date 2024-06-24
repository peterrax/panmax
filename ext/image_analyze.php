<?php
  error_reporting( E_ALL );
  ini_set( "display_errors", 1 );
?>
<?php 
	require 'vendor/autoload.php'; 
	use Aws\Rekognition\RekognitionClient;

			$Client = new \Aws\Rekognition\RekognitionClient([
				'version' => 'latest',
				'region'  => 'ap-northeast-2',
				'credentials' => [
					'key'    => 'API_KEY',
					'secret' => 'SECRET_KEY'
				]
			]);
			
			$result = $Client->detectLabels([
				'Image' => [ 
					//1. URL및 이미지 사용시에 Bytes 사용
					'Bytes' => file_get_contents("https://subjectsq.com/fp_uploads/3_20220325203552.jpg"),				
					//2. 버켓 사용
	     //          	'S3Object'=>[
						// 'Bucket'=>#{Bucket}",
						// 'Name'=>#{디렉토리+파일명},
				 	// ]
				],
				'MaxLabels' => 10,
				'MinConfidence' => 90,
			]);
			// print_r($result['Labels']);
			$image_entity = $result['Labels'][0]['Name'];
			$request = 'https://www.googleapis.com/language/translate/v2?key=SECRET_KEY&source=en&target=ko&q='.$image_entity;
			$response = file_get_contents($request);
			$data = json_decode($response);
			$data_trans = $data->data->translations;
			$data_trans_conv = $data_trans[0];
			$translated_word = $data_trans_conv->translatedText;
			$analyze_list = [];
			$labels_arr = $result['Labels'];
			$labels_count = count($labels_arr);
			for($i=0; $i < $labels_count; $i++){
				array_push($analyze_list, $result['Labels'][$i]['Name']);
				$analyze_list = array_diff($analyze_list, array("People","Person","Human","Field"));
			}
			print_r($analyze_list);
			// echo $translated_word;
			
// ->translatedText
			// print_r($translated);