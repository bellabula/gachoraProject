<?php
require_once __DIR__ . '/../index/API.php';
try {
  $API = new API;
  if (isset($_POST['city_id'])){
    $city_id = $_POST['city_id'];
    header('Content-Type: application/json');
    $result = $API->AllCounty($city_id);
    $API = null;
    echo $result;
  }else{
    echo json_encode(["error" => 'give me city_id']);
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
