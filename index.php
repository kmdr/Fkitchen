<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>はじめてのキッチン　-りょうりをつくろう-</title>
	<link rel="stylesheet" href="stylesheets/style.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="ajax.js"></script>
	<script type="text/javascript" src="js/jqueryRotate.js"></script>
  <script type="text/javascript" src="js/imagesLoaded.js"></script>
  <script type="text/javascript" src="js/jcanvas.js"></script>
  <script type="text/javascript" src="js/cut.js"></script>
  <script type="text/javascript" src="js/top.js"></script>
  <link rel="stylesheet" type="text/css" href="stylesheets/jquery.minimalect.css" media="screen" />
  <link rel="stylesheet" type="text/css" href="stylesheets/button.css" media="screen" />

<script type="text/javascript" src="js/jquery.minimalect.js"></script>
<script type="text/javascript" src="js/timer.js"></script>

  <script>

    $(document).ready(function(){
    $("#r_id").minimalect();
    });
    </script>
 
</head>
<style type='text/css'>
    .canvas-wrapper {
        position: relative;
        width: 840px;
        height: 640px;
        margin: 0 auto;
    }
    .cover-canvas {
        position: absolute;
        background-color: #888;
    }
    .canvas-wrapper div{
        position: absolute;
        top: 209px;
        left: 384px;
    }
    .preload {
        display: none;
    }
</style>



<?php
ini_set("display_errors", On);
error_reporting(E_ALL);

mb_language("uni");
mb_internal_encoding("utf-8");
mb_http_input("auto");
mb_http_output("utf-8");

$link = new mysqli("localhost", "root", "root", "Fkitchen");

if(mysqli_connect_errno()) {
  printf("connect failed: %s\n", $link->connect_error());
  exit();
}
?>
<body id="container" class="container">
    <div class='title'>
      <img src="images/img_title.png">



<form>
<select name='id' id='r_id'>
<option value=''>きょうのメニュー</option>

<?php
$sql="select id, name from recipes";

if($result = mysqli_query($link, $sql)){
  while ($row = mysqli_fetch_object($result)){
	print "<option value='".$row->id."'>".$row->name."</option>\n";
  }
  mysqli_free_result($result);
}
?>
</select>
<input type="button" class="button buttonPink" id="r_send" value="つくる">
</form>
    </div>
</body>
</html>
