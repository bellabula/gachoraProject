<?php
require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['headphoto_id']) && isset($_POST['user_id'])) {
    $headphoto_id = $_POST['headphoto_id'];
    $user_id = $_POST['user_id'];
    $API = new API;
    header('Content-Type: application/json');
    $result = $API->ChangeHeadPhoto($headphoto_id, $user_id);
    echo $result;
  } else {
    throw new Exception("give me headphoto_id, user_id");
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
