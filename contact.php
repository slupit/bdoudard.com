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
            <label>Email</label>
            <input type="email" name="email" required>
            <label>Sujet</label>
            <input type="text" name="sujet" required>
            <textarea name="message" required></textarea>
            <input type="submit" value="envoyer le message" required>           
        </form>

        <?php
        if (isset($_POST["message"])){
        $retour = mail("bastien.doudard@gmail.com", "$_POST["sujet"]", "$_POST["message"]", "From:". $_POST["email"]);
            if($retour){
                echo "Le message à bien été envoyé";
            }
        }
        ?>   

		</div>

		<div class="footer">
            <h1>Contact</h1>
			<h3>Site en construction</h3>
			<p>Copyright &copy; 2023 Bastien DOUDARD</p>
		</div>
    	 
	</body>

</html>



