<?php
require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['list_id'])) {
    $list_id = $_POST['list_id'];
    $API = new API;
    header('Content-Type: application/json');
    $result = $API->LogisticsDetail($list_id);
    echo $result;
  } else {
    throw new Exception("give me list_id");
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
