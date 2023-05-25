<?php

$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$body = "";
$body .= "Name: ";
$body .= $name;
$body .= "<br>";
$body .= "E-mail: ";
$body .= $email;
$body .= "<br>";
$body .= "Message: ";
$body .= $message;
$body .= "<br>";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'mail.node-park.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'contacto@node-park.com';                     // SMTP username
    $mail->Password   = 'Wxpu,9YPZefp';                               // SMTP password
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('emisor@luisweb.me', $name);
    $mail->addAddress('contacto@node-park.com');     // Para el correo principal
    $mail->addBCC('luis@node-park.com');     // Para mi correo
    $mail->addBCC('rodrigo@node-park.com');     // Para mi correo
    $mail->addBCC('daniel.villena@wisewsisolutions.com');     // Para mi correo
    $mail->addBCC('ingrid@wisewsisolutions.com');     // Para mi correo
    $mail->addBCC('hola@luisweb.me');     // Para mi correo

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Contact Node Park';
    $mail->Body    = $body;
    $mail->CharSet = 'UTF-8';
    $mail->send();
    echo 'success';
} catch (Exception $e) {
    echo "El mensaje no se pudo enviar. Mailer Error: {$mail->ErrorInfo}";
}