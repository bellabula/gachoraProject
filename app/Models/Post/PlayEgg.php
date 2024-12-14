<?php
require_once __DIR__ . '/../index/API.php';
try {

  if (isset($_POST['user_id']) && isset($_POST['series_id']) && isset($_POST['amounts'])) {
    $user_id = $_POST['user_id'];
    $series_id = $_POST['series_id'];
    $amounts = $_POST['amounts'];
    $time = isset($_POST['time']) ? $_POST['time'] : time();

    $API = new API;
    header('Content-Type: application/json');
    $result = $API->PlayEgg($user_id, $series_id, $amounts, $time);
    echo $result;
  } else {
    throw new Exception("give me user_id, series_id, amounts");
  }
} catch (Exception $e) {
  echo json_encode(["error" => "Connection_fail: " . $e->getMessage()]);
}
