<nav class="navbar navbar-inverse navbar-fixed-top ">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="home.php" id="menu-toggle" >Consord</a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav navbar-right">

        <li class="active"><a href="personalPage.php">Mario</a></li>

        <li>
          <?php
            include_once '../templates/notifications.php';
          ?>
        </li>

      <li ><a href="#">Logout</a></li>

    </ul>
  </div>
</div>
</nav>
