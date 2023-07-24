<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta name="viewport" content="width=device-width" />
		<meta charset="utf-8">
		<title>Acceuil - Bastien Doudard</title>
		<link rel="stylesheet" href="style.css">
		<link rel="icon" type="image/png" sizes="50x50" href="img/AMBD_Web_4.png">
	</head>

	<body>
		<div class="header">
			<nav>
				<a href='index.html'><img src='img/rouages1.png' style="max-width: 50px;"></a>
				<ul>
					<li><a href='index.html'>Home</a></li>
					<li><a href='Profile.html'>Profile</a></li>
					<li><a href='Review.html'>Review</a></li>
				</ul>

			</nav>
			
		</div>

		<div class="contenu">

        <h1>Formulaire de contact</h1>
        <form method="post">
            <input type="nom" name="nom" placeholder="Nom" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="text" name="sujet" placeholder="Sujet" required>
            <textarea name="message" placeholder="Message" required></textarea>
            <input type="submit" value="envoyer le message" required>           
        </form>

        <?php
        if (isset($_POST["message"])){
        $message = 
        "Nom : " .$_POST["nom"]."
        Email : " .$_POST["email"]."
        Message : " .$_POST["message"];
        
        $retour = mail("bastien.doudard@gmail.com", $_POST["sujet"], $message, "From:contact@bdoudard.com"."\r\n"."Reply-to:". $_POST["email"]);
            if($retour){
                echo "Le message à bien été envoyé";
            }
        }
        ?>   

		</div>

		<div class="footer">
			<h3>Site en construction</h3>
			<p>Copyright &copy; 2023 Bastien DOUDARD</p>
		</div>
    	 
	</body>

</html>



