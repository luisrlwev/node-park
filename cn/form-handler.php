<?php
$nombreca = $_POST['username'];
$emailca = $_POST['email'];
$mensajeca = $_POST['message'];

if($emailca != ''){

$to  = 'ingrid@wisewsisolutions.com, daniel.villena@wisewsisolutions.com, contacto@node-park.com, '.$emailca; // atención a la coma
// subject
$subject = 'Contact Node Park';
// message
$message = '
<html>
<head>
<meta charset="utf-8">
  <title>Contact Node Park</title>
</head>
<body>
  <img src="https://node-park.com/images/nodeHeaderEmail.jpg" style="max-width:1024px; margin:0 auto;">
 <p>
 Hi '.$nombreca.',<br><br>
 Thank you for contacting us, we have received your request<br><br>
 Your message is:<br><br>
'.$mensajeca.'<br><br>
We will contact the mail: '.$emailca.'<br><br>
We appreciate your time.
 </p>
</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'From: Contact Node Park <contacto@node-park.com>' . "\r\n";
$headers .= 'Bcc: contacto@node-park.com, luis@node-park.com, rodrigo@node-park.com, daniel.villena@wisewsisolutions.com' . "\r\n";
$send = mail($to, $subject, $message, $headers);
if($send)
{
    echo "1";
}
else{
    echo "0";
}
}
else{
    echo "0";
}
?>