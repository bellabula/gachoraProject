<?php

use function GuzzleHttp\json_decode;

require_once __DIR__ . '/../index/API.php';
try {
  if(!isset($_POST['record_ids'])) {
    echo json_encode(["error" => "please choose what to checkout"]);
    exit;
  }
  if (
    isset($_POST['logistics_people_id']) && 
    isset($_POST['address_id']) &&
    // isset($_POST['method_id']) &&
    isset($_POST['user_id'])
    ) 
    {
    $user_id = $_POST['user_id'];
    $logistics_people_id = $_POST['logistics_people_id'];
    $address_id = $_POST['address_id'];
    $method_id = $_POST['method_id'] ?? 1;
    $record_ids = $_POST['record_ids'];
    $time = isset($_POST['time']) ? $_POST['time'] : time();
    $API = new API;
    header('Content-Type: application/json');
    // 拆解前端array
    $recordsArray = explode(",", $record_ids);
    $recordsArray = array_map('intval', $recordsArray);
    // 數量
    $amounts = count($recordsArray);
    $record_ids = json_encode(array_map('strval', $recordsArray));
    $result = $API->SimpleCheckout(
      $user_id, 
      $logistics_people_id,
      $method_id,
      $address_id,
      $record_ids,
      $time,
      $amounts
    );
    echo $result;
    }else if(
      isset($_POST['user_id']) && 
      isset($_POST['county_id']) && 
      isset($_POST['road']) && 
      // isset($_POST['status_id']) && 
      // isset($_POST['phone']) && 
      isset($_POST['email']) && 
      // isset($_POST['method_id']) &&  
      isset($_POST['name'])
    ){
      $user_id = $_POST['user_id'];
      $county_id = $_POST['county_id'];
      $road = $_POST['road'];
      $title = $_POST['title'];
      $method_id = $_POST['method_id'] ?? 1;
      $record_ids = $_POST['record_ids'];
      $status_id = $_POST['status_id'] ?? 12;
      $phone = $_POST['phone'] ?? '';
      $email = $_POST['email'];
      $name = $_POST['name'];
      $time = isset($_POST['time']) ? $_POST['time'] : time();
      $API = new API;
      header('Content-Type: application/json');
      // 拆解前端array
      $recordsArray = explode(",", $record_ids);
      $recordsArray = array_map('intval', $recordsArray);
      // 數量
      $amounts = count($recordsArray);
      $record_ids = json_encode(array_map('strval', $recordsArray));
      $result = $API->ComplicatedCheckout(
        $user_id, 
        $county_id,
        $road,
        $title,
        $status_id,
        $phone,
        $email,
        $method_id,
        $record_ids,
        $time,
        $name,
        $amounts);
        echo $result;
  } else {
    throw new Exception("參數不完全或錯誤label格式(record_ids form: '1,3,45,57,123' without space)");
  }
} catch (Exception $e) {
  if ($e->getCode() == 23000) {
    echo json_encode(["error" => "wrong post data format"]);
  } else {
    echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
  }
}
