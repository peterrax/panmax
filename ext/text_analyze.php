<?php header("Content-Type:text/html; charset=UTF-8; Cache-Control: no-store"); date_default_timezone_set('Asia/Seoul'); session_start(); ?>
<?php 
	$text_content = "세계에 공통되는 대표적인 인류의 인기 문화 중 하나이다. 예전에는 활동사진(motion picture)[1]이라고 불렸다.

일반적인 의미는 아니지만 넓은 의미의 영화는 영사기로 트는 영상매체를 전부 포함한다. 따라서 광의의 영화에는 극장판, 드라마와 애니메이션, 그리고 극장 상영되는 다큐멘터리도 모두 속한다. 바꿔 말하자면 영사기 대신 전파로만 방영되거나 혹은 인터넷으로 보급되는 일반 UCC 같은 것은 영화와 구분된다는 것이다. 물론 처음부터 영사기로 틀 의도 하에 제작한 작은 이후 어떤 매체를 통하더라도 영화라고 할 수 있다. 그래서 포르노는 영화지만 AV(영상물)는 동영상이다.

깊게 들어가면 여러 의미가 마구 섞여 사용되므로 상위개념부터 명확하게 얘기해야 한다. 최상위 포괄단어로는 영상(映像: 비칠 영, 모양 상)으로 빛을 담아낸 모든 것을 의미한다. 그 아래로 정지영상(사진)과 동영상(활동사진)이 있다. 바로 이 동영상이 영화이다. 映畫(비칠 영, 그릴 화)로 바로 이 '화'가 동작성을 의미하고 있다. 그리고 그 하위로 극영화(허구)와 다큐멘터리영화(사실)가 있다. 극영화의 하위로는 실사극영화, 만화극영화로 나누기도 하며, 매체로서 나누면 TV극영화(드라마), 극장극영화 따위로 나누기도 한다. 흔히 일반인이 얘기하는 개념을 따지자면 영화는 실사극장극영화, 영상은 이러한 실사극장극영화를 제외한 모든 동영상을 뜻한다. CF(Commercial Film)를 한국어로 직역하면 상업영화가 되지만 아무도 그렇게 사용하지 않고 광고영상이라고 한다. 그러므로 이 문서에선 실사극장극영화만을 다룬다.";
	include "text_delete_list.php";
	$text_deleted = str_replace($delete_text_array,"",$text_content);
	echo $text_deleted;
	$text_trim = trim($text_deleted);
	$word_transformed = str_replace(" ", ",", $text_trim);
	$word_array = explode(',', $word_transformed);
	$word_count = count($word_array);
	$word_dump = array();

	echo $word_dump;
?>
<button type="button" onclick="dict_active();">사전 검색</button>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script>
	function dict_active(){
		var api_key = "API_KEY";
		var word = [<?php 
		for($i=0; $i < $word_count; $i++){
			$word_json = $word_array[$i];
		?>
			'<?php echo $word_json; ?>',
		<?php } ?>
		];
		var word_count = word.length;
		for(i=0; i < word_count; i++){
			$.get("https://stdict.korean.go.kr/api/search.do"),{ key: api_key, q: word[i]},
				function(data, status) {
				alert(data);
			}
		}
	}
</script>