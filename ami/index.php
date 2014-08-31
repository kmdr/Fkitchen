<head>
	<meta charset="UTF-8">
	<title>はじめてのキッチン　-りょうりをつくろう-</title>
	<link rel="stylesheet" href="stylesheets/style.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="ajax.js"></script>
	<script type="text/javascript" src="js/jqueryRotate.js"></script>
    <script src="js/imagesLoaded.js"></script>
    <script src="js/jcanvas.js"></script>


</head>
<style type="text/css">
    #canvas-wrapper {
        position: relative;
        width: 840px;
        height: 640px;
    }
    #cover-canvas {
        position: absolute;
        background-color: #888;
    }
    #canvas-wrapper div{
        position: absolute;
        top: 209px;
        left: 384px;
    }
    #preload {
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

$link = new mysqli("192.168.50.129", "root", "root", "Fkitchen");

if(mysqli_connect_errno()) {
  printf("connect failed: %s\n", $link->connect_error());
  exit();
}
?>
<body id="container" class="container">
<form>
<select name='id' id='r_id'>
<option value=''>きょうのメニュー</option>
</body>
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
<input type="button" id="r_send" value="そーしん">
</form>
