<?php
require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['user_id']) && isset($_POST['code'])) {
    $user_id = $_POST['user_id'];
    $code = $_POST['code'];
    $API = new API;
    header('Content-Type: application/json');
    $result = $API->GiveRecommendGift($user_id, $code);
    echo $result;
  } else {
    throw new Exception("give me user_id, code");
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
