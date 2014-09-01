<?
ini_set("display_errors", On);
error_reporting(E_ALL);

mb_language("uni");
mb_internal_encoding("utf-8");
mb_http_input("auto");
mb_http_output("utf-8");

$sql = "SELECT food.id, food.name FROM recipes INNER JOIN r_f ON recipes.id = r_f.rid INNER JOIN food ON r_f.fid = food.id WHERE ";
$link = new mysqli("localhost", "root", "root", "Fkitchen");

if(isset($_GET['id'])) {
  $sql .= "recipes.id=".mysqli_real_escape_string($link, $_GET['id']);
}

if(mysqli_connect_errno()) {
  printf("connect failed: %s\n", $link->connect_error());
  exit();
}
$user= array();
if($result = mysqli_query($link, $sql)){
  while ($row = mysqli_fetch_object($result)){
    $user[] = array(
    'id'=> $row->id
    ,'name' => $row->name
    );
  }
  mysqli_free_result($result);
}

$msql = "SELECT method.order, action.name as action, food.name as food  FROM method  INNER JOIN action ON method.aid = action.id  LEFT OUTER JOIN food ON method.fid = food.id  WHERE "; 

if(isset($_GET['id'])) {
  $msql .= "method.rid=".mysqli_real_escape_string($link, $_GET['id'])." ORDER BY method.order";
}

if(mysqli_connect_errno()) {
  printf("connect failed: %s\n", $link->connect_error());
  exit();
}

$muser= array();
if($result2 = mysqli_query($link, $msql)){
  while ($row2 = mysqli_fetch_object($result2)){
    $muser[] = array(
    'order'=> $row2->order
    ,'action' => $row2->action
    ,'food' => $row2->food
    );
  }
  mysqli_free_result($result2);
}

$json = array("foodlist" => $user, "method" => $muser);
header('Content-type: application/json');
echo json_encode($json);

mysqli_close($link);

?>
