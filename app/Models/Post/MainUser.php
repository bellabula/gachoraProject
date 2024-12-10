<?php 
require_once __DIR__ . '/../index/API.php';
if(isset($_POST['user_id'])){
  $user_id = $_POST['user_id'];
  $API = new API;
  header('Content-Type: application/json');
  $result = $API->User($user_id);
  $API = null;
}else{
  $result = 'give me user_id, or head to login page';
}
echo $result;
?>