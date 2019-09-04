<?php
$servername = "localhost";
$username = "root";
$password = "123456789a";
$dbname = "weyki";

$collaterals = $_POST['collaterals'];
$hashs = $_POST['hashs'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO aaa_data (collateral, hash)
VALUES ('$collaterals', '$hashs')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
