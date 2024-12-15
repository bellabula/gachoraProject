<?php
require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['user_id']) && isset($_POST['series_id'])) {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $API = new API;
    header('Content-Type: application/json');
    $result = $API->LineIn($user_id, $series_id);
    echo $result;
  } else {
    throw new Exception("give me user_id, series_id");
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}