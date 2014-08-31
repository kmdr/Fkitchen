<?
ini_set("display_errors", On);
error_reporting(E_ALL);

mb_language("uni");
mb_internal_encoding("utf-8");
mb_http_input("auto");
mb_http_output("utf-8");

$sql = "SELECT method.order, action.name as action, food.name as food FROM method INNER JOIN action ON method.aid = action.id INNER JOIN food ON method.fid = food.id WHERE ";

if(isset($_GET['id'])) {
  $sql .= "method.rid=".$_GET['id'];
}

$link = new mysqli("192.168.50.129", "root", "root", "Fkitchen");

if(mysqli_connect_errno()) {
  printf("connect failed: %s\n", $link->connect_error());
  exit();
}
$user= array();
if($result = mysqli_query($link, $sql)){
  while ($row = mysqli_fetch_object($result)){
    $user[] = array(
      'order'=> $row->order
      ,'action'=> $row->action
      ,'food'=> $row->food
    );
  }
  mysqli_free_result($result);
}
header('Content-type: application/json');
echo json_encode($user);

mysqli_close($link);

?>
