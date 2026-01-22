<?php
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization");

// Répondre aux requêtes preflight (OPTIONS)
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$token = $_SERVER['HTTP_AUTHORIZATION'];

if (!$token) {
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode(['error' => 'Token manquant']);
    exit();
}

if ($token !== "VBnAzKpOLlf5DZSNpNuXJmvg4") {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['error' => 'Token invalide']);
    exit();
}
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    // 
    // Connexion à la base de données
    $database = new mysqli("192.168.56.56", "homestead", "secret", "TP_ticketing");
    mysqli_set_charset($database, "utf8mb4");

    $demande = $database->execute_query("SELECT *
FROM TP_ticketing.demande")->fetch_all(MYSQLI_ASSOC);

    $arrayFinal = ["demande" => $demande, "test" => "un truc!"];


    echo json_encode($arrayFinal);
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Connexion à la base de données
    if (!empty($_POST)) {
        $database = new mysqli("192.168.56.56", "homestead", "secret", "TP_ticketing");
        mysqli_set_charset($database, "utf8mb4");

        $stmt = $database->prepare("INSERT INTO demande (nom, email, sujet, region, departement, commune, message)
                                    VALUES (?, ?, ?, ?, ?, ?, ?)");


        $stmt->bind_param("sssssss", $_POST['nom'], $_POST['email'], $_POST['sujet'], $_POST['region'], $_POST['departement'], $_POST['commune'], $_POST['message']);
        $stmt->execute();



        $mailer = new PHPMailer();
        $mailer->CharSet = 'UTF-8';
        $mailer->Encoding = 'base64';
        $mailer->isHtml(true);
        //CONFIGURATION:  (comment)
        $mailer->Host = '192.168.56.56';
        $mailer->Port = 1025;
        $mailer->SMTPAuth = false;
        $mailer->SMTPSecure = '';

        // Emmetteur / Destinataire (a qui)
        $mailer->setFrom('noreply@appticket.com', "PREVISION");
        $mailer->addAddress($_POST['email']);

        // SUBJECT
        $mailer->Subject = $_POST['sujet'];
        $mailer->Body = "<p style=\"color:grey\">Ticket: pour " . $_POST["nom"] . "<br> en provenance de"
            . $_POST["commune"] . "<br> dans le/la"
            . $_POST["departement"] . "<br>
              (" . $_POST["region"] . ")<br> Vous a écrit ce message: " . $_POST["message"] . "</p>";

        if ($mailer->send()) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false));
        }
    } else {
        echo json_encode(array("success" => false));
    }
}
