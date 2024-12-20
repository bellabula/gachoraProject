<?php
require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['record_id'])) {
    $record_id = $_POST['record_id'];
    $API = new API;
    header('Content-Type: application/json');
    $result = $API->ToPrepare($record_id);
    echo $result;
  } else {
    throw new Exception("give me record_id");
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
