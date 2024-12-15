<?php
require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['series_id']) && isset($_POST['number'])) {
    $series_id = $_POST['series_id'];
    $number = $_POST['number'];
    $API = new API;
    header('Content-Type: application/json');
    $result = $API->DeleteWait($series_id, $number);
    echo $result;
  } else {
    throw new Exception("give me series_id, number");
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
