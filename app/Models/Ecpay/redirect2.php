<?php
 if (isset($_POST['tmpurl'])) {
  $tmpurl = $_POST['tmpurl'];
  header("Location: " . $tmpurl);
} else {
  echo "沒有提供網址！";
}
?>
<!-- 
給我user_id, address_id 3, record_id -->